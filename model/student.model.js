import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        studentId: {
            type: String,
            required: true,
            unique: true
        },

        rollNumber: {
            type: Number,
            required: true
        },

        admissionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admission",
            required: true
        },

        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: true
        },

        academicYear: {
            type: String,
            required: true
        },

        studentDetails: {
            firstName: {
                type: String,
                required: true
            },

            lastName: {
                type: String,
                required: true
            },

            gender: {
                type: String,
                enum: ["Male", "Female", "Other"],
                required: true
            },

            dob: {
                type: Date,
                required: true
            },

            bloodGroup: String,
            nationality: String,
            motherTongue: String,

            photo: String
        },

        parentDetails: {
            fatherName: {
                type: String,
                required: true
            },

            motherName: {
                type: String,
                required: true
            },

            fatherContact: {
                type: String,
                required: true
            },

            motherContact: {
                type: String,
                required: true
            },

            email: String
        },

        addressDetails: {
            presentAddress: String,
            permanentAddress: String
        },

        status: {
            type: String,
            enum: ["Active", "Inactive", "Transferred"],
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

// Prevent duplicate roll number in same class/year
studentSchema.index(
    {
        classId: 1,
        academicYear: 1,
        rollNumber: 1
    },
    {
        unique: true
    }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;