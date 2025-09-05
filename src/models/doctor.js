const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Doctor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    specialization: { type: DataTypes.STRING, allowNull: true },
    contact: { type: DataTypes.STRING, allowNull: true },
    createdBy: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'doctors',
    timestamps: true
  });
};
