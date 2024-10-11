const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: String,
    skills: String,
    jobtype: { type: String, enum: ["In office", "Remote", "Hybrid"] },
    opening: Number,
    description: String,
    perks:String,
    assessments:String,
    preferences:String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
  },
  { timestamps: true }
);

const jobModel = mongoose.model("job", jobSchema);

module.exports = jobModel;
