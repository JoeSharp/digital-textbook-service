import { model, Schema, Document } from "mongoose";
import {
  IEmbeddedIframe,
  EmbeddedIframeSchema,
  EmbeddedSystemSchemas,
} from "./embeddedIframe";
import {
  IScaffoldedQuestions,
  IScaffoldedInstructions,
  QuestionSchemas,
  ScaffoldedQuestionsSchema,
  ScaffoldedInstructionsSchema,
} from "./question";
import { setDiscriminator } from "./utils";

interface IPrimmSection {
  codeWidget: IEmbeddedIframe;
}

export interface IPrimmPredict extends IPrimmSection {
  scaffoldedQuestions: IScaffoldedQuestions[];
}

// export interface IPrimmRun extends IPrimmSection {}
// export interface IPrimmInvestigate extends IPrimmSection {}
export interface IPrimmModify extends IPrimmSection {
  scaffoldedInstructions: IScaffoldedInstructions[];
}
// export interface IPrimmMake extends IPrimmSection {}

export interface IPrimmChallenge {
  title: string;
  description: string;
  predict: IPrimmPredict;
  run: IPrimmSection;
  investigate: IPrimmSection;
  modify: IPrimmModify;
  make: IPrimmSection;
}

export type IPrimmChallengeDoc = IPrimmChallenge & Document;

const PrimmPredictSchema = new Schema(
  {
    codeWidget: {
      type: EmbeddedIframeSchema,
    },
    scaffoldedQuestions: {
      type: [ScaffoldedQuestionsSchema],
    },
  },
  { _id: false }
);

const PrimmModifySchema = new Schema(
  {
    codeWidget: {
      type: EmbeddedIframeSchema,
    },
    scaffoldedInstructions: {
      type: [ScaffoldedInstructionsSchema],
    },
  },
  { _id: false }
);

[PrimmPredictSchema, PrimmModifySchema].forEach((parentSchema) =>
  setDiscriminator({
    parentSchema,
    path: "codeWidget",
    schemasById: EmbeddedSystemSchemas,
  })
);

const PrimmRunSchema = new Schema({
  scaffoldedQuestions: {
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
  modify: {
    type: PrimmModifySchema,
  },
});

export const PrimmChallenge = model("primmChallenge", PrimmChallengeSchema);
