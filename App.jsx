import { useCallback, useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import Toast from "./components/Toast";
import { getStudents, createStudent, updateStudent, deleteStudent } from "./api";

export default function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [serverErrors, setServerErrors] = useState({});
  const [toast, setToast] = useState(null);

  const notify = (type, text) => setToast({ type, text });
  const closeToast = useCallback(() => setToast(null), []);

  const load = useCallback(async (term) => {
    try {
      setLoading(true);
      const { data } = await getStudents(term);
      setStudents(data);
    } catch (err) {
      notify("error", err.response?.data?.message || "Could not load students. Is the server running?");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on first load and whenever the search text changes (debounced)
  useEffect(() => {
    const t = setTimeout(() => load(search), 300);
    return () => clearTimeout(t);
  }, [search, load]);

  const handleSave = async (values) => {
    setSaving(true);
    setServerErrors({});
    try {
      if (editing) {
        await updateStudent(editing._id, values);
        notify("success", "Student updated");
      } else {
        await createStudent(values);
        notify("success", "Student added");
      }
      setEditing(null);
      await load(search);
      return true;
    } catch (err) {
      const data = err.response?.data;
      setServerErrors(data?.errors || {});
      notify("error", data?.message || "Something went wrong. Please try again.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (student) => {
    const sure = window.confirm(
      `Delete ${student.name} (${student.rollNo})? This cannot be undone.`
    );
    if (!sure) return;
    try {
      await deleteStudent(student._id);
      if (editing?._id === student._id) setEditing(null);
      notify("success", "Student deleted");
      await load(search);
    } catch (err) {
      notify("error", err.response?.data?.message || "Could not delete the student");
    }
  };

  const average = students.length
    ? (students.reduce((sum, s) => sum + s.marks, 0) / students.length).toFixed(1)
    : "-";

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>StudentHub</h1>
          <p>Student records for your department, in one place.</p>
        </div>
        <dl className="stats">
          <div><dt>Students shown</dt><dd>{students.length}</dd></div>
          <div><dt>Average marks</dt><dd>{average}</dd></div>
        </dl>
      </header>

      <main className="layout">
        <StudentForm
          editing={editing}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setServerErrors({}); }}
          saving={saving}
          serverErrors={serverErrors}
        />

        <section className="panel list">
          <div className="list-head">
            <h2>All students</h2>
            <input
              type="search"
              className="search"
              placeholder="Search by name, roll no., course or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search students"
            />
          </div>
          <StudentTable
            students={students}
            loading={loading}
            search={search.trim()}
            onEdit={(s) => { setServerErrors({}); setEditing(s); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            onDelete={handleDelete}
          />
        </section>
      </main>

      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
}
