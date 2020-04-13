import { model, Schema, Document, Types } from "mongoose";

export interface ILesson {
  courseId: Types.ObjectId;
  title: string;
  description: string;
}

export type ILessonDoc = Document & ILesson;

const LessonSchema: Schema = new Schema({
  courseId: {
    type: Types.ObjectId,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

export const Lesson = model<ILessonDoc>("lesson", LessonSchema);
