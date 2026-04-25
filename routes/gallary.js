// import express from 'express';
// import {getGallary,createGallary,updateGallary,deleteGallary,createBulkGallary} from '../controller/gallary.js'

// const router=express.Router();

// router.post("/",createGallary);
// router.post("/bulk-create", createBulkGallary)
// router.get("/",getGallary);
// router.put("/:id",updateGallary);
// router.delete("/:id",deleteGallary);



// export default router
import express from 'express';
import {
    getGallary,
    createGallary,
    updateGallary,
    deleteGallary,
    createBulkGallary
} from '../controller/gallary.js';

const router = express.Router();

/**
 * @swagger
 * /api/gallary:
 *   post:
 *     summary: Create gallery record
 *     tags: [Gallery]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               imgUrl:
 *                 type: string
 *                 description: Comma separated image URLs
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Gallery created successfully
 */
router.post("/", createGallary);

/**
 * @swagger
 * /api/gallary/bulk-create:
 *   post:
 *     summary: Bulk create gallery records
 *     tags: [Gallery]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 imgUrl:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *     responses:
 *       201:
 *         description: Bulk gallery created successfully
 */
router.post("/bulk-create", createBulkGallary);

/**
 * @swagger
 * /api/gallary:
 *   get:
 *     summary: Get all gallery records
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: Gallery list fetched successfully
 */
router.get("/", getGallary);

/**
 * @swagger
 * /api/gallary/{id}:
 *   put:
 *     summary: Update gallery by ID
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gallery updated successfully
 */
router.put("/:id", updateGallary);

/**
 * @swagger
 * /api/gallary/{id}:
 *   delete:
 *     summary: Delete gallery by ID
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gallery deleted successfully
 */
router.delete("/:id", deleteGallary);

export default router;