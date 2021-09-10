const express = require("express");
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/api/clients', clientController.get_all_clients);
router.post('/api/clients', clientController.create_new_client);
router.put('/clients/update/:id', clientController.update_client);
router.delete('/clients/:id', clientController.delete_client)

module.exports = router;