const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true }, // e.g. EMP001
  name: { type: String, required: true, index: true },
  email: { type: String },
  phone: { type: String },
  department: { type: String },
  designation: { type: String },
  photoUrl: { type: String }, // URL to /uploads/...
  joiningDate: { type: Date },
  createdBy: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
