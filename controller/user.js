import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
export const createUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            role,
            permissions,
            isActive,
            profileImage,
        } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields required",
                success: false,
            });
        }

        // check duplicate user
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({
                message: "Email already exists",
                success: false,
            });
        }

        // 🔥 HASH PASSWORD (IMPORTANT)
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword, // ✅ store hashed password
            phone,
            role,
            permissions,
            isActive,
            profileImage,
        });

        await newUser.save();

        res.status(201).json({
            message: "User Created Successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.find().select("-password");

        res.status(200).json({
            message: "User fetched successfully",
            data: user,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        // const {
        //     name,
        //     email,
        //     phone,
        //     role,
        //     permissions,
        //     isActive,
        //     profileImage,
        // } = req.body;
        const updates = req.body;
        // 1. Array of fields that are mandatory and CANNOT be empty strings
        const requiredFields = ["name", "email", "role", "phone"];

        // 2. Check if any of these fields are present in req.body BUT are empty/blank
        for (const field of requiredFields) {
            if (updates[field] !== undefined && (updates[field] === null || updates[field].toString().trim() === "")) {
                return res.status(400).json({
                    message: `${field.charAt(0).toUpperCase() + field.slice(1)} cannot be empty. All fields are required!`,
                    success: false,
                });
            }
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates }, // 👈 $set tells MongoDB to ONLY update fields present in updates
            {
                new: true,
                runValidators: true // 👈 Validates data rules without resetting other fields
            },
            // { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            success: true,
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};
export const deleteUser = async (req, res) => {
    let id = req.params.id
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(400).json({
                message: "No data found",
                success: true
            })
        }
        res.status(200).json({
            message: "User deleted successfully",
            success: true
        })
    } catch (error) {
        res.status(200).json({
            message: error.message,
            success: false
        })
    }

}
