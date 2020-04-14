import { model, Schema, Document, Types } from "mongoose";

export type ITaskType =
  | "Trinket"
  | "p5js"
  | "codepen"
  | "code.org"
  | "OtherSite"
  | "FreeFlowText";

export interface ITask {
  lessonId: string;
  title: string;
  type: ITaskType;
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
  type: {
    type: String,
    enum: ["Trinket", "p5js", "codepen", "OtherSite", "FreeFlowText"],
  },
  instructions: {
    type: String,
  },
});

export const Task = model<ITaskDoc>("task", TaskSchema);
