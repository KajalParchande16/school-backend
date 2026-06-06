import Attendance from "../model/student_Attendance.model.js";


// Create Attendance
export const markAttendance = async (req, res) => {
    try {

        const attendance = await Attendance.create({
            ...req.body,
            markedBy: req.user?.id
        });

        res.status(201).json({
            success: true,
            message: "Attendance marked successfully",
            data: attendance,
        });

    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message:
                    "Attendance already marked for this student today",
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Bulk Attendance
export const markBulkAttendance = async (req, res) => {
    try {

        const records = req.body.map(item => ({
            ...item,
            markedBy: req.user?.id,
        }));

        const result = await Attendance.insertMany(
            records,
            {
                ordered: false,
            }
        );

        res.status(201).json({
            success: true,
            message: "Attendance saved successfully",
            count: result.length,
            data: result,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Get All Attendance
export const getAllAttendance = async (req, res) => {
    try {

        const filter = {};

        if (req.query.classId) {
            filter.classId = req.query.classId;
        }

        if (req.query.date) {
            filter.date = new Date(req.query.date);
        }

        const attendance = await Attendance.find(filter)
            .populate("studentId")
            .populate("classId")
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            total: attendance.length,
            data: attendance,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Student Attendance Report
export const getStudentAttendance = async (
    req,
    res
) => {
    try {

        const attendance = await Attendance.find({
            studentId: req.params.studentId,
        }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            total: attendance.length,
            data: attendance,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Monthly Attendance Summary
export const getMonthlyReport = async (
    req,
    res
) => {
    try {

        const { studentId } = req.params;
        const { month, year } = req.query;

        const startDate = new Date(
            year,
            month - 1,
            1
        );

        const endDate = new Date(
            year,
            month,
            0
        );

        const records = await Attendance.find({
            studentId,
            date: {
                $gte: startDate,
                $lte: endDate,
            },
        });

        const present = records.filter(
            x => x.status === "Present"
        ).length;

        const absent = records.filter(
            x => x.status === "Absent"
        ).length;

        const late = records.filter(
            x => x.status === "Late"
        ).length;

        const total = records.length;

        const percentage =
            total === 0
                ? 0
                : ((present + late) / total) * 100;

        res.status(200).json({
            success: true,
            present,
            absent,
            late,
            total,
            percentage: Number(
                percentage.toFixed(2)
            ),
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Delete Attendance
export const deleteAttendance = async (
    req,
    res
) => {
    try {

        const attendance =
            await Attendance.findByIdAndDelete(
                req.params.id
            );

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance not found",
            });
        }

        res.status(200).json({
            success: true,
            message:
                "Attendance deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};