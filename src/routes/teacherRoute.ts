import { Router } from "express";
import { registerTeacher, loginTeacher } from "../controllers/teacherController";

const router = Router();

/**
 * @swagger
 * /api/teachers/register:
 *   post:
 *     summary: Register teacher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               classroomName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Teacher registered successfully
 *       400:
 *         description: Error registering teacher
 */
router.post('/register', registerTeacher);

/**
 * @swagger
 * /api/teachers/login:
 *   post:
 *     summary: Login a teacher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Teacher logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginTeacher);

export default router;
