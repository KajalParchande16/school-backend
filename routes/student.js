import express from "express";

import {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} from "../controller/student.js";

import {
    authenticateJWT,
    isAdmin
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
    "/",
    authenticateJWT,
    isAdmin,
    createStudent
);

router.get(
    "/",
    authenticateJWT,
    getAllStudents
);

router.get(
    "/:id",
    authenticateJWT,
    getStudentById
);

router.patch(
    "/:id",
    authenticateJWT,
    isAdmin,
    updateStudent
);

router.delete(
    "/:id",
    authenticateJWT,
    isAdmin,
    deleteStudent
);

export default router;