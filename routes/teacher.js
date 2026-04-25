// import express from 'express';
// import {createTeacher,getTeacher,updateTeacher,deleteTeacher} from '../controller/teacher.js';

// const router=express.Router();

// router.get('/',getTeacher);
// router.post('/',createTeacher);
// router.patch('/:id',updateTeacher);
// router.delete('/:id',deleteTeacher);

// export default router;

import express from 'express';
import {
    createTeacher,
    getTeacher,
    updateTeacher,
    deleteTeacher
} from '../controller/teacher.js';

const router = express.Router();

/**
 * @swagger
 * /api/teacher:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: Teacher list fetched successfully
 */
router.get('/', getTeacher);

/**
 * @swagger
 * /api/teacher:
 *   post:
 *     summary: Create teacher record
 *     tags: [Teacher]
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
 *         description: Teacher created successfully
 */
router.post('/', createTeacher);

/**
 * @swagger
 * /api/teacher/{id}:
 *   patch:
 *     summary: Update teacher by ID
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 */
router.patch('/:id', updateTeacher);

/**
 * @swagger
 * /api/teacher/{id}:
 *   delete:
 *     summary: Delete teacher by ID
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 */
router.delete('/:id', deleteTeacher);

export default router;