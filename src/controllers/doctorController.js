const { Doctor } = require('../models');
const { validationResult } = require('express-validator');

exports.createDoctor = async (req, res, next) => {
  try {
    const errs = validationResult(req); if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });
    const payload = req.body;
    payload.createdBy = req.user.id;
    const d = await Doctor.create(payload);
    res.status(201).json(d);
  } catch (err) { next(err); }
};

exports.getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (err) { next(err); }
};

exports.getDoctor = async (req, res, next) => {
  try {
    const d = await Doctor.findByPk(req.params.id);
    if (!d) return res.status(404).json({ message: 'Doctor not found' });
    res.json(d);
  } catch (err) { next(err); }
};

exports.updateDoctor = async (req, res, next) => {
  try {
    const d = await Doctor.findByPk(req.params.id);
    if (!d) return res.status(404).json({ message: 'Doctor not found' });
    // Only creator can update
    if (d.createdBy !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await d.update(req.body);
    res.json(d);
  } catch (err) { next(err); }
};

exports.deleteDoctor = async (req, res, next) => {
  try {
    const d = await Doctor.findByPk(req.params.id);
    if (!d) return res.status(404).json({ message: 'Doctor not found' });
    if (d.createdBy !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await d.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
