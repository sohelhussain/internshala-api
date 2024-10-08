const { catchAsyncError } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/sendToken");

exports.homePage = catchAsyncError(async (req, res) => {
  res.json({ message: "this is homePage test" });
});

exports.currentStudent = catchAsyncError(async (req, res) => {
  const student = await studentModel.findById(req.id).select("+password").exec();
  res.json(student);
});

exports.studentSignup = catchAsyncError(async (req, res) => {
  //   const student = await studentModel.create({
  //     email: req.body.email,
  //     packageName: req.body.password,
  //   });
  const student = await new studentModel(req.body).save();
  sendtoken(student, 201, res);
});

exports.studentSignin = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findOne({ email: req.body.email }).select("+password").exec();
  if (!student)
    return next(
      new ErrorHandler("student not found with this email address", 404)
    );
  const isMatch = student.comparePassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("wrong password", 404));
  sendtoken(student, 201, res);

});

exports.studentSignout = catchAsyncError(async (req, res) => {

  res.clearCookie('token');
  res.json({message: 'Succesfully signout'})

});

exports.studentsendmail = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findOne({email: req.body.email});

  if (!student)
    return next(
      new ErrorHandler("student not found with this email address", 404)
    );

    const url = `${req.protocol}://${req.get("host")}/student/forgot-password-link/${student._id}`;
    sendmail(req, res, next, url);

    student.resetPasswordToken = "1";
    await student.save();

   res.json({student,url});
})

exports.studentforgetlink = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.params.studentId).exec(); 

  if (!student)
    return next(
      new ErrorHandler("student not found with this email address", 404)
    );


if(student.resetPasswordToken == "1"){
  student.resetPasswordToken = "0";
  student.password = req.body.password
  await student.save(); 
}else{
  return next(
    new ErrorHandler("Invailid password link ! try again", 500)
  ); 
}
res.status(200).json({message: "password change successfully"})

}) 

exports.studentresetpassword = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id).exec();
  student.password = req.body.password;
  await student.save();
  sendtoken(student, 201, res);
});
