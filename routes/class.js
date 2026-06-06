import express from "express";
import {
    createClass,
    getAllClasses,
    getClassById,
    updateClass,
    deleteClass
} from "../controller/class.js";

import { authenticateJWT, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Create a new class
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - className
 *               - section
 *               - academicYear
 *               - capacity
 *             properties:
 *               className:
 *                 type: string
 *                 example: 5th
 *               section:
 *                 type: string
 *                 example: A
 *               academicYear:
 *                 type: string
 *                 example: 2025-26
 *               capacity:
 *                 type: number
 *                 example: 40
 *               classTeacher:
 *                 type: string
 *                 example: 6841ab2cd34ef56789012345
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive]
 *     responses:
 *       201:
 *         description: Class created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticateJWT, isAdmin, createClass);

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Classes fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticateJWT, getAllClasses);

/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     summary: Get class by ID
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class MongoDB ID
 *     responses:
 *       200:
 *         description: Class fetched successfully
 *       404:
 *         description: Class not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticateJWT, getClassById);

/**
 * @swagger
 * /api/classes/{id}:
 *   patch:
 *     summary: Update class by ID
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               className:
 *                 type: string
 *               section:
 *                 type: string
 *               academicYear:
 *                 type: string
 *               capacity:
 *                 type: number
 *               classTeacher:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive]
 *     responses:
 *       200:
 *         description: Class updated successfully
 *       404:
 *         description: Class not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", authenticateJWT, isAdmin, updateClass);

/**
 * @swagger
 * /api/classes/{id}:
 *   delete:
 *     summary: Delete class by ID
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class MongoDB ID
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *       404:
 *         description: Class not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticateJWT, isAdmin, deleteClass);

export default router;