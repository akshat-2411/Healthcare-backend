const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const controller = require('../controllers/patientController');
const { body } = require('express-validator');

router.post('/', authenticate, [
  body('name').notEmpty().withMessage('Name required')
], controller.createPatient);

router.get('/', authenticate, controller.getAllPatients);
router.get('/:id', authenticate, controller.getPatient);
router.put('/:id', authenticate, controller.updatePatient);
router.delete('/:id', authenticate, controller.deletePatient);

module.exports = router;
