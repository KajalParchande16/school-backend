import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: {
        type: String,
        default: "",
    },

    role: {
        type: String,
        enum: ["Admin", "Teacher", "Student", "Parent"],
        default: "Teacher",
        required: true
    },

    permissions: {
        type: [String],
        default: [],
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    profileImage: {
        type: String,
        default: "",
    },

}, { timestamps: true }
)

const User = mongoose.model("User", userSchema);
export default User;