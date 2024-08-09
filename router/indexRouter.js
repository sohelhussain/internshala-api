const express = require('express');
const {homePage} = require('../controllers/indexController')
const router = express.Router();

router.get('/', homePage)

module.exports = router;