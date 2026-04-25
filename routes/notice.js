import express from 'express';
import {
    getNotice,
    createNotice,
    deleteNotice,
    updateNotice
} from '../controller/notice.js';

const router = express.Router();

/**
 * @swagger
 * /api/notice:
 *   post:
 *     summary: Create a new notice
 *     tags: [Notice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Notice created successfully
 */
router.post("/", createNotice);

/**
 * @swagger
 * /api/notice:
 *   get:
 *     summary: Get all notices
 *     tags: [Notice]
 *     responses:
 *       200:
 *         description: List of notices
 */
router.get("/", getNotice);

/**
 * @swagger
 * /api/notice/{id}:
 *   put:
 *     summary: Update notice by ID
 *     tags: [Notice]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notice updated successfully
 */
router.put("/:id", updateNotice);

/**
 * @swagger
 * /api/notice/{id}:
 *   delete:
 *     summary: Delete notice by ID
 *     tags: [Notice]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notice deleted successfully
 */
router.delete("/:id", deleteNotice);

export default router;