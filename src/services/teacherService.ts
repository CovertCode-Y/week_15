import Teacher from "../models/teatcherModel";
import bcrypt from "bcrypt";
import Classroom from "../models/classroomModel";

export const registerTeacherService = async ({
  username,
  email,
  password,
  classroomName,
}: any) => {
  const existingTeacher = await Teacher.findOne({ email });
  if (existingTeacher) {
    throw new Error("מורה כבר קיים עם האימייל הזה");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const teacher = new Teacher({ username, email, password: hashedPassword });

  const classroom = new Classroom({
    name: classroomName,
    teacher: teacher._id,
  });
  await classroom.save();

  teacher.classroom = classroom._id;
  await teacher.save();

  return teacher;
};

export const loginTeacherService = async ({ email, password }: any) => {
  const teacher = await Teacher.findOne({ email }).select("+password");
  if (!teacher || !(await bcrypt.compare(password, teacher.password))) {
    throw new Error("שם משתמש או סיסמה שגויים");
  }
  return teacher;
};
