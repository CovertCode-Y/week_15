"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherController_1 = require("../controllers/teacherController");
const router = (0, express_1.Router)();
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
router.post('/register', teacherController_1.registerTeacher);
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
router.post('/login', teacherController_1.loginTeacher);
exports.default = router;
