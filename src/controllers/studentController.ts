import { Request, Response } from "express";
import {
  registerStudentService,
  loginStudentService,
  getStudentGradesService,
} from "../services/studentService";
import { generateToken } from "../utils/auth";

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { username, email, password, classroomId } = req.body;

    const student = await registerStudentService({
      username,
      email,
      password,
      classroomId,
    });

    res.status(201).json({ message: "נרשמת בהצלחה", student });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const loginStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const student = await loginStudentService({ email, password });

    const token = generateToken(student._id.toString(), "student");
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "strict",
    });

    res.status(200).json({ message: "התחברת בהצלחה", token });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

export const getStudentGrades = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const grades = await getStudentGradesService(studentId);
    res.status(200).json({ grades });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
