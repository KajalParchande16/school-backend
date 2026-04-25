import express from 'express';
import {createContact,getContacts,deleteContact} from '../controller/contact.js'
import { authenticateJWT } from '../middleware/auth.middleware.js';
const router=express.Router();

router.post("/",createContact)
router.get("/",authenticateJWT,getContacts);
router.put("/",(req,res)=>{});
router.delete("/:id",deleteContact);


export default router;