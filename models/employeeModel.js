const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
      minLength: [4, "First Name shuld be atlest 4 character long"],
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required"],
      minLength: [4, "Last Name shuld be atlest 4 character long"],
    },
    orglogo: {
      type: Object,
      default: {
        fileId: "",
        url: "https://d2jhcfgvzjqsa8.cloudfront.net/storage/2022/04/download.png",
      },
    },
    orgname: {
      type: String,
      required: [true, "organization name is required"],
      minLength: [4, "organization name shuld be atlest 4 character long"],
    },
    contact: {
      type: String,
      required: [true, "First Name is required"],
      maxLength: [14, "contact must not exceed 10 character"],
      minLength: [10, "contact shuld be atlest 10 character long"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      select: false,
      maxLength: [15, "Password must be at least under 15 characters"],
      minLength: [5, "Password must be at least 5 characters"],
      // match:[]
    },
    resetPasswordToken: {
      type: String,
      default: "0",
    },
   internships: [{type: mongoose.Schema.Types.ObjectId, ref: "internship"}],
   jobs: [{type: mongoose.Schema.Types.ObjectId, ref: "job"}],  
  },
  { timestamps: true }
);

employeeSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

employeeSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//! don't use arrow function

employeeSchema.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = employeeModel;

