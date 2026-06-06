import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
        trim: true
    },
    subjectCode: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    subjectType: {
        type: String,
        required: true,
        enum: ['Theory', 'Practical', 'Both'],
        default: 'Theory'
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;