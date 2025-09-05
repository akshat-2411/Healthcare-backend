const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

const User = require('./user')(sequelize);
const Patient = require('./patient')(sequelize);
const Doctor = require('./doctor')(sequelize);
const Mapping = require('./mapping')(sequelize);

// Associations
User.hasMany(Patient, { foreignKey: 'createdBy', as: 'patients' });
Patient.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

User.hasMany(Doctor, { foreignKey: 'createdBy', as: 'doctors' });
Doctor.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

// Many-to-many via Mapping (but mapping has its own id)
Patient.belongsToMany(Doctor, { through: Mapping, foreignKey: 'patientId', otherKey: 'doctorId', as: 'doctors' });
Doctor.belongsToMany(Patient, { through: Mapping, foreignKey: 'doctorId', otherKey: 'patientId', as: 'patients' });

module.exports = {
  sequelize,
  User,
  Patient,
  Doctor,
  Mapping
};
