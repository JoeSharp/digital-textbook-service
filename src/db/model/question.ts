import { Schema } from "mongoose";
import { SchemaById } from "../../types";
import { setDiscriminator } from "./utils";

// Questions
export enum IQuestionType {
  MultipleChoice = "MultipleChoice",
  FreeFlowWithClue = "FreeFlowWithClue",
  FreeFlow = "FreeFlow",
}

interface IBaseQuestion {
  type: IQuestionType;
  question: string;
  id: string;
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

export interface IScaffoldedQuestions {
  caption: string;
  questions: IQuestion[];
}

export interface IQuestionResponses {
  [questionId: string]: string | undefined;
}

export const EMPTY_SCAFFOLDED_QUESTION_RESPONSES: IQuestionResponses = {};

export const QuestionSchema = new Schema(
  {
    id: {
      type: String,
    },
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

export const ScaffoldedQuestionsSchema = new Schema(
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

setDiscriminator({
  parentSchema: ScaffoldedQuestionsSchema,
  path: "questions",
  schemasById: QuestionSchemas,
});

export interface IScaffoldedInstructions {
  caption: string;
  instructions: string[];
}

export const ScaffoldedInstructionsSchema = new Schema(
  {
    caption: {
      type: String,
    },
    instructions: {
      type: [String],
    },
  },
  { _id: false }
);
