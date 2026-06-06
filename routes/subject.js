import express from "express";
import {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject,
    toggleSubjectStatus,
} from "../controller/subject.js";
import { authenticateJWT, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subjectName:
 *                 type: string
 *               subjectCode:
 *                 type: string
 *               subjectType:
 *                 type: string
 *                 enum: [Theory, Practical, Both]
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subject created successfully
 *       400:
 *         description: Validation error or duplicate code
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticateJWT, isAdmin, createSubject);

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     summary: Get all subjects
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Active, Inactive]
 *         description: Filter by status
 *       - in: query
 *         name: subjectType
 *         schema:
 *           type: string
 *           enum: [Theory, Practical, Both]
 *         description: Filter by subject type
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by subject name
 *     responses:
 *       200:
 *         description: Subjects fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticateJWT, getAllSubjects);

/**
 * @swagger
 * /api/subjects/{id}:
 *   get:
 *     summary: Get subject by ID
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subject fetched successfully
 *       404:
 *         description: Subject not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticateJWT, getSubjectById);

/**
 * @swagger
 * /api/subjects/{id}:
 *   patch:
 *     summary: Update subject by ID
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subjectName:
 *                 type: string
 *               subjectCode:
 *                 type: string
 *               subjectType:
 *                 type: string
 *                 enum: [Theory, Practical, Both]
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive]
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *       404:
 *         description: Subject not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", authenticateJWT, isAdmin, updateSubject);

/**
 * @swagger
 * /api/subjects/{id}:
 *   delete:
 *     summary: Delete subject by ID
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subject deleted successfully
 *       404:
 *         description: Subject not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticateJWT, isAdmin, deleteSubject);

/**
 * @swagger
 * /api/subjects/{id}/toggle-status:
 *   patch:
 *     summary: Toggle subject Active/Inactive status
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Status toggled successfully
 *       404:
 *         description: Subject not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:id/toggle-status", authenticateJWT, isAdmin, toggleSubjectStatus);

export default router;