import { useEffect, useState } from "react";
import { COURSES, validateStudent } from "../validation";

const EMPTY = { name: "", rollNo: "", course: "", email: "", phone: "", marks: "" };

const FIELDS = [
  { name: "name", label: "Full name", type: "text", placeholder: "e.g. Ritesh Chaubey" },
  { name: "rollNo", label: "Roll number", type: "text", placeholder: "e.g. T005" },
  { name: "email", label: "Email", type: "email", placeholder: "name@example.com" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "10-digit mobile number" },
  { name: "marks", label: "Marks (0-100)", type: "number", placeholder: "e.g. 78" },
];

export default function StudentForm({ editing, onSave, onCancel, saving, serverErrors }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  // Fill the form when "Edit" is clicked, clear it otherwise
  useEffect(() => {
    setValues(
      editing
        ? {
            name: editing.name,
            rollNo: editing.rollNo,
            course: editing.course,
            email: editing.email,
            phone: editing.phone,
            marks: String(editing.marks),
          }
        : EMPTY
    );
    setErrors({});
  }, [editing]);

  // Show errors that came back from the backend (e.g. duplicate roll number)
  useEffect(() => {
    if (Object.keys(serverErrors).length) setErrors(serverErrors);
  }, [serverErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validateStudent(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    const ok = await onSave({
      ...values,
      name: values.name.trim(),
      rollNo: values.rollNo.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      marks: Number(values.marks),
    });
    if (ok && !editing) setValues(EMPTY);
  };

  const renderError = (name) =>
    errors[name] ? (
      <p className="field-error" id={`${name}-error`}>{errors[name]}</p>
    ) : null;

  return (
    <form className="panel form" onSubmit={handleSubmit} noValidate>
      <h2>{editing ? "Edit student" : "Add a student"}</h2>

      {FIELDS.slice(0, 2).map((f) => (
        <label key={f.name} className={errors[f.name] ? "has-error" : ""}>
          {f.label}
          <input {...f} value={values[f.name]} onChange={handleChange}
            aria-invalid={!!errors[f.name]} aria-describedby={`${f.name}-error`} />
          {renderError(f.name)}
        </label>
      ))}

      <label className={errors.course ? "has-error" : ""}>
        Course
        <select name="course" value={values.course} onChange={handleChange}
          aria-invalid={!!errors.course} aria-describedby="course-error">
          <option value="">Select a course</option>
          {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {renderError("course")}
      </label>

      {FIELDS.slice(2).map((f) => (
        <label key={f.name} className={errors[f.name] ? "has-error" : ""}>
          {f.label}
          <input {...f} value={values[f.name]} onChange={handleChange}
            {...(f.name === "marks" ? { min: 0, max: 100, step: "any" } : {})}
            aria-invalid={!!errors[f.name]} aria-describedby={`${f.name}-error`} />
          {renderError(f.name)}
        </label>
      ))}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : editing ? "Save changes" : "Add student"}
        </button>
        {editing && (
          <button type="button" className="btn" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}
