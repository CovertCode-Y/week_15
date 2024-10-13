import { Request, Response } from "express";
import { registerStudentService, loginStudentService, getStudentGradesService } from '../services/studentService';
import { generateToken } from '../utils/auth';

/**
 * @swagger
 * /api/students/register:
 *   post:
 *     summary: Register student
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
 *               classroomId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student registered successfully
 *       400:
 *         description: Error registering student
 */
export const registerStudent = async (req: Request, res: Response) => {
    try {
        const { username, email, password, classroomId } = req.body;
        const student = await registerStudentService({ username, email, password, classroomId });
        const token = generateToken(student._id.toString(), 'student');
        res.status(201).json({ message: "נרשמת בהצלחה", token });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

/**
 * @swagger
 * /api/students/login:
 *   post:
 *     summary: Login student
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
 *         description: Student logged in successfully
 *       401:
 *         description: Invalid credentials
 */
export const loginStudent = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const student = await loginStudentService({ email, password });
        const token = generateToken(student._id.toString(), 'student');
        res.status(200).json({ message: "התחברת בהצלחה", token });
    } catch (error) {
        res.status(401).json({ message: error });
    }
};

/**
 * @swagger
 * /api/students/{studentId}/grades:
 *   get:
 *     summary: Get grades of a student
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: ID of the student
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grades retrieved successfully
 *       404:
 *         description: Student not found
 */
export const getStudentGrades = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const grades = await getStudentGradesService(studentId);
        res.status(200).json({ grades });
    } catch (error) {
        res.status(404).json({ message: error });
    }
};
