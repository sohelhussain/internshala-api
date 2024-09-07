const express = require("express");
const {
  homePage,
  studentSignup,
  studentSignin,
  studentSignout,
} = require("../controllers/indexController");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth");

router.get("/", isAuthenticated, homePage);

router.post("/student/signup", studentSignup);
router.post("/student/signin", studentSignin);
router.get("/student/signout", studentSignout);
router.get("/student/send-mail", studentSignout);

module.exports = router;
