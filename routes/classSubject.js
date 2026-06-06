import express from "express";
import {
    createClassSubject,
    getAllClassSubjects,
    getClassSubjectById,
    updateClassSubject,
    deleteClassSubject
} from "../controller/classSubject.js";

import {
    authenticateJWT,
    isAdmin
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
    "/",
    authenticateJWT,
    isAdmin,
    createClassSubject
);

router.get(
    "/",
    authenticateJWT,
    getAllClassSubjects
);

router.get(
    "/:id",
    authenticateJWT,
    getClassSubjectById
);

router.patch(
    "/:id",
    authenticateJWT,
    isAdmin,
    updateClassSubject
);

router.delete(
    "/:id",
    authenticateJWT,
    isAdmin,
    deleteClassSubject
);

export default router;