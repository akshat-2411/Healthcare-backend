const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Patient', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: true },
    gender: { type: DataTypes.ENUM('male','female','other'), allowNull: true },
    contact: { type: DataTypes.STRING, allowNull: true },
    medicalHistory: { type: DataTypes.TEXT, allowNull: true },
    createdBy: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'patients',
    timestamps: true
  });
};
