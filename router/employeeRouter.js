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
  createInternship,
  readInternship,
  readSingleInternship,
  createJob,
  readjob,
  readSinglejob
} = require("../controllers/employeeController");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth");
const { create } = require("../models/employeeModel");

router.get("/",  homePage);
router.post("/", isAuthenticated, currentemployee);

router.post("/signup", employeeSignup);
router.post("/signin", employeeSignin);
router.get("/signout", isAuthenticated, employeeSignout);
router.post("/send-mail", employeesendmail);
router.post("/forgot-password-link/:employeeId", employeeforgetlink);
router.post("/reset-password/:employeeId", isAuthenticated, employeeresetpassword);
router.post("/employee-update", isAuthenticated, employeeupdate)
router.post("/employee-orglogo", isAuthenticated, orglogo);



///Internship----

//post
router.post("/internship/create", isAuthenticated, createInternship);

//manyread
router.get("/internship/read", isAuthenticated, readInternship);

//singleread
router.get("/internship/read/:id", isAuthenticated, readSingleInternship);



///Internship----

//post
router.post("/job/create", isAuthenticated, createJob);

//manyread
router.get("/job/read", isAuthenticated, readjob);

//singleread
router.get("/job/read/:id", isAuthenticated, readSinglejob);

module.exports = router;
