const express = require('express');
const {homePage, studentSignup, studentSignin, studentSignout} = require('../controllers/indexController')
const router = express.Router();

router.get('/', homePage)

router.post('/student/signup',studentSignup)
router.post('/student/signin',studentSignin)
// router.get('/student/signout',studentSignout)

module.exports = router;