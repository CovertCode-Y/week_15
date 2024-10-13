import { Request, Response } from "express";
import { registerTeacherService, loginTeacherService } from '../services/teacherService';
import { generateToken } from '../utils/auth';

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
export const registerTeacher = async (req: Request, res: Response) => {
    try {
        const { username, email, password, classroomName } = req.body;
        const teacher = await registerTeacherService({ username, email, password, classroomName });
        const token = generateToken(teacher._id.toString(), 'teacher');
        res.status(201).json({ message: "מורה נרשם בהצלחה", token });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

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
export const loginTeacher = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const teacher = await loginTeacherService({ email, password });
        const token = generateToken(teacher._id.toString(), 'teacher');
        res.status(200).json({ message: "התחברת בהצלחה", token });
    } catch (error) {
        res.status(401).json({ message: error });
    }
};
