const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const studentSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

studentSchema.pre("save", function () {
  if(!this.isModified()) {
    return;
  }
  const salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, salt)
})

studentSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

studentSchema.methods.getjwttoken = () => {
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE})
}

const studentModel = mongoose.model("student", studentSchema);

module.exports = studentModel;
