#Digital Employee ID System (Full Stack MERN + Secure Auth)

A complete Digital Employee Identification System built with Node.js, Express, MongoDB, React, JWT authentication, role-based access, employee profile management, and image upload.

This project allows organizations to generate secure digital IDs for employees, store employee details, and retrieve the information using a unique employee ID.

📁 Project Structure

digital-id/
│
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── uploads/          # Auto-created for images
│   ├── .env              # Not pushed (ignored)
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   └── package.json
│
├── README.md
└── .gitignore

⚙️ Backend Installation & Run

cd backend

npm install

npm start

🎨 Frontend Installation & Run

cd frontend

npm install

🛡 Tech Stack
Frontend

React.js

Axios

Modern CSS design

Responsive UI

Backend

Node.js

Express

JWT Auth

Multer (file uploads)

Bcrypt (password hashing)

Database

MongoDB Atlas / Local MongoDB
npm start
