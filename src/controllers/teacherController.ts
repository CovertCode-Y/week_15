import { Request, Response } from "express";
import {
  registerTeacherService,
  loginTeacherService,
} from "../services/teacherService";
import { generateToken } from "../utils/auth";
export const registerTeacher = async (req: Request, res: Response) => {
  try {
    const { username, email, password, classroomName } = req.body;

    const teacher = await registerTeacherService({
      username,
      email,
      password,
      classroomName,
    });

    res.status(201).json({ message: "מורה נרשם בהצלחה" });
  } catch (error) {
    console.error("Error during teacher registration:", error);
    res.status(400).json({ message: error });
  }
};

export const loginTeacher = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const teacher = await loginTeacherService({ email, password });

    const token = generateToken(teacher._id.toString(), "teacher");
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    res.status(200).json({ message: "התחברת בהצלחה", token });
  } catch (error) {
    console.error("Error during teacher login:", error);
    res.status(401).json({ message: error });
  }
};
