import { model, Document, Schema } from "mongoose";
import { IPrimmWork, BLANK_PRIMM_WORK } from "./primm";

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

export const WorkSchema = new Schema(
  {
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
  },
  { minimize: false }
);

export const getBlankWorkContent = (workType: IWorkType) => {
  switch (workType) {
    case IWorkType.courseTask:
      return {};
    case IWorkType.primmChallenge:
      return BLANK_PRIMM_WORK;
  }
};

export const Work = model<IWorkDoc<any>>("work", WorkSchema);
