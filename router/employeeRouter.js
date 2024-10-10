const express = require("express");
const {
  homePage,
  employeeSignup,
  employeeSignin,
  employeeSignout,
  currentemployee, 
  employeesendmail,
  employeeforgetlink,
  employeeresetpassword,
  employeeupdate,
  orglogo,
} = require("../controllers/employeeController");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth");

router.get("/",  homePage);
router.post("/", isAuthenticated, currentemployee);

router.post("/signup", employeeSignup);
router.post("/signin", employeeSignin);
router.get("/signout", isAuthenticated, employeeSignout);
router.post("/send-mail", employeesendmail);
router.post("/forgot-password-link/:employeeId", employeeforgetlink);
router.post("/reset-password/:employeeId", isAuthenticated, employeeresetpassword);
router.post("/employee-update", isAuthenticated, employeeupdate)
router.post("/employee-orglogo", isAuthenticated, orglogo)

module.exports = router;
