const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company is required"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Is required"],
    },
  },
  {
    timestamps: true,
  }
);
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
