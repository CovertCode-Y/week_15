import { Router } from "express";
import { registerStudent, loginStudent, getStudentGrades } from "../controllers/studentController";

const router = Router();

router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.get('/:studentId/grades', getStudentGrades); 

export default router;
