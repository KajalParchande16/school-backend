import express from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controller/user.js';

const router = express.Router();

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User list fetched successfully
 */
router.get('/', getUser);

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create user record
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               subject:
 *                 type: string
 *               qualification:
 *                 type: string
 *               experience:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/', createUser);

/**
 * @swagger
 * /api/user/{id}:
 *   patch:
 *     summary: Update user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.patch('/:id', updateUser);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete('/:id', deleteUser);

export default router;
