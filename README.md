Task Management Application - Oritso Assignment
Overview
This Task Management application is designed as part of the Oritso recruitment process. It demonstrates a candidate's proficiency in full-stack application development using the MVC architecture. The application allows users to create, read, update, delete, and search for tasks with a responsive frontend and secure backend.

🔗 Frontend GitHub Repository: https://github.com/aliabrar21/Task-Manager-Client-Side

🔗 Backend GitHub Repository: https://github.com/aliabrar21/Task-Manager-Server-Side

Database Design
Data Dictionary
Field Name	Data Type	Description
task_id	INT (PK)	Unique ID for each task
task_title	VARCHAR	Title of the task
task_description	TEXT	Description of the task
task_due_date	DATE	Due date for the task
task_status	VARCHAR	Status of the task (Pending/Completed)

Indexes Used
Primary key on task_id

Index on task_due_date, task_status for efficient filtering

Approach
Code First approach has been used to allow easy versioning and migrations with ORM support.

Application Structure
Architecture
This is a Single Page Application (SPA) built with React and connected to an API developed using Node.js and Express.js.

Frontend Structure
Technology Used: React.js (SPA)

Why: React is lightweight, scalable, component-based, and ideal for dynamic updates required in task management.

The frontend uses React Router for routing, Axios for API calls, and Tailwind CSS for responsive UI.

Backend Structure
Technology Used: Node.js + Express.js (REST API)

Why: Enables building fast and scalable APIs, and works seamlessly with PostgreSQL.

API Endpoints
GET /tasks - List all tasks

POST /tasks - Create a new task

GET /tasks/:id - Get task by ID

PUT /tasks/:id - Update task by ID

DELETE /tasks/:id - Delete task by ID

GET /tasks/search?q=keyword - Search tasks

Build and Install
Environment Details
Node.js (v18+)

PostgreSQL (v14+)

React (v18+)

Dependencies
Frontend
React

Axios

React Router DOM

Tailwind CSS

Backend
Express

pg (PostgreSQL client)

CORS

dotenv

Build Instructions
Frontend
bash
Copy
Edit
cd frontend
npm install
npm run build
Backend
bash
Copy
Edit
cd backend
npm install
npm run dev
Run Instructions
Frontend
bash
Copy
Edit
npm start
Backend
bash
Copy
Edit
npm start
Ensure PostgreSQL is running and environment variables are properly configured.

General Documentation
Authentication: JWT-based user authentication (optional for extension)

Error Handling: Standardized error response structure used

Logging: Console logs added; extendable to use Winston or Morgan

SCM:

Frontend: GitHub - https://github.com/aliabrar21/Task-Manager-Client-Side

Backend: GitHub - https://github.com/aliabrar21/Task-Manager-Server-Side

Project Management Tool: GitHub Projects board used for task tracking

Demonstrated Skills
CRUD functionality

SPA development using React.js

REST API development using Node.js

Database design and indexing in PostgreSQL

Git & GitHub proficiency

End-to-end documentation in markdown

Deployment readiness

Final Notes
All development was done individually by the candidate. External resources were referred only for understanding or troubleshooting, and not for copy-pasting the solution. A full demo will be presented during the face-to-face discussion.

Candidate: Abrar Ali
Frontend GitHub Repo: https://github.com/aliabrar21/Task-Manager-Client-Side
Backend GitHub Repo: https://github.com/aliabrar21/Task-Manager-Server-Side

Submitted as part of Oritso Recruitment Assignment Process.
