const { catchAsyncError } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/sendToken");

exports.homePage = catchAsyncError(async (req, res) => {
  res.json({ message: "this is homePage test" });
});

exports.studentSignup = catchAsyncError(async (req, res) => {
  //   const student = await studentModel.create({
  //     email: req.body.email,
  //     packageName: req.body.password,
  //   });
  const student = await new studentModel(req.body).save();
  sendtoken(student, 201, res);
});

exports.studentSignin = catchAsyncError(async (req, res) => {
  const student = await studentModel.findOne({ email: req.body.email }).select("+password").exec();
  if (!student)
    return next(
      new ErrorHandler("student not found with this email address", 404)
    );
  const isMatch = student.comparePassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("wrong password", 404));
  sendtoken(student, 201, res);
});

// exports.studentSignout = catchAsyncError(async (req, res) => {});
