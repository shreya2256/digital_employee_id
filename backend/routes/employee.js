const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// setup multer to store images in uploads/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Create employee (admin only)
// POST /api/employee
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone, department, designation, joiningDate } = req.body;

    // auto-generate employeeId: EMP + zero padded count
    const count = await Employee.countDocuments();
    const employeeId = 'EMP' + String(count + 1).padStart(4, '0');

    const emp = new Employee({
      employeeId,
      name,
      email,
      phone,
      department,
      designation,
      joiningDate,
      createdBy: req.admin.username
    });

    await emp.save();
    res.json(emp);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Upload photo for employee (admin only)
// POST /api/employee/upload/:id (form-data: file)
router.post('/upload/:id', auth, upload.single('file'), async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });

    emp.photoUrl = `/uploads/${req.file.filename}`;
    await emp.save();
    res.json(emp);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get employee by name (public) - search (case-insensitive)
// GET /api/employee/name/:name
router.get('/name/:name', async (req, res) => {
  try {
    const name = req.params.name;
    // exact match OR case-insensitive partial match
    const employees = await Employee.find({
      name: { $regex: new RegExp('^' + name + '$', 'i') } // exact name (case-insensitive)
    });
    // If none, try partial
    if (employees.length === 0) {
      const partial = await Employee.find({
        name: { $regex: new RegExp(name, 'i') }
      });
      return res.json(partial);
    }
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get by employeeId
// GET /api/employee/id/:employeeId
router.get('/id/:employeeId', async (req, res) => {
  try {
    const emp = await Employee.findOne({ employeeId: req.params.employeeId });
    if (!emp) return res.status(404).json({ message: 'Not found' });
    res.json(emp);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Admin list all employees
// GET /api/employee (admin protected)
router.get('/', auth, async (req, res) => {
  try {
    const all = await Employee.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
