import mongoose, { Schema, Document, Types } from "mongoose";

export interface IGrade extends Document {
  student: Types.ObjectId;
  classroom: Types.ObjectId;
  grade: number;
  comment: string;
}

const GradeSchema = new Schema<IGrade>({
  student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  classroom: { type: Schema.Types.ObjectId, ref: "Classroom", required: true },
  grade: { type: Number, required: true },
  comment: { type: String, required: true },
});

export default mongoose.model<IGrade>("Grade", GradeSchema);
