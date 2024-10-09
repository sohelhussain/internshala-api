const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const studentSchema = new mongoose.Schema(
  {
    firstname:{
      type:String,
      required: [true, 'First Name is required'],
      minLength: [4, "First Name shuld be atlest 4 character long"]
  },
    lastname:{
      type:String,
      required: [true, 'Last Name is required'],
      minLength: [4, "Last Name shuld be atlest 4 character long"]
  },
    avatar:String,
    contact:{
      type:String,
      required: [true, 'First Name is required'],
      maxLength: [14, "contact must not exceed 10 character"],
      minLength: [10, "contact shuld be atlest 10 character long"]
  },
    city:{
      type:String,
      required: [true, 'City is required'],
  },
    gender:{type: String, enum: ["Male", "Female", "Other"]},
    email: {
        type:String,
        unique: true,
        required: [true, 'Email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type:String,
        select:false,
        maxLength: [15,"Password must be at least under 15 characters"],
        minLength: [5,"Password must be at least 5 characters"],
        // match:[]
    },
    resetPasswordToken: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

studentSchema.pre("save", function () {
  if(!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, salt)
})

studentSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}


//! don't use arrow function

studentSchema.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const studentModel = mongoose.model("student", studentSchema);

module.exports = studentModel;
