import { model, Document, Schema } from "mongoose";

export enum IWorkType {
  primmChallenge = "primmChallenge",
  courseTask = "courseTask",
}

export interface IWork<T> {
  workType: IWorkType;
  workId: string;
  workContent: T;
}

export type IWorkDoc<T> = Document & IWork<T>;

export const WorkSchema = new Schema({
  workType: {
    type: String,
    enum: Object.keys(IWorkType),
  },
  workId: {
    type: String,
  },
  workContent: {
    type: Schema.Types.Mixed,
  },
});

export const Work = model<IWorkDoc<any>>("work", WorkSchema);
