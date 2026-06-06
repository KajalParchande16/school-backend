import mongoose from "mongoose";

const classSubjectSchema = new mongoose.Schema(
    {
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: true
        },

        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true
        },

        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: false
        },

        academicYear: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Prevent duplicate mapping
classSubjectSchema.index(
    {
        classId: 1,
        subjectId: 1,
        academicYear: 1
    },
    {
        unique: true
    }
);

const ClassSubject = mongoose.model(
    "ClassSubject",
    classSubjectSchema
);

export default ClassSubject;