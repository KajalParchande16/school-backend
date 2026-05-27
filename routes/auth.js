import express from 'express';
import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/signUP", async (req, res) => {
  try {
    const { name, email, password, phone, role, permissions, profileImage } = req.body;
    if (!name || !email || !password || !role) {
      res.status(400).json({
        message: "All Fields Required",
        success: false
      })
    }
    const isUserExist = await User.findOne({ email });
    if (!!isUserExist) {
      res.status(400).json({
        message: "Email already exist",
        success: false
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone, role, permissions, profileImage });
    await user.save();
    res.status(200).json({
      message: "User Created Successfully",
      data: user,
      success: true
    })


  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    })
  }

})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields required",
        success: false
      });
    }

    // 2️⃣ Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false
      });
    }

    // 3️⃣ Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false
      });
    }

    // 4️⃣ Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 5️⃣ Success response
    // remove password
    const userData = user.toObject();
    delete userData.password;
    res.status(200).json({
      message: "User logged in successfully",
      token,
      data: userData,
      success: true
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
});



export default router;