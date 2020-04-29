import { Schema } from "mongoose";
import { SchemaById } from "../../types";

// Questions
export enum IQuestionType {
  MultipleChoice = "MultipleChoice",
  FreeFlowWithClue = "FreeFlowWithClue",
  FreeFlow = "FreeFlow",
}

interface IBaseQuestion {
  type: IQuestionType;
  question: string;
}

export interface IMultipleChoiceQuestion extends IBaseQuestion {
  type: IQuestionType.MultipleChoice;
  correctOption: string;
  options: string[];
}

export interface IFreeFlowWithClueQuestion extends IBaseQuestion {
  type: IQuestionType.FreeFlowWithClue;
  clue: string;
}

export interface IFreeFlowQuestion extends IBaseQuestion {
  type: IQuestionType.FreeFlow;
}

export type IQuestion =
  | IMultipleChoiceQuestion
  | IFreeFlowWithClueQuestion
  | IFreeFlowQuestion;

export interface IQuestionSet {
  caption: string;
  questions: IQuestion[];
}

export const QuestionSchema = new Schema(
  {
    type: {
      type: String,
      enum: Object.keys(IQuestionType),
    },
    question: {
      type: String,
    },
  },
  { _id: false, discriminatorKey: "type" }
);

export const QuestionSetSchema = new Schema(
  {
    caption: {
      type: String,
    },
    questions: {
      type: [QuestionSchema],
    },
  },
  { _id: false }
);

export const QuestionSchemas: SchemaById = {
  [IQuestionType.FreeFlow]: new Schema({}, { _id: false }),
  [IQuestionType.FreeFlowWithClue]: new Schema(
    {
      question: {
        type: String,
      },
      clue: {
        type: String,
      },
    },
    { _id: false }
  ),
  [IQuestionType.MultipleChoice]: new Schema(
    {
      question: {
        type: String,
      },
      correctOption: {
        type: String,
      },
      options: {
        type: [String],
      },
    },
    { _id: false }
  ),
};
