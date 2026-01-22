from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from PIL import Image
import torch
from torchvision import models, transforms
import torch.nn as nn
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Load model once
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
num_classes = 2  # number of classes used in training
model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
model.fc = nn.Linear(model.fc.in_features, num_classes)
model.load_state_dict(torch.load("coral_model.pth", map_location=device))
model = model.to(device)
model.eval()
class_names = ["bleached_corals", "healthy_corals"]

transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])
])

# Initialize OpenAI client
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in environment variables. Please set it in .env file.")
openai_client = OpenAI(api_key=OPENAI_API_KEY)

async def get_coral_suggestions(prediction: str, role: str = None) -> str:
    """Get AI-generated suggestions based on coral health prediction and user role"""
    try:
        # Researcher-specific instructions
        if role == "researcher":
            if prediction == "healthy_corals":
                prompt = """When a coral image is uploaded, classify the coral as Healthy or Bleached.
Provide a scientific explanation of visible signs (color loss, tissue damage).
Suggest possible environmental causes based on known coral bleaching research.
Give research-oriented recommendations for monitoring or further study.
Keep the output concise, factual, and suitable for academic use.

Based on the analysis showing healthy corals, provide:
1. Scientific explanation of visible signs indicating healthy coral status
2. Possible environmental factors contributing to coral health
3. Research-oriented recommendations for monitoring or further study
4. Key indicators to track for long-term health assessment
Keep the response concise, factual, and suitable for academic use (around 200-250 words)."""
            else:  # bleached_corals
                prompt = """When a coral image is uploaded, classify the coral as Healthy or Bleached.
Provide a scientific explanation of visible signs (color loss, tissue damage).
Suggest possible environmental causes based on known coral bleaching research.
Give research-oriented recommendations for monitoring or further study.
Keep the output concise, factual, and suitable for academic use.

Based on the analysis showing bleached corals, provide:
1. Scientific explanation of visible signs (color loss, tissue damage) observed
2. Possible environmental causes based on known coral bleaching research
3. Research-oriented recommendations for monitoring or further study
4. Key research questions and data collection priorities
Keep the response concise, factual, and suitable for academic use (around 250-300 words)."""
            system_prompt = "You are a marine biologist and coral reef research expert. Provide scientific, research-oriented analysis suitable for academic use."
            # Tourism Guide instructions
        elif role == "tourism_guide":
            if prediction == "healthy_corals":
                prompt = """Based on the analysis showing healthy corals:
1. Explain the reef condition in simple, tourist-friendly language
2. Confirm suitability for tourism activities (snorkeling, diving, boat tours)
3. Provide 2-3 responsible tourism tips
4. Include a short conservation awareness message guides can share with tourists
Keep the response simple and clear (120-150 words)."""
            else:  # bleached_corals
                prompt = """Based on the analysis showing bleached corals:
1. Explain coral bleaching in simple, non-technical language
2. Advise whether tourism activities should be limited or avoided
3. Suggest alternative responsible actions guides can take
4. Provide a short conservation awareness message for tourists
Keep the response clear, respectful, and practical (150-180 words)."""

            system_prompt = (
                "You are a marine conservation expert assisting beachside tourism guides. "
                "Use simple language, avoid technical terms, and focus on responsible tourism "
                "and conservation awareness."
            )
        else:
            # General user instructions (non-researcher)
            if prediction == "healthy_corals":
                prompt = """Based on the analysis showing healthy corals, provide:
1. Brief explanation of what healthy corals indicate
2. 3-4 actionable recommendations to maintain coral health
3. Environmental factors to monitor
Keep the response concise and practical (around 150-200 words)."""
            else:  # bleached_corals
                prompt = """Based on the analysis showing bleached corals, provide:
1. Brief explanation of coral bleaching and its causes
2. 3-4 urgent recommendations to help recover the coral reef
3. Immediate actions that can be taken
4. Long-term strategies for coral reef restoration
Keep the response concise and practical (around 200-250 words)."""
            system_prompt = "You are a marine biologist and coral reef conservation expert. Provide practical, science-based advice."
        
        response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            max_tokens=400 if role == "researcher" else 300,
            temperature=0.7
        )
        
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Unable to generate suggestions at this time. Error: {str(e)}"

@app.post("/predict")
async def predict(file: UploadFile = File(...), role: str = Form(None)):
    try:
        image = Image.open(file.file).convert("RGB")
        img = transform(image).unsqueeze(0).to(device)
        with torch.no_grad():
            output = model(img)
            pred_idx = torch.argmax(output,1).item()
        
        prediction = class_names[pred_idx]
        
        # Get AI suggestions based on prediction and user role
        suggestions = await get_coral_suggestions(prediction, role)
        
        return JSONResponse({
            "prediction": prediction,
            "suggestions": suggestions
        })
    except Exception as e:
        return JSONResponse({"error": str(e)})
