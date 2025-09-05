const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const controller = require('../controllers/doctorController');
const { body } = require('express-validator');

router.post('/', authenticate, [
  body('name').notEmpty().withMessage('Name required')
], controller.createDoctor);

router.get('/', authenticate, controller.getAllDoctors);
router.get('/:id', authenticate, controller.getDoctor);
router.put('/:id', authenticate, controller.updateDoctor);
router.delete('/:id', authenticate, controller.deleteDoctor);

module.exports = router;
