import Class from "../model/class.model.js";

export const createClass = async (req, res) => {
    try {
        const {
            className,
            section,
            academicYear,
            capacity,
            classTeacher
        } = req.body;

        const existingClass = await Class.findOne({
            className,
            section,
            academicYear
        });

        if (existingClass) {
            return res.status(400).json({
                success: false,
                message: "Class already exists"
            });
        }

        const newClass = await Class.create({
            className,
            section,
            academicYear,
            capacity,
            classTeacher
        });

        res.status(201).json({
            success: true,
            data: newClass
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find()
            .populate("classTeacher", "teacherName email");

        res.status(200).json({
            success: true,
            data: classes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getClassById = async (req, res) => {
    try {
        const cls = await Class.findById(req.params.id)
            .populate("classTeacher");

        if (!cls) {
            return res.status(404).json({
                success: false,
                message: "Class not found"
            });
        }

        res.status(200).json({
            success: true,
            data: cls
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateClass = async (req, res) => {
    try {
        const updated = await Class.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: updated
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteClass = async (req, res) => {
    try {
        await Class.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Class deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};