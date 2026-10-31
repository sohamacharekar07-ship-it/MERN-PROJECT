# 🎓 StudentHub – Student Record Manager

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** web application designed to manage student records efficiently. StudentHub allows users to add, view, update, delete, and search student information through a simple and user-friendly interface.

---

## 📌 Project Description

StudentHub is a Student Record Management System that stores student details in a MongoDB database. It provides a React-based frontend and a Node.js/Express backend with REST API integration.

The application supports complete CRUD operations, real-time search, data validation, and duplicate roll number protection to ensure accurate and reliable student records.

## 🚀 Technologies Used

| Technology | Purpose |
|---|---|
| React.js (Vite) | Frontend development |
| Node.js | JavaScript runtime |
| Express.js | Backend API development |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| Axios | API communication |
| HTML, CSS, JavaScript | Frontend design and functionality |
| Visual Studio Code | Code editor |
| Git & GitHub | Version control |

## ✨ Features

- **Add Students:** Add new student records with all required details.
- **View Students:** Display all student records in a structured table.
- **Update Students:** Edit and update existing student information.
- **Delete Students:** Delete student records with a confirmation dialog.
- **Search Students:** Search records by name, roll number, course, email, or phone number.
- **Form Validation:** Frontend and backend validation to prevent invalid data.
- **Duplicate Protection:** Prevents duplicate roll numbers with a clear error message (HTTP 409).
- **Success & Error Messages:** Displays appropriate feedback for every operation.

## 🛡️ Validation Rules

| Field | Validation |
|---|---|
| Name | Required, 2–60 characters; letters, spaces, dots, apostrophes and hyphens only |
| Roll Number | Required, unique, 3–15 characters; letters, digits and hyphens only |
| Course | Required; must be a supported course |
| Email | Required, valid email format, stored in lowercase |
| Phone | Required, exactly 10 digits, starting with 6–9 |
| Marks | Required, numeric value between 0 and 100 |

**Additional Validation:**
- Spaces-only input is not accepted.
- Roll numbers are automatically stored in uppercase.
- Emails are automatically stored in lowercase.
- Duplicate roll numbers are rejected.

## 📂 Project Structure

```text
studenthub/
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── package.json
│   └── index.html
│
└── README.md
```

*Note: The folder structure above represents the main project organization. Adjust filenames if your actual project structure differs.*

## ⚙️ Prerequisites

Before running the project, make sure you have installed:

- [Node.js](https://nodejs.org/) (Version 18 or above)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) or a MongoDB Atlas account
- [Visual Studio Code](https://code.visualstudio.com/)
- npm (comes with Node.js)

## 💻 Installation and Setup

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project directory:

```bash
cd studenthub
```

### Step 2: Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file by copying `.env.example`.

**For Windows:**

```bash
copy .env.example .env
```

Configure your `.env` file with your MongoDB connection string and required environment variables.

Example:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/studenthub
```

Load sample student records (optional):

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

Backend runs at:

`http://localhost:5000`

### Step 3: Setup Frontend

Open another terminal:

```bash
cd studenthub/frontend
npm install
npm run dev
```

Frontend runs at:

`http://localhost:5173`

**Note:** The Vite development server proxies `/api` requests to the backend at `http://localhost:5000`.

## 🔗 API Endpoints

The backend provides the following REST API endpoints:

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Retrieve all students |
| GET | `/api/students?search=term` | Search student records |
| GET | `/api/students/:id` | Retrieve a specific student |
| POST | `/api/students` | Add a new student |
| PUT | `/api/students/:id` | Update an existing student |
| DELETE | `/api/students/:id` | Delete a student |

### Sample POST Request

**Endpoint:**

```http
POST /api/students
```

**Request Body:**

```json
{
  "name": "John Doe",
  "rollNo": "T005",
  "course": "B.Sc.IT",
  "email": "name@example.com",
  "phone": "9545040788",
  "marks": 82
}
```

**Sample Response:**

```json
{
  "message": "Student added successfully"
}
```

*The exact response structure may vary depending on your backend implementation.*

## 🧪 Testing Checklist

The following functionalities can be tested:

| Test Case | Expected Result |
|---|---|
| Add a valid student | Student appears in the table and MongoDB |
| Edit a student | Updated details are saved |
| Delete a student | Confirmation appears and record is deleted |
| Search using T00 | Matching records are displayed |
| Search using B.Sc.IT | Matching course records are displayed |
| Submit an empty form | Required field errors are displayed |
| Enter marks as 150 | Validation error is displayed |
| Enter phone as 12345 | Validation error is displayed |
| Add duplicate roll number T005 | Duplicate error (HTTP 409) is displayed |
| Stop the backend server | Frontend displays an error message |

**API Testing:** GET, POST, PUT, and DELETE endpoints can also be tested using Postman.

## 🗄️ Database

StudentHub uses **MongoDB** to store student records.

Each student record contains:

- Student Name
- Roll Number
- Course
- Email Address
- Phone Number
- Marks

MongoDB Compass can be used to view and manage the stored student records.

## 👨‍💻 Author

**Soham Sachin Acharekar**

- Roll Number: T001
- Class: TY B.Sc. IT
- Project: StudentHub – Student Record Manager

---

⭐ **If you find this project useful, consider giving this repository a star!**

