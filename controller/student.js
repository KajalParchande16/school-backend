import Student from "../model/student.model.js";

// ✅ Fixed ID generator
const generateStudentId = async () => {
    const year = new Date().getFullYear();

    const lastStudent = await Student.findOne()
        .sort({ createdAt: -1 })
        .select("studentId");

    let nextNumber = 1;
    if (lastStudent?.studentId) {
        const parts = lastStudent.studentId.split("-");
        const lastNumber = parseInt(parts[2]);
        if (!isNaN(lastNumber)) nextNumber = lastNumber + 1;
    }

    return `STU-${year}-${String(nextNumber).padStart(4, "0")}`;
};

// ✅ Create Student
export const createStudent = async (req, res) => {
    try {
        const studentId = await generateStudentId();

        const student = await Student.create({
            ...req.body,
            studentId
        });

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: student
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Roll number already exists in this class for this academic year"
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ✅ Get All Students
export const getAllStudents = async (req, res) => {
    try {
        const filter = {};

        if (req.query.classId) filter.classId = req.query.classId;
        if (req.query.status) filter.status = req.query.status;
        if (req.query.academicYear) filter.academicYear = req.query.academicYear; // ✅ added

        const students = await Student.find(filter)
            .populate("classId")
            .populate("admissionId")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: students.length,
            data: students
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ✅ Get Single Student
export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
            .populate("classId")
            .populate("admissionId");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ✅ Update Student — studentId & admissionId protected
export const updateStudent = async (req, res) => {
    try {
        const { studentId, admissionId, ...updateData } = req.body; // ✅ exclude

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ✅ Delete Student
export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};