import express from 'express';
import {getEvent,createEvent,updateEvent,deleteEvent} from '../controller/event.js'

const router=express.Router();

router.post("/",createEvent)
router.get("/",getEvent);
router.put("/:id",updateEvent);
router.delete("/:id",deleteEvent);


export default router