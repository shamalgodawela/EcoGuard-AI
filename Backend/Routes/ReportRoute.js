const express = require('express');
const router = express.Router();
const {createReport, getAllReports, getReportById} = require('../Controllers/ReportController');

// Add report
router.post('/add', createReport);

// Get reports
router.get('/',getAllReports);
router.get('/:id', getReportById);

module.exports = router;
