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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentGradesService = exports.loginStudentService = exports.registerStudentService = void 0;
const studentModel_1 = __importDefault(require("../models/studentModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerStudentService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, email, password, classroomId }) {
    const existingStudent = yield studentModel_1.default.findOne({ email });
    if (existingStudent) {
        throw new Error("תלמיד כבר קיים עם האימייל הזה");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const student = new studentModel_1.default({ username, email, password: hashedPassword, classroom: classroomId });
    yield student.save();
    return student;
});
exports.registerStudentService = registerStudentService;
const loginStudentService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const student = yield studentModel_1.default.findOne({ email }).select("+password");
    if (!student || !(yield bcrypt_1.default.compare(password, student.password))) {
        throw new Error("שם משתמש או סיסמה שגויים");
    }
    return student;
});
exports.loginStudentService = loginStudentService;
const getStudentGradesService = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield studentModel_1.default.findById(studentId);
    if (!student) {
        throw new Error("תלמיד לא נמצא");
    }
    return student.grades;
});
exports.getStudentGradesService = getStudentGradesService;
