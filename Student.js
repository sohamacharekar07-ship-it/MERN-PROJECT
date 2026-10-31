const mongoose = require("mongoose");

const COURSES = ["B.Sc.IT", "B.Sc.CS", "B.Com", "BMS", "BAF", "BA"];

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [60, "Name must be at most 60 characters"],
      match: [
        /^[A-Za-z][A-Za-z .'-]*$/,
        "Name can contain only letters, spaces and . ' -",
      ],
    },
    rollNo: {
      type: String,
      required: [true, "Roll number is required"],
      trim: true,
      uppercase: true,
      unique: true, // duplicate check is enforced by MongoDB itself
      match: [
        /^[A-Z0-9-]{3,15}$/,
        "Roll number must be 3-15 characters (letters, digits, hyphen)",
      ],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
      enum: { values: COURSES, message: "Choose a valid course" },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Enter a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [
        /^[6-9]\d{9}$/,
        "Phone must be 10 digits and start with 6, 7, 8 or 9",
      ],
    },
    marks: {
      type: Number,
      required: [true, "Marks are required"],
      min: [0, "Marks cannot be below 0"],
      max: [100, "Marks cannot be above 100"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
module.exports.COURSES = COURSES;
