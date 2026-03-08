const { DataTypes } = require("sequelize");
const sequelize = require("../Config/sequelize");

const GasReading = sequelize.define("GasReading", {
  device_id: {
    type: DataTypes.STRING,
  },
  gas_ppm: {
    type: DataTypes.FLOAT,
  },
  voltage: {
    type: DataTypes.FLOAT,
  },
  raw_value: {
    type: DataTypes.INTEGER,
  },
  air_status: {
    type: DataTypes.STRING,
  }
});

module.exports = GasReading;