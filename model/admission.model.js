import mongoose from "mongoose";
// const { Schema } = mongoose

const admissionSchema = new mongoose.Schema({

  // Student Details
  studentDetails: {
    studentName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    age: { type: Number, required: true, min: 3, max: 18 },
    bloodGroup: { type: String },
    religion: { type: String, required: true },
    castCategory: { type: String, required: true },
    nationality: { type: String, required: true },
    motherTongue: { type: String, required: true },
    aadhaar: { type: String, required: true, unique: true },
  },

  // Admission Details
  admissionDetails: {
    admissionClass: { type: String, required: true },
    academicYear: { type: String, required: true },
    preSchool: { type: String },
    reasonLeaving: { type: String },
  },

  // Father Details
  father: {
    name: { type: String, required: true },
    qualification: { type: String, required: true },
    occupation: { type: String, required: true },
    office: { type: String },
    contact: { type: String, required: true },
    email: { type: String },
    aadhaar: { type: String, required: true },
  },

  // Mother Details
  mother: {
    name: { type: String, required: true },
    qualification: { type: String, required: true },
    occupation: { type: String, required: true },
    office: { type: String },
    contact: { type: String, required: true },
    email: { type: String },
    aadhaar: { type: String, required: true },
  },

  // Guardian Details
  guardian: {
    name: { type: String },
    relationship: { type: String },
    contact: { type: String },
    address: { type: String },
  },

  // Address Details
  addressDetails: {
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    alternateContact: { type: String, required: true },
  },

  // Documents
  documents: {
    studentPhoto: { type: String, required: false }, // store file path/URL
  },

  // Declaration
  declaration: {
    agree: { type: Boolean, required: true, default: false },
    declarationDate: { type: Date, required: true },
  },

  // Status — managed by Admin
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },

  // Rejection reason (optional)
  rejectionReason: { type: String },

}, { timestamps: true }) // adds createdAt & updatedAt automatically

const Admission = mongoose.model('Admission', admissionSchema);
export default Admission;