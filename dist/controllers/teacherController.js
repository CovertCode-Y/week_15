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
exports.loginTeacher = exports.registerTeacher = void 0;
const teacherService_1 = require("../services/teacherService");
const auth_1 = require("../utils/auth");
const registerTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, classroomName } = req.body;
        const teacher = yield (0, teacherService_1.registerTeacherService)({ username, email, password, classroomName });
        res.status(201).json({ message: "מורה נרשם בהצלחה" });
    }
    catch (error) {
        console.error("Error during teacher registration:", error);
        res.status(400).json({ message: error });
    }
});
exports.registerTeacher = registerTeacher;
const loginTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const teacher = yield (0, teacherService_1.loginTeacherService)({ email, password });
        const token = (0, auth_1.generateToken)(teacher._id.toString(), 'teacher');
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        });
        res.status(200).json({ message: "התחברת בהצלחה", token });
    }
    catch (error) {
        console.error("Error during teacher login:", error);
        res.status(401).json({ message: error });
    }
});
exports.loginTeacher = loginTeacher;
