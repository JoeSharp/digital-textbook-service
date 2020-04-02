import { model, Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  instructions: string;
}

const TaskSchema: Schema = new Schema({
  title: {
    type: String
  },
  instructions: {
    type: String
  }
});

export const Task = model<ITask>("task", TaskSchema);
