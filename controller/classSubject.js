import ClassSubject from "../model/classSubject.model.js";

export const createClassSubject = async (req, res) => {
    try {
        const {
            classId,
            subjectId,
            teacherId,
            academicYear
        } = req.body;

        const exists = await ClassSubject.findOne({
            classId,
            subjectId,
            academicYear
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Subject already mapped to this class"
            });
        }

        const mapping = await ClassSubject.create({
            classId,
            subjectId,
            teacherId,
            academicYear
        });

        res.status(201).json({
            success: true,
            message: "Class Subject assigned successfully",
            data: mapping
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllClassSubjects = async (req, res) => {
    try {
        const filter = {};

        // ✅ Filter by classId query param
        if (req.query.classId) filter.classId = req.query.classId;
        if (req.query.subjectId) filter.subjectId = req.query.subjectId;
        if (req.query.teacherId) filter.teacherId = req.query.teacherId;
        if (req.query.academicYear) filter.academicYear = req.query.academicYear;

        const mappings = await ClassSubject.find(filter)
            .populate("classId")
            .populate("subjectId")
            .populate("teacherId");

        res.status(200).json({
            success: true,
            total: mappings.length,
            data: mappings
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getClassSubjectById = async (req, res) => {
    try {
        const mapping = await ClassSubject.findById(req.params.id)
            .populate("classId")
            .populate("subjectId")
            .populate("teacherId");

        if (!mapping) {
            return res.status(404).json({
                success: false,
                message: "Mapping not found"
            });
        }

        res.status(200).json({
            success: true,
            data: mapping
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateClassSubject = async (req, res) => {
    try {

        const mapping = await ClassSubject.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!mapping) {
            return res.status(404).json({
                success: false,
                message: "Mapping not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Updated successfully",
            data: mapping
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteClassSubject = async (req, res) => {
    try {

        const mapping = await ClassSubject.findByIdAndDelete(
            req.params.id
        );

        if (!mapping) {
            return res.status(404).json({
                success: false,
                message: "Mapping not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};