import express from 'express';
import {createTeacher,getTeacher,updateTeacher,deleteTeacher} from '../controller/teacher.js';

const router=express.Router();

router.get('/',getTeacher);
router.post('/',createTeacher);
router.patch('/:id',updateTeacher);
router.delete('/:id',deleteTeacher);

export default router;