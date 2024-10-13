import mongoose, { Schema, Document, Types } from "mongoose";

export interface IStudent extends Document {
  username: string;
  email: string;
  password: string;
  classroom: Types.ObjectId;
  grades: {grade: number }[];
}

const StudentSchema = new Schema<IStudent>({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    classroom: {
      type: Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true,
    },
    grades: [
      {
        type: Number,  
        required: true,
      }
    ],
  });
  

export default mongoose.model<IStudent>('Student', StudentSchema);
