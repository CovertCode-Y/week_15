import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITeacher extends Document {
  _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    classroom: Types.ObjectId;
}

const TeacherSchema = new Schema<ITeacher>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', required: true },
});

export default mongoose.model<ITeacher>('Teacher', TeacherSchema);
