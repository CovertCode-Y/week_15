import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClassroom extends Document {
  name: string;
  teacher: Types.ObjectId;
  students: Types.ObjectId[];
}

const ClassroomSchema = new Schema<IClassroom>({
  name: {
    type: String,
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    }
  ],
});

export default mongoose.model<IClassroom>('Classroom', ClassroomSchema);
