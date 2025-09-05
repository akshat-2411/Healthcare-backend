const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const controller = require('../controllers/mappingController');
const { body } = require('express-validator');

router.post('/', authenticate, [
  body('patientId').isInt(),
  body('doctorId').isInt()
], controller.assignDoctor);

router.get('/', authenticate, controller.getAllMappings);
router.get('/:patientId', authenticate, controller.getMappingsForPatient);
router.delete('/:id', authenticate, controller.deleteMapping);

module.exports = router;
