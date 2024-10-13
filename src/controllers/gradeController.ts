import { Request, Response } from "express";
import { addGradeService } from "../services/gradeService";

export const addGrade = async (req: Request, res: Response) => {
  try {
    const { classroomId, studentId, grade, comment } = req.body;
    const teacherId = req.headers._id;

    const newGrade = await addGradeService({
      teacherId,
      classroomId,
      studentId,
      grade,
      comment,
    });

    res.status(201).json({ message: "הציון נוסף בהצלחה", newGrade });
  } catch (error) {
    console.error("Error adding grade:", error);
    res.status(400).json({ message: error });
  }
};
