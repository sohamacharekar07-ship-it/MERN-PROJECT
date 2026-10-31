const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Mongoose validation errors -> 400 with per-field messages
  if (err.name === "ValidationError") {
    const errors = {};
    Object.values(err.errors).forEach((e) => {
      errors[e.path] = e.message;
    });
    return res.status(400).json({ message: "Please fix the highlighted fields", errors });
  }

  // Duplicate key (unique index) -> 409
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || "rollNo";
    const value = err.keyValue ? err.keyValue[field] : "";
    const message = `A student with ${field === "rollNo" ? "roll number" : field} ${value} already exists`;
    return res.status(409).json({ message, errors: { [field]: message } });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: `Invalid value for ${err.path}` });
  }

  console.error(err);
  res.status(500).json({ message: "Server error. Please try again later." });
};

module.exports = { notFound, errorHandler };
