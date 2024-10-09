const express = require("express")
const router = express.Router();
const {isAuthenticated} = require("../middlewares/auth");
const { resume,addeducation, editeducation, deleteeducation } = require("../controllers/resumeController");


//get
router.get('/', isAuthenticated, resume)

//post
router.post('/add-edu', isAuthenticated, addeducation)

//post
router.post('/edit-edu/:eduid', isAuthenticated, editeducation)
//post
router.post('/delete-edu/:eduid', isAuthenticated , deleteeducation)


module.exports = router