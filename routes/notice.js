import express from 'express';
import {getNotice,createNotice,deleteNotice,updateNotice} from '../controller/notice.js'

const router=express.Router();

router.post("/",createNotice)
router.get("/",getNotice);
router.put("/:id",updateNotice);
router.delete("/:id",deleteNotice);


export default router