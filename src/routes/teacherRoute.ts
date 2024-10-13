import { Router } from "express";
import { 
    registerTeacher, 
    loginTeacher, 
} from "../controllers/teacherController";

const router = Router();

router.post('/register', registerTeacher);
router.post('/login', loginTeacher);

export default router;
