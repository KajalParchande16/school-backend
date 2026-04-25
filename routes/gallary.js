import express from 'express';
import {getGallary,createGallary,updateGallary,deleteGallary,createBulkGallary} from '../controller/gallary.js'

const router=express.Router();

router.post("/",createGallary);
router.post("/bulk-create", createBulkGallary)
router.get("/",getGallary);
router.put("/:id",updateGallary);
router.delete("/:id",deleteGallary);



export default router