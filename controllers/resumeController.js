const { catchAsyncError } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const {v4: uuidv4} = require('uuid');

exports.resume = catchAsyncError(async(req, res, next) => {
    const student = await studentModel.findById(req.id).exec(); 
    res.json({message: 'this is resume page'})
}) 


exports.addeducation = catchAsyncError(async(req, res, next)=>{
    const student = await studentModel.findById(req.id).exec();

    student.resume.education.push({ ...req.body, id: uuidv4() }); 
    console.log(student);
    await student.save();
    res.json({message: 'this is added education'})
})
exports.editeducation = catchAsyncError(async(req, res, next)=>{
    const student = await studentModel.findById(req.id).exec();

    const eduIndex = student.resume.education.findIndex(i=> i.id === req.params.eduid); 
    student.resume.education[eduIndex] = {...student.resume.education[eduIndex], ...req.body};
    console.log(student);
    await student.save();
    res.json({message: 'updated your section education'}) 
})

exports.deleteeducation = catchAsyncError(async(req, res, next)=>{
    const student = await studentModel.findById(req.id).exec();

    const filterededu = student.resume.education.filter(
        (i) => i.id !== req.params.eduid
    );
    student.resume.education = filterededu;
    await student.save();
    res.json({ message: "Education Deleted!" });
})

