// import express from 'express';
// import {createContact,getContacts,deleteContact} from '../controller/contact.js'
// import { authenticateJWT } from '../middleware/auth.middleware.js';
// const router=express.Router();

// router.post("/",createContact)
// router.get("/",authenticateJWT,getContacts);
// router.put("/",(req,res)=>{});
// router.delete("/:id",deleteContact);


// export default router;
import express from 'express';
import {
    createContact,
    getContacts,
    deleteContact
} from '../controller/contact.js';

import { authenticateJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit contact form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 */
router.post("/", createContact);

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Get all contact messages (Protected)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contact list fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateJWT, getContacts);

/**
 * @swagger
 * /api/contact:
 *   put:
 *     summary: Update contact (Not implemented)
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: Update contact
 */
router.put("/", (req, res) => { });

/**
 * @swagger
 * /api/contact/{id}:
 *   delete:
 *     summary: Delete contact by ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 */
router.delete("/:id", deleteContact);

export default router;