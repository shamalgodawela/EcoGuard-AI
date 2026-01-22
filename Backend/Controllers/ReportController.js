const Report = require('../Models/Report');

// ➕ Create Report
exports.createReport = async (req, res) => {
    try {
        const { description, latitude, longitude } = req.body;

        // image (from multer)
        const image = req.file ? req.file.path : null;

        if (!description || !latitude || !longitude) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const report = await Report.create({
            description,
            latitude,
            longitude
        });

        res.status(201).json({
            message: "Report added successfully",
            report
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// 📄 Get All Reports
exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ reports });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// 📄 Get Report by ID
exports.getReportById = async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.id);

        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.status(200).json({ report });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
