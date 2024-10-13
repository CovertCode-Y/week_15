import Student from '../models/studentModel';
import bcrypt from 'bcrypt';

export const registerStudentService = async ({ username, email, password, classroomId }: any) => {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
        throw new Error("תלמיד כבר קיים עם האימייל הזה");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ username, email, password: hashedPassword, classroom: classroomId });
    await student.save();
    return student;
};

export const loginStudentService = async ({ email, password }: any) => {
    const student = await Student.findOne({ email }).select("+password");
    if (!student || !(await bcrypt.compare(password, student.password))) {
        throw new Error("שם משתמש או סיסמה שגויים");
    }
    return student;
};

export const getStudentGradesService = async (studentId: string) => {
    const student = await Student.findById(studentId);
    if (!student) {
        throw new Error("תלמיד לא נמצא");
    }
    return student.grades;
};
