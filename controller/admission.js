import Admission from "../model/admission.model.js";

// ✅ Submit Admission (Public)
export const submitAdmission = async (req, res) => {
  try {
    const {
      studentDetails,
      admissionDetails,
      father,
      mother,
      guardian,
      addressDetails,
      declaration,
    } = req.body;

    // Check required fields manually
    if (!studentDetails?.studentName)
      return res.status(400).json({ message: "Student name is required" });

    if (!studentDetails?.aadhaar)
      return res.status(400).json({ message: "Student Aadhaar is required" });

    if (!admissionDetails?.admissionClass)
      return res.status(400).json({ message: "Admission class is required" });

    if (!admissionDetails?.academicYear)
      return res.status(400).json({ message: "Academic year is required" });

    if (!father?.name)
      return res.status(400).json({ message: "Father name is required" });

    if (!father?.contact)
      return res.status(400).json({ message: "Father contact is required" });

    if (!mother?.name)
      return res.status(400).json({ message: "Mother name is required" });

    if (!mother?.contact)
      return res.status(400).json({ message: "Mother contact is required" });

    if (!addressDetails?.presentAddress)
      return res.status(400).json({ message: "Present address is required" });

    if (!addressDetails?.emergencyContact)
      return res.status(400).json({ message: "Emergency contact is required" });

    if (!declaration?.agree)
      return res.status(400).json({ message: "Declaration must be agreed" });

    if (!declaration?.declarationDate)
      return res.status(400).json({ message: "Declaration date is required" });

    // Create admission
    const admission = new Admission({
      studentDetails,
      admissionDetails,
      father,
      mother,
      guardian,
      addressDetails,
      documents: { studentPhoto: null }, // skipped for now
      declaration,
      status: "Pending",
    });

    await admission.save();

    res.status(201).json({
      success: true,
      message: "Admission submitted successfully",
      data: admission,
    });

  } catch (error) {
    // Duplicate Aadhaar error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Student with this Aadhaar number already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Get All Admissions (Admin only)
export const getAllAdmissions = async (req, res) => {
  console.log("user", req.user);
  try {
    const filter = {};

    // Filter by status if provided → /api/admissions?status=Pending
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Filter by academic year → /api/admissions?academicYear=2025-26
    if (req.query.academicYear) {
      filter["admissionDetails.academicYear"] = req.query.academicYear;
    }

    // Filter by class → /api/admissions?admissionClass=5th
    if (req.query.admissionClass) {
      filter["admissionDetails.admissionClass"] = req.query.admissionClass;
    }

    const admissions = await Admission.find(filter)
      .sort({ createdAt: -1 }) // newest first
      .select("-__v");

    res.status(200).json({
      success: true,
      total: admissions.length,
      data: admissions,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Get Single Admission (Admin only)
export const getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id).select("-__v");

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found"
      });
    }

    res.status(200).json({
      success: true,
      data: admission
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Update Admission Status - Approve/Reject (Admin only)
// export const updateAdmissionStatus = async (req, res) => {
//   try {
//     const { status, rejectionReason } = req.body;

//     // Validate status value
//     const allowedStatus = ["Pending", "Approved", "Rejected"];
//     if (!allowedStatus.includes(status)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Invalid status value" 
//       });
//     }

//     // If rejecting — reason is required
//     if (status === "Rejected" && !rejectionReason) {
//       return res.status(400).json({
//         success: false,
//         message: "Rejection reason is required",
//       });
//     }

//     const admission = await Admission.findByIdAndUpdate(
//       req.params.id,
//       { 
//         status, 
//         rejectionReason: status === "Rejected" ? rejectionReason : null 
//       },
//       { new: true }
//     );

//     if (!admission) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Admission not found" 
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: `Admission ${status} successfully`,
//       data: admission,
//     });

//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: error.message 
//     });
//   }
// };


export const updateAdmissionStatus = async (req, res) => {
  try {
    const { status, rejectionReason, classId, rollNumber } = req.body;

    const allowedStatus = ["Pending", "Approved", "Rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    if (status === "Rejected" && !rejectionReason) {
      return res.status(400).json({ message: "Rejection reason required" });
    }

    // Find admission
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { status, rejectionReason: status === "Rejected" ? rejectionReason : null },
      { new: true }
    );

    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    // ✅ Auto create student when Approved
    if (status === "Approved") {

      // Check if student already exists
      const existing = await Student.findOne({ admissionId: admission._id });

      if (!existing) {

        // Validate classId & rollNumber sent
        if (!classId || !rollNumber) {
          return res.status(400).json({
            success: false,
            message: "classId and rollNumber required to approve admission"
          });
        }

        // Generate studentId
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
        const studentId = `STU-${year}-${String(nextNumber).padStart(4, "0")}`;

        // Create student from admission data
        await Student.create({
          studentId,
          rollNumber,
          admissionId: admission._id,
          classId,
          academicYear: admission.admissionDetails.academicYear,
          studentDetails: {
            firstName: admission.studentDetails.studentName.split(" ")[0],
            lastName: admission.studentDetails.studentName.split(" ")[1] || "",
            gender: admission.studentDetails.gender,
            dob: admission.studentDetails.dob,
            bloodGroup: admission.studentDetails.bloodGroup,
            nationality: admission.studentDetails.nationality,
            motherTongue: admission.studentDetails.motherTongue,
          },
          parentDetails: {
            fatherName: admission.father.name,
            motherName: admission.mother.name,
            fatherContact: admission.father.contact,
            motherContact: admission.mother.contact,
            email: admission.father.email,
          },
          addressDetails: {
            presentAddress: admission.addressDetails.presentAddress,
            permanentAddress: admission.addressDetails.permanentAddress,
          },
          status: "Active"
        });
      }
    }

    res.status(200).json({
      success: true,
      message: `Admission ${status} successfully${status === "Approved" ? " & Student created" : ""}`,
      data: admission
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// ✅ Delete Admission (Admin only)
export const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndDelete(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Admission deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};