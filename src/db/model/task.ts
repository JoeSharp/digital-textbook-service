import { model, Schema, Document, Types } from "mongoose";

export interface ITask {
  lessonId: string;
  title: string;
  instructions: string;
}

export type ITaskDoc = Document & ITask;

const TaskSchema: Schema = new Schema({
  lessonId: {
    type: Types.ObjectId,
  },
  title: {
    type: String,
  },
  instructions: {
    type: String,
  },
});

export const Task = model<ITaskDoc>("task", TaskSchema);
