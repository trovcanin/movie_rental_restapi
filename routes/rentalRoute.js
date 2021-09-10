const express = require("express");
const router = express.Router();
const rentalController = require('../controllers/rentalController');

// router.get('/api/rental', rentalController.create_new_rental);
router.post('/api/rental', rentalController.create_new_rental);


module.exports = router;