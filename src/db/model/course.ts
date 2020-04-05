import { model, Schema, Document } from "mongoose";

export interface ICourse {
  name: string;
  description: string;
}

export type ICourseDoc = Document & ICourse;

const CourseSchema: Schema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

export const Course = model<ICourseDoc>("course", CourseSchema);
