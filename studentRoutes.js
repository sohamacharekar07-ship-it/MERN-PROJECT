const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");

const router = express.Router();

const FIELDS = ["name", "rollNo", "course", "email", "phone", "marks"];

// Copy only the fields we allow from the request body
const pick = (body) =>
  FIELDS.reduce((obj, key) => {
    if (body[key] !== undefined) obj[key] = body[key];
    return obj;
  }, {});

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const checkId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid student id" });
  }
  next();
};

// GET /api/students?search=term  -> list (and search) students
router.get("/", async (req, res, next) => {
  try {
    const term = (req.query.search || "").trim();
    const filter = {};
    if (term) {
      const rx = new RegExp(escapeRegex(term), "i");
      filter.$or = [
        { name: rx },
        { rollNo: rx },
        { course: rx },
        { email: rx },
        { phone: rx },
      ];
    }
    const students = await Student.find(filter).sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    next(err);
  }
});

// GET /api/students/:id
router.get("/:id", checkId, async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// POST /api/students
router.post("/", async (req, res, next) => {
  try {
    const student = await Student.create(pick(req.body));
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
});

// PUT /api/students/:id
router.put("/:id", checkId, async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    student.set(pick(req.body));
    await student.save(); // runs all schema validators
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/students/:id
router.delete("/:id", checkId, async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted", id: student._id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
