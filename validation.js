export const COURSES = ["B.Sc.IT", "B.Sc.CS", "B.Com", "BMS", "BAF", "BA"];

const NAME_RX = /^[A-Za-z][A-Za-z .'-]*$/;
const ROLL_RX = /^[A-Za-z0-9-]{3,15}$/;
const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RX = /^[6-9]\d{9}$/;

// Returns an object like { name: "Name is required" }. Empty object = valid.
export function validateStudent(v) {
  const e = {};

  const name = v.name.trim();
  if (!name) e.name = "Name is required";
  else if (name.length < 2) e.name = "Name must be at least 2 characters";
  else if (name.length > 60) e.name = "Name must be at most 60 characters";
  else if (!NAME_RX.test(name)) e.name = "Name can contain only letters, spaces and . ' -";

  const roll = v.rollNo.trim();
  if (!roll) e.rollNo = "Roll number is required";
  else if (!ROLL_RX.test(roll)) e.rollNo = "Roll number must be 3-15 characters (letters, digits, hyphen)";

  if (!v.course) e.course = "Course is required";
  else if (!COURSES.includes(v.course)) e.course = "Choose a valid course";

  const email = v.email.trim();
  if (!email) e.email = "Email is required";
  else if (!EMAIL_RX.test(email)) e.email = "Enter a valid email address";

  const phone = v.phone.trim();
  if (!phone) e.phone = "Phone number is required";
  else if (!PHONE_RX.test(phone)) e.phone = "Phone must be 10 digits and start with 6, 7, 8 or 9";

  const marksText = String(v.marks).trim();
  if (marksText === "") e.marks = "Marks are required";
  else if (Number.isNaN(Number(marksText))) e.marks = "Marks must be a number";
  else if (Number(marksText) < 0 || Number(marksText) > 100) e.marks = "Marks must be between 0 and 100";

  return e;
}
