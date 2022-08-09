const express = require('express');
const router = express.Router();
const homeController = require('../controllers/HomeController');

router.get('/', homeController.index);
router.get('/about-us', homeController.aboutUs);

module.exports = router;
