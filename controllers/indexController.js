const { catchAsyncError } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.homePage = catchAsyncError(async (req, res) => {
  res.json({ message: "this is homePage test" });
});

exports.studentSignup = catchAsyncError(async (req, res) => {
  //   const student = await studentModel.create({
  //     email: req.body.email,
  //     packageName: req.body.password,
  //   });
  const student = await new studentModel(req.body).save();
  res.json({ message: "user are signed up" });
});

exports.studentSignin = catchAsyncError(async (req, res) => {
  const student = await studentModel.findOne({ email: req.body.email }).select("+password").exec();
  if (!student)
    return next(
      new ErrorHandler("student not found with this email address", 404)
    );
  const isMatch = student.comparePassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("wrong password", 404));
  res.json(student);
});

// exports.studentSignout = catchAsyncError(async (req, res) => {});
