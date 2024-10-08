const express = require("express");
const {
  homePage,
  studentSignup,
  studentSignin,
  studentSignout,
  currentStudent,
  studentsendmail,
  studentforgetlink,
  studentresetpassword
} = require("../controllers/indexController");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth");

router.get("/", isAuthenticated, homePage);
router.post("/student", isAuthenticated, currentStudent);

router.post("/student/signup", studentSignup);
router.post("/student/signin", studentSignin);
router.get("/student/signout", isAuthenticated,studentSignout);
router.post("/student/send-mail", studentsendmail);
router.post("/student/forgot-password-link/:studentId", studentforgetlink);
router.post("/student/reset-password/:studentId", isAuthenticated, studentresetpassword);



module.exports = router;
