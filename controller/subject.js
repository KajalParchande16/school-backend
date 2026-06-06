import Subject from "../model/subject.model.js";

// ✅ Create Subject
export const createSubject = async (req, res) => {
    try {
        const { subjectName, subjectCode, subjectType, description } = req.body;

        // Required field checks
        if (!subjectName)
            return res.status(400).json({ message: "Subject name is required" });

        if (!subjectCode)
            return res.status(400).json({ message: "Subject code is required" });

        if (!subjectType)
            return res.status(400).json({ message: "Subject type is required" });

        // Create subject
        const subject = new Subject({
            subjectName,
            subjectCode: subjectCode.toUpperCase(),
            subjectType,
            description,
        });

        await subject.save();

        res.status(201).json({
            success: true,
            message: "Subject created successfully",
            data: subject,
        });

    } catch (error) {
        // Duplicate subject code
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Subject code already exists",
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ✅ Get All Subjects
export const getAllSubjects = async (req, res) => {
    try {
        const filter = {};

        // Filter by status → /api/subjects?status=Active
        if (req.query.status) filter.status = req.query.status;

        // Filter by type → /api/subjects?subjectType=Practical
        if (req.query.subjectType) filter.subjectType = req.query.subjectType;

        // Search by name → /api/subjects?search=math
        if (req.query.search) {
            filter.subjectName = {
                $regex: req.query.search,
                $options: 'i' // case insensitive
            };
        }

        const subjects = await Subject.find(filter)
            .sort({ subjectName: 1 }) // A-Z
            .select("-__v");

        res.status(200).json({
            success: true,
            total: subjects.length,
            data: subjects,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ✅ Get Single Subject
export const getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id).select("-__v");

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Subject not found"
            });
        }

        res.status(200).json({
            success: true,
            data: subject
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ✅ Update Subject
export const updateSubject = async (req, res) => {
    try {
        const { subjectName, subjectCode, subjectType, description, status } = req.body;

        // If updating code — check duplicate
        if (subjectCode) {
            const existing = await Subject.findOne({
                subjectCode: subjectCode.toUpperCase(),
                _id: { $ne: req.params.id } // exclude current
            });
            if (existing) {
                return res.status(400).json({
                    message: "Subject code already exists"
                });
            }
        }

        const subject = await Subject.findByIdAndUpdate(
            req.params.id,
            {
                ...(subjectName && { subjectName }),
                ...(subjectCode && { subjectCode: subjectCode.toUpperCase() }),
                ...(subjectType && { subjectType }),
                ...(description && { description }),
                ...(status && { status }),
            },
            { new: true, runValidators: true }
        );

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Subject not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Subject updated successfully",
            data: subject,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ✅ Delete Subject
export const deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Subject not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Subject deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ✅ Toggle Status Active/Inactive
export const toggleSubjectStatus = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Subject not found"
            });
        }

        subject.status = subject.status === 'Active' ? 'Inactive' : 'Active';
        await subject.save();

        res.status(200).json({
            success: true,
            message: `Subject ${subject.status}`,
            data: subject,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};