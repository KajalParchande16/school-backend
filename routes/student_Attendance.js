import express from "express";

import {
    markAttendance,
    markBulkAttendance,
    getAllAttendance,
    getStudentAttendance,
    getMonthlyReport,
    deleteAttendance,
} from "../controller/student_Attendance.js";

import {
    authenticateJWT,
} from "../middleware/auth.middleware.js";

const router = express.Router();


// Mark Single Attendance
router.post(
    "/",
    authenticateJWT,
    markAttendance
);


// Mark Whole Class Attendance
router.post(
    "/bulk",
    authenticateJWT,
    markBulkAttendance
);


// Get Attendance
router.get(
    "/",
    authenticateJWT,
    getAllAttendance
);


// Student Attendance History
router.get(
    "/student/:studentId",
    authenticateJWT,
    getStudentAttendance
);


// Monthly Report
router.get(
    "/report/:studentId",
    authenticateJWT,
    getMonthlyReport
);


// Delete Attendance
router.delete(
    "/:id",
    authenticateJWT,
    deleteAttendance
);

export default router;