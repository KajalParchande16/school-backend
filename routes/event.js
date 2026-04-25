// import express from 'express';
// import {getEvent,createEvent,updateEvent,deleteEvent} from '../controller/event.js'

// const router=express.Router();

// router.post("/",createEvent)
// router.get("/",getEvent);
// router.put("/:id",updateEvent);
// router.delete("/:id",deleteEvent);


// export default router
import express from 'express';
import {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} from '../controller/event.js';

const router = express.Router();

/**
 * @swagger
 * /api/event:
 *   post:
 *     summary: Create a new event
 *     tags: [Event]
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
 *               imgUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created successfully
 */
router.post("/", createEvent);

/**
 * @swagger
 * /api/event:
 *   get:
 *     summary: Get all events
 *     tags: [Event]
 *     responses:
 *       200:
 *         description: Event list fetched successfully
 */
router.get("/", getEvent);

/**
 * @swagger
 * /api/event/{id}:
 *   put:
 *     summary: Update event by ID
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 */
router.put("/:id", updateEvent);

/**
 * @swagger
 * /api/event/{id}:
 *   delete:
 *     summary: Delete event by ID
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 */
router.delete("/:id", deleteEvent);

export default router;