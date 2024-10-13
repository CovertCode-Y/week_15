"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTeacher = void 0;
const teacherService_1 = require("../services/teacherService");
// הרשמה למורה חדש
/**
 * @swagger
 * /api/teachers/register:
 *   post:
 *     summary: רישום מורה חדש
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - classroomName
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
 *         description: מורה נרשם בהצלחה
 *       404:
 *         description: כיתה לא נמצאה
 *       500:
 *         description: שגיאה ברישום המורה
 */
const registerTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield (0, teacherService_1.registerTeacherService)(req.body);
        if (!teacher) {
            return res.status(404).json({ message: "כיתה לא נמצאה" });
        }
        return res.status(201).json({ message: "מורה נרשם בהצלחה", teacher }); // החזרת ערך במצב הצלחה
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: "שגיאה ברישום המורה", error: error.message });
        }
        return res.status(500).json({ message: "שגיאה ברישום המורה", error: "שגיאה לא ידועה" });
    }
});
exports.registerTeacher = registerTeacher;
