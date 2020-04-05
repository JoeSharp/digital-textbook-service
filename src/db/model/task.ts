import { model, Schema, Document } from "mongoose";

export interface ITask {
  title: string;
  instructions: string;
}

export type ITaskDoc = Document & ITask;

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
  },
  instructions: {
    type: String,
  },
});

export const Task = model<ITaskDoc>("task", TaskSchema);
