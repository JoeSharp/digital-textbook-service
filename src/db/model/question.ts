// Questions
export enum IQuestionType {
  MultipleChoice,
  FreeFlowWithClue,
  FreeFlow,
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
