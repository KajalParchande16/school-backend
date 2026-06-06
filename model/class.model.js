import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
    {
        className: {
            type: String,
            required: true,
            trim: true
        },

        section: {
            type: String,
            required: true,
            enum: ["A", "B", "C", "D", "E"]
        },

        academicYear: {
            type: String,
            required: true
        },

        capacity: {
            type: Number,
            required: true,
            min: 1
        },

        classTeacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            default: null
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

const Class = mongoose.model("Class", classSchema);

export default Class;