# School App

A simple Node.js application for managing school-related data.

## Setup

1. Clone the repository: 
git clone ...
cd my-school-app

2. Install dependencies: npm install

3. Create a `.env` file in the root directory and add your environment variables:

4. Start the server: npm start

5. Access the forgot password form at: http://localhost:3000/forgot-password

## Project Structure

school-app/
│
├── controllers/
│ ├── authController.js
│ ├── courseController.js
│ ├── studentController.js
│ └── instructorController.js
│
├── models/
│ ├── Course.js
│ ├── Student.js
│ ├── Instructor.js
│ └── User.js
│
├── routes/
│ ├── authRoute.js
│ ├── courseRoute.js
│ ├── studentRoute.js
│ └── instructorRoute.js
│
├── views/
│ └── forgot-password.html
│
├── .env
├── app.js
├── README.md
├── package.json
└── package-lock.json


## Endpoints

- `POST /api/v1/auth/create-account`: Create a new user account.
- `POST /api/v1/auth/login`: Log in a user.
- `POST /api/v1/auth/forgot-password`: Request a password reset.
- `POST /api/v1/auth/reset-password`: Reset a user's password.
- `POST /api/v1/courses/assign-lecturer`: Assign a lecturer to a course.
- `PUT /api/v1/students/:studentId/course`: Update a student's courses.
- `GET /api/v1/students/colleagues`: Get a list of student colleagues.
- `GET /api/v1/students/colleagues/:colleagueId`: Get a specific colleague's details.
- `PUT /api/v1/instructors/:instructorId/password`: Update an instructor's password.
