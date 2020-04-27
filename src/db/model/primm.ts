import { model, Schema, Types, Document } from "mongoose";
import { IEmbeddedIframe } from "./embeddedIframe";
import { IQuestionSet } from "./question";

interface IPrimmSection {
  codeWidget: IEmbeddedIframe;
}

export interface IPrimmPredict extends IPrimmSection {
  questionSets: IQuestionSet[];
}

// export interface IPrimmRun extends IPrimmSection {}
// export interface IPrimmInvestigate extends IPrimmSection {}
// export interface IPrimmModify extends IPrimmSection {}
// export interface IPrimmMake extends IPrimmSection {}

export interface IPrimmChallenge {
  title: string;
  description: string;
  predict: IPrimmPredict;
  run: IPrimmSection;
  investigate: IPrimmSection;
  modify: IPrimmSection;
  make: IPrimmSection;
}

export type IPrimmChallengeDoc = IPrimmChallenge & Document;

const PrimmChallengeSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

export const PrimmChallenge = model("primmChallenge", PrimmChallengeSchema);
