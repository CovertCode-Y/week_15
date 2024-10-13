import Grade from "../models/gradeModel";
import Classroom from "../models/classroomModel";
import Student from "../models/studentModel";

export const addGradeService = async ({
  teacherId,
  classroomId,
  studentId,
  grade,
  comment,
}: any) => {
  const classroom = await Classroom.findById(classroomId);

  if (!classroom || classroom.teacher.toString() !== teacherId) {
    throw new Error("רק המורה של הכיתה יכול להוסיף ציונים לכיתה זו");
  }

  const student = await Student.findById(studentId);
  if (!student || student.classroom.toString() !== classroomId) {
    throw new Error("התלמיד אינו נמצא בכיתה זו");
  }

  const newGrade = new Grade({
    student: student._id,
    classroom: classroom._id,
    grade,
    comment,
  });

  await newGrade.save();
  return newGrade;
};
