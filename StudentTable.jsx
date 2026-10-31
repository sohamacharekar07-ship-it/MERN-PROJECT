export default function StudentTable({ students, loading, search, onEdit, onDelete }) {
  if (loading) return <div className="empty">Loading students...</div>;

  if (students.length === 0) {
    return (
      <div className="empty">
        {search
          ? `No students match "${search}". Try a name, roll number, course or email.`
          : "No students yet. Add the first one using the form."}
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Roll no.</th>
            <th>Name</th>
            <th>Course</th>
            <th>Email</th>
            <th>Phone</th>
            <th className="num">Marks</th>
            <th><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td className="roll">{s.rollNo}</td>
              <td>{s.name}</td>
              <td>{s.course}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td className="num">
                <span className={s.marks >= 40 ? "marks pass" : "marks fail"}>{s.marks}</span>
              </td>
              <td className="actions">
                <button className="btn btn-small" onClick={() => onEdit(s)}
                  aria-label={`Edit ${s.name}`}>Edit</button>
                <button className="btn btn-small btn-danger" onClick={() => onDelete(s)}
                  aria-label={`Delete ${s.name}`}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
