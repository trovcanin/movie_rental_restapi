const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const { loginAuth, verifyToken} = require('../authorization/authToken')

router.get('/api/user', userController.get_all_users);
router.post('/api/user', userController.create_new_user);
router.delete('/api/user/:id', verifyToken , userController.delete_user);

module.exports = router;