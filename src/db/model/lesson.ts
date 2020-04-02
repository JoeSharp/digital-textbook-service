import { model, Schema, Document, Types } from "mongoose";

export interface ILesson extends Document {
  lessonId: Types.ObjectId;
  title: string;
  description: string;
}

const LessonSchema: Schema = new Schema({
  lessonId: {
    type: Types.ObjectId
  },
  title: {
    type: String
  },
  description: {
    type: String
  }
});

export const Lesson = model<ILesson>("lesson", LessonSchema);
