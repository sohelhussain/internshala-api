const mongoose = require("mongoose");
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

const studentModel = mongoose.model("student", studentSchema);

module.exports = studentModel;
