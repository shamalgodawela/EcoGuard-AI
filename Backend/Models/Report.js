// models/Report.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/sequelize');

const Report = sequelize.define('Report', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false
    },

    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false
    }

}, {
    tableName: 'reports',
    timestamps: true
});

module.exports = Report;
