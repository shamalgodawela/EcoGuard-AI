'use client';

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Navbar from "../NavBar/Navbar";
import L from "leaflet";

// Fix default icon paths for Leaflet in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationPicker({ setLocation }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocation({ lat, lng });
    },
  });
  return null;
}

export default function ReportPage() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);

  // Get browser geolocation
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error(error);
        alert("Unable to retrieve your location.");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location) {
      alert("Please select a location on the map or use current location.");
      return;
    }

    await axios.post("http://localhost:5000/api/ReportRoutes/add", {
      description,
      latitude: location.lat,
      longitude: location.lng,
    });

    alert("Report added successfully");
    setDescription("");
    setLocation(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6">
            Add Environmental Incident Report
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Description */}
            <div>
              <label className="block font-semibold mb-2">Incident Description</label>
              <textarea
                placeholder="Describe the environmental issue observed..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Upload (Future) */}
            <div>
              <label className="block font-semibold mb-2">Upload Image (Future Development)</label>
              <input
                type="file"
                disabled
                className="w-full border border-gray-200 rounded-lg p-3 bg-gray-100 cursor-not-allowed"
              />
              <p className="text-sm text-gray-600 mt-1">
                Image upload will be enabled in a future version.
              </p>
            </div>

            {/* Map & Current Location */}
            <div>
              <label className="block font-semibold mb-2">Select Incident Location</label>
              
              {/* Current Location Button */}
              <button
                type="button"
                onClick={handleCurrentLocation}
                className="mb-2 px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Use Current Location
              </button>

              {/* Map */}
              <p className="text-sm mb-2 text-gray-700">Or click on the map to select location:</p>
              <div className="border border-gray-300 rounded-xl overflow-hidden" style={{ height: "400px" }}>
                <MapContainer
                  center={location ? [location.lat, location.lng] : [6.9271, 79.8612]}
                  zoom={location ? 13 : 8}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationPicker setLocation={setLocation} />
                  {location && <Marker position={[location.lat, location.lng]} />}
                </MapContainer>
              </div>

              {location && (
                <p className="text-sm mt-2">
                  📍 Selected Location:{" "}
                  <span className="font-semibold">
                    {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                  </span>
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
