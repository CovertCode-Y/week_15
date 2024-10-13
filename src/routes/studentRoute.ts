import { Router } from "express";
import {
  registerStudent,
  loginStudent,
  getStudentGrades,
} from "../controllers/studentController";

const router = Router();

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
router.post("/register", registerStudent);

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
router.post("/login", loginStudent);

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
router.get("/:studentId/grades", getStudentGrades);

export default router;
