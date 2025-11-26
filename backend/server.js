require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

// serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/employee', require('./routes/employee'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
