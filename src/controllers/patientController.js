const { Patient } = require('../models');
const { validationResult } = require('express-validator');

exports.createPatient = async (req, res, next) => {
  try {
    const errs = validationResult(req); if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });
    const payload = req.body;
    payload.createdBy = req.user.id;
    const p = await Patient.create(payload);
    res.status(201).json(p);
  } catch (err) { next(err); }
};

exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.findAll({ where: { createdBy: req.user.id } });
    res.json(patients);
  } catch (err) { next(err); }
};

exports.getPatient = async (req, res, next) => {
  try {
    const p = await Patient.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Patient not found' });
    // ensure owner
    if (p.createdBy !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    res.json(p);
  } catch (err) { next(err); }
};

exports.updatePatient = async (req, res, next) => {
  try {
    const p = await Patient.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Patient not found' });
    if (p.createdBy !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await p.update(req.body);
    res.json(p);
  } catch (err) { next(err); }
};

exports.deletePatient = async (req, res, next) => {
  try {
    const p = await Patient.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Patient not found' });
    if (p.createdBy !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await p.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
