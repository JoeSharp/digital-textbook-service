import { connect, model, Schema, Document } from "mongoose";

export interface ICourse extends Document {
  name: string;
  description: string;
}

const CourseSchema: Schema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  }
});

export const Course = model<ICourse>("course", CourseSchema);
