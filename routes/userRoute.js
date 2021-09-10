const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/api/user', userController.get_all_users);
router.post('/api/user', userController.create_new_user);
router.put('/user/update/:id', userController.update_user);
router.delete('/user/:id', userController.delete_user)

module.exports = router;