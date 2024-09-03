const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();

router.get('/find-by-user', homeController.findHomesByUser);
router.put('/update-users', homeController.updateHomeUsers);

module.exports = router;
