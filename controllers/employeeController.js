const exp = require("constants");
const { catchAsyncError } = require("../middlewares/catchAsyncErrors");
const employeeModel = require("../models/employeeModel");
const internshipModel = require("../models/internshipModel");
const jobModel = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/sendToken");
const path = require("path");
const imagekit = require("../utils/imagekit").initImageKit()

exports.homePage = catchAsyncError(async (req, res) => {
  res.json({ message: "this is homePage test" });
});

exports.currentemployee = catchAsyncError(async (req, res) => {
  const employee = await employeeModel.findById(req.id).exec();
  res.json(employee);
});

exports.employeeSignup = catchAsyncError(async (req, res) => {
  //   const employee = await employeeModel.create({
  //     email: req.body.email,
  //     packageName: req.body.password,
  //   });
  const employee = await new employeeModel(req.body).save();
  sendtoken(employee, 201, res);
});

exports.employeeSignin = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel.findOne({ email: req.body.email }).select("+password").exec();
  if (!employee)
    return next(
      new ErrorHandler("employee not found with this email address", 404)
    );
  const isMatch = employee.comparePassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("wrong password", 404));
  sendtoken(employee, 201, res);

});

exports.employeeSignout = catchAsyncError(async (req, res) => {

  res.clearCookie('token');
  res.json({ message: 'Succesfully signout' })

});

exports.employeesendmail = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel.findOne({ email: req.body.email });

  if (!employee)
    return next(
      new ErrorHandler("employee not found with this email address", 404)
    );

  const url = `${req.protocol}://${req.get("host")}/employee/forgot-password-link/${employee._id}`;
  sendmail(req, res, next, url);

  employee.resetPasswordToken = "1";
  await employee.save();

  res.json({ employee, url });
})

exports.employeeforgetlink = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel.findById(req.params.employeeId).exec();

  if (!employee)
    return next(
      new ErrorHandler("employee not found with this email address", 404)
    );


  if (employee.resetPasswordToken == "1") {
    employee.resetPasswordToken = "0";
    employee.password = req.body.password
    await employee.save();
  } else {
    return next(
      new ErrorHandler("Invailid password link ! try again", 500)
    );
  }
  res.status(200).json({ message: "password change successfully" })

})

exports.employeeresetpassword = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel.findById(req.id).exec();
  employee.password = req.body.password;
  await employee.save();
  sendtoken(employee, 201, res);
});


exports.employeeupdate = catchAsyncError(async (req, res) => {
  await employeeModel.findByIdAndUpdate(req.id, req.body).exec();
  res.status(200).json({ success: true, message: "employee updated successfully" });
});


exports.orglogo = catchAsyncError(async (req, res) => {
  const employee = await employeeModel.findById(req.id);
  const file = req.files.orglogo;

  const modifiedFileName = `resumebuilder-${Date.now()}-${Math.floor(Math.random() * 30)}-${path.extname(file.name)}`;


  if (employee.orglogo.fileId !== "") {
    await imagekit.deleteFile(employee.orglogo.fileId)
  }

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName
  });
  employee.orglogo = { fileId, url }
  await employee.save();

  res.status(200).json({ success: true, message: "orglog set successfully" });
});




///Internship----

exports.createInternship = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel.findById(req.id);
  const internship = await new internshipModel(req.body);
  internship.employee = employee._id;
  employee.internships.push(internship._id);
  await internship.save();
  await employee.save();
  res.status(201).json({ success: true, message: "internship created successfully" });
})


exports.readInternship = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel.findById(req.id).populate("internships").exec();
  res.status(200).json(employee.internships);
})


exports.readSingleInternship = catchAsyncError(async (req, res, next) => {
  const internship = await internshipModel.findById(req.params.id);
  res.status(200).json(internship);
})





///job----

exports.createJob = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel.findById(req.id);
  const job = await new jobModel(req.body);
  job.employee = employee._id;
  employee.jobs.push(job._id);
  await job.save();
  await employee.save();
  res.status(201).json({ success: true, message: "job created successfully" });
})


exports.readjob = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel.findById(req.id).populate("jobs").exec();
  res.status(200).json(employee.jobs);
})


exports.readSinglejob = catchAsyncError(async (req, res, next) => {
  const jobs = await jobModel.findById(req.params.id);
  res.status(200).json(jobs);
})
