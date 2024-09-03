const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/find-all', userController.findAllUsers);
router.get('/find-by-home', userController.findUsersByHome);

module.exports = router;
