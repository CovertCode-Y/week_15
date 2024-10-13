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
exports.loginTeacherService = exports.registerTeacherService = void 0;
const teatcherModel_1 = __importDefault(require("../models/teatcherModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const classroomModel_1 = __importDefault(require("../models/classroomModel"));
const registerTeacherService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, email, password, classroomName }) {
    const existingTeacher = yield teatcherModel_1.default.findOne({ email });
    if (existingTeacher) {
        throw new Error("מורה כבר קיים עם האימייל הזה");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const teacher = new teatcherModel_1.default({ username, email, password: hashedPassword });
    const classroom = new classroomModel_1.default({ name: classroomName, teacher: teacher._id });
    yield classroom.save();
    teacher.classroom = classroom._id;
    yield teacher.save();
    return teacher;
});
exports.registerTeacherService = registerTeacherService;
const loginTeacherService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const teacher = yield teatcherModel_1.default.findOne({ email }).select("+password");
    if (!teacher || !(yield bcrypt_1.default.compare(password, teacher.password))) {
        throw new Error("שם משתמש או סיסמה שגויים");
    }
    return teacher;
});
exports.loginTeacherService = loginTeacherService;
