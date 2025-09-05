const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Mapping', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    patientId: { type: DataTypes.INTEGER, allowNull: false },
    doctorId: { type: DataTypes.INTEGER, allowNull: false },
    assignedBy: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'mappings',
    timestamps: true,
    indexes: [{ unique: true, fields: ['patientId','doctorId'] }]
  });
};
