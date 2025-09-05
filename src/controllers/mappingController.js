const { Mapping, Patient, Doctor } = require('../models');
const { validationResult } = require('express-validator');

exports.assignDoctor = async (req, res, next) => {
  try {
    const errs = validationResult(req); if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });
    const { patientId, doctorId } = req.body;
    // Validate existence
    const patient = await Patient.findByPk(patientId);
    const doctor = await Doctor.findByPk(doctorId);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    // Only creator of patient can map? choose policy. We'll allow authenticated users to assign; track who assigned.
    const map = await Mapping.create({ patientId, doctorId, assignedBy: req.user.id });
    res.status(201).json(map);
  } catch (err) {
    // If unique constraint fails
    if (err.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ message: 'Mapping already exists' });
    next(err);
  }
};

exports.getAllMappings = async (req, res, next) => {
  try {
    const maps = await Mapping.findAll();
    res.json(maps);
  } catch (err) { next(err); }
};

exports.getMappingsForPatient = async (req, res, next) => {
  try {
    const patientId = req.params.patientId;
    const maps = await Mapping.findAll({ where: { patientId } });
    res.json(maps);
  } catch (err) { next(err); }
};

exports.deleteMapping = async (req, res, next) => {
  try {
    const m = await Mapping.findByPk(req.params.id);
    if (!m) return res.status(404).json({ message: 'Mapping not found' });
    // optionally check assignedBy or user privileges
    await m.destroy();
    res.json({ message: 'Mapping removed' });
  } catch (err) { next(err); }
};
