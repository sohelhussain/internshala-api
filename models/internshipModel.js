const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    profile: String,
    skill: String,
    internshiptype: { type: String, enum: ["In office", "Remote"] },
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
      status: {
        type: String,
        enum: ["Fixed", "Negotiable", "Performance based", "Unpaid"],
      },
      amount: Number,
    },
    perks: String,
    assessments: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
  },
  { timestamps: true }
);

const internshipModel = mongoose.model("internship", internshipSchema);

module.exports = internshipModel;
