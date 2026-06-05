import express from "express";
import {
  submitAdmission,
  getAllAdmissions,
  getAdmissionById,
  updateAdmissionStatus,
  deleteAdmission,
} from "../controller/admission.js";
import { authenticateJWT, isAdmin } from "../middleware/auth.middleware.js";
import Admission from "../model/admission.model.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Admission route working");
});
/**
 * @swagger
 * /api/admissions:
 *   post:
 *     summary: Submit admission form
 *     tags: [Admission]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentDetails:
 *                 type: object
 *                 properties:
 *                   studentName:
 *                     type: string
 *                   dob:
 *                     type: string
 *                     format: date
 *                   gender:
 *                     type: string
 *                     enum: [Male, Female, Other]
 *                   age:
 *                     type: number
 *                   bloodGroup:
 *                     type: string
 *                   religion:
 *                     type: string
 *                   castCategory:
 *                     type: string
 *                   nationality:
 *                     type: string
 *                   motherTongue:
 *                     type: string
 *                   aadhaar:
 *                     type: string
 *               admissionDetails:
 *                 type: object
 *                 properties:
 *                   admissionClass:
 *                     type: string
 *                   academicYear:
 *                     type: string
 *                   preSchool:
 *                     type: string
 *                   reasonLeaving:
 *                     type: string
 *               father:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   qualification:
 *                     type: string
 *                   occupation:
 *                     type: string
 *                   office:
 *                     type: string
 *                   contact:
 *                     type: string
 *                   email:
 *                     type: string
 *                   aadhaar:
 *                     type: string
 *               mother:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   qualification:
 *                     type: string
 *                   occupation:
 *                     type: string
 *                   office:
 *                     type: string
 *                   contact:
 *                     type: string
 *                   email:
 *                     type: string
 *                   aadhaar:
 *                     type: string
 *               guardian:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   relationship:
 *                     type: string
 *                   contact:
 *                     type: string
 *                   address:
 *                     type: string
 *               addressDetails:
 *                 type: object
 *                 properties:
 *                   presentAddress:
 *                     type: string
 *                   permanentAddress:
 *                     type: string
 *                   emergencyContact:
 *                     type: string
 *                   alternateContact:
 *                     type: string
 *               declaration:
 *                 type: object
 *                 properties:
 *                   agree:
 *                     type: boolean
 *                   declarationDate:
 *                     type: string
 *                     format: date
 *     responses:
 *       201:
 *         description: Admission submitted successfully
 *       400:
 *         description: Validation error or duplicate Aadhaar
 *       500:
 *         description: Internal server error
 */
router.post("/", submitAdmission);

/**
 * @swagger
 * /api/admissions:
 *   get:
 *     summary: Get all admissions
 *     tags: [Admission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Pending, Approved, Rejected]
 *         description: Filter by admission status
 *       - in: query
 *         name: academicYear
 *         schema:
 *           type: string
 *         description: Filter by academic year e.g. 2025-26
 *       - in: query
 *         name: admissionClass
 *         schema:
 *           type: string
 *         description: Filter by class e.g. 5th
 *     responses:
 *       200:
 *         description: Admissions fetched successfully
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - admin access required
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticateJWT, isAdmin, getAllAdmissions);
// router.get("/", authenticateJWT, getAllAdmissions);

/**
 * @swagger
 * /api/admissions/{id}:
 *   get:
 *     summary: Get single admission by ID
 *     tags: [Admission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admission MongoDB ID
 *     responses:
 *       200:
 *         description: Admission fetched successfully
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - admin access required
 *       404:
 *         description: Admission not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticateJWT, isAdmin, getAdmissionById);
// router.get("/:id", authenticateJWT, getAdmissionById);

/**
 * @swagger
 * /api/admissions/{id}/status:
 *   patch:
 *     summary: Update admission status - Approve or Reject
 *     tags: [Admission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admission MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Approved, Rejected]
 *               rejectionReason:
 *                 type: string
 *                 description: Required only when status is Rejected
 *     responses:
 *       200:
 *         description: Admission status updated successfully
 *       400:
 *         description: Invalid status or missing rejection reason
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - admin access required
 *       404:
 *         description: Admission not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:id/status", authenticateJWT, isAdmin, updateAdmissionStatus);
// router.patch("/:id/status", authenticateJWT, updateAdmissionStatus);

/**
 * @swagger
 * /api/admissions/{id}:
 *   delete:
 *     summary: Delete admission by ID
 *     tags: [Admission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admission MongoDB ID
 *     responses:
 *       200:
 *         description: Admission deleted successfully
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - admin access required
 *       404:
 *         description: Admission not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticateJWT, isAdmin, deleteAdmission);
//  router.delete("/:id", authenticateJWT, deleteAdmission);

router.post("/seed", async (req, res) => {
  await Admission.insertMany(req.body);
  res.json({ message: "20 admissions added!" });
});
export default router;