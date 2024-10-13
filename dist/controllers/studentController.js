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
exports.getStudentGrades = exports.loginStudent = exports.registerStudent = void 0;
const studentService_1 = require("../services/studentService");
const auth_1 = require("../utils/auth");
const registerStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, classroomId } = req.body;
        const student = yield (0, studentService_1.registerStudentService)({ username, email, password, classroomId });
        res.status(201).json({ message: "נרשמת בהצלחה", student });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.registerStudent = registerStudent;
const loginStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const student = yield (0, studentService_1.loginStudentService)({ email, password });
        const token = (0, auth_1.generateToken)(student._id.toString(), 'student');
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'strict'
        });
        res.status(200).json({ message: "התחברת בהצלחה", token });
    }
    catch (error) {
        res.status(401).json({ message: error });
    }
});
exports.loginStudent = loginStudent;
const getStudentGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const grades = yield (0, studentService_1.getStudentGradesService)(studentId);
        res.status(200).json({ grades });
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
});
exports.getStudentGrades = getStudentGrades;
