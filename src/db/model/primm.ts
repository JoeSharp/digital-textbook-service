import { model, Schema, Document } from "mongoose";
import {
  IEmbeddedIframe,
  EmbeddedIframeSchema,
  EmbeddedSystemSchemas,
} from "./embeddedIframe";
import { IQuestionSet, QuestionSchemas, QuestionSetSchema } from "./question";
import { SchemaById } from "../../types";
import { setDiscriminator } from "./utils";

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

const PrimmPredictSchema = new Schema(
  {
    codeWidget: {
      type: EmbeddedIframeSchema,
    },
    questionSets: {
      type: [QuestionSetSchema],
    },
  },
  { _id: false }
);

setDiscriminator({
  parentSchema: PrimmPredictSchema,
  path: "codeWidget",
  schemasById: EmbeddedSystemSchemas,
});
setDiscriminator({
  parentSchema: QuestionSetSchema,
  path: "questions",
  schemasById: QuestionSchemas,
});

const PrimmRunSchema = new Schema({
  questionSets: {
    type: String, // SORT LATER
  },
});

const PrimmChallengeSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  predict: {
    type: PrimmPredictSchema,
  },
});

export const PrimmChallenge = model("primmChallenge", PrimmChallengeSchema);
