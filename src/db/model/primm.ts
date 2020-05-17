import { model, Schema, Document } from "mongoose";
import {
  IEmbeddedIframe,
  EmbeddedIframeSchema,
  EmbeddedSystemSchemas,
} from "./embeddedIframe";
import {
  IScaffoldedQuestions,
  IScaffoldedInstructions,
  ScaffoldedQuestionsSchema,
  ScaffoldedInstructionsSchema,
  IQuestionResponses,
} from "./question";
import { setDiscriminator } from "./utils";

interface IPrimmSection {
  codeWidget: IEmbeddedIframe;
}

export interface IPrimmPredict extends IPrimmSection {
  scaffoldedQuestions: IScaffoldedQuestions[];
}

// export interface IPrimmRun extends IPrimmSection {}
export interface IPrimmInvestigate extends IPrimmSection {
  scaffoldedQuestions: IScaffoldedQuestions[];
}
export interface IPrimmModify extends IPrimmSection {
  scaffoldedInstructions: IScaffoldedInstructions[];
}
export interface IPrimmMake extends IPrimmSection {
  instructions: string;
}

export interface IPrimmChallenge {
  title: string;
  description: string;
  predict: IPrimmPredict;
  run: IPrimmSection;
  investigate: IPrimmSection;
  modify: IPrimmModify;
  make: IPrimmMake;
}

export type IPrimmChallengeDoc = IPrimmChallenge & Document;

export interface IPrimmRunResponse {
  predictionComparison: string;
}
export interface IPrimmRemixResponse {
  urlOfRemix: string;
}

export interface IPrimmWork {
  predict: IQuestionResponses;
  run: IPrimmRunResponse;
  investigate: IQuestionResponses;
  modify: IPrimmRemixResponse;
  make: IPrimmRemixResponse;
}

export const BLANK_PRIMM_WORK: IPrimmWork = {
  predict: {},
  run: {
    predictionComparison: "",
  },
  investigate: {},
  modify: { urlOfRemix: "" },
  make: { urlOfRemix: "" },
};

const PrimmCodeQuestionSchema = new Schema(
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

const PrimmRunSchema = new Schema(
  {
    codeWidget: {
      type: EmbeddedIframeSchema,
    },
  },
  { _id: false }
);

const PrimmCodeRemixSchema = new Schema(
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

[PrimmCodeQuestionSchema, PrimmRunSchema, PrimmCodeRemixSchema].forEach(
  (parentSchema) =>
    setDiscriminator({
      parentSchema,
      path: "codeWidget",
      schemasById: EmbeddedSystemSchemas,
    })
);

const PrimmChallengeSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  predict: {
    type: PrimmCodeQuestionSchema,
  },
  run: {
    type: PrimmRunSchema,
  },
  investigate: {
    type: PrimmCodeQuestionSchema,
  },
  modify: {
    type: PrimmCodeRemixSchema,
  },
  make: {
    type: PrimmCodeRemixSchema,
  },
});

export const PrimmChallenge = model("primmChallenge", PrimmChallengeSchema);
