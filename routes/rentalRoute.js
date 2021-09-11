const express = require("express");
const router = express.Router();
const rentalController = require('../controllers/rentalController');
const { loginAuth, verifyToken} = require('../authorization/authToken')

router.get('/api/rental', rentalController.get_all_rented_movies);
router.post('/api/rental', verifyToken,rentalController.create_new_rental);


module.exports = router;