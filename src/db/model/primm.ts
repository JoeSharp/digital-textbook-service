import { model, Schema, Document } from "mongoose";
import {
  IEmbeddedIframe,
  EmbeddedIframeSchema,
  EmbeddedSystemSchemas,
} from "./embeddedIframe";
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

const PrimmPredictSchema = new Schema(
  {
    codeWidget: {
      type: EmbeddedIframeSchema,
    },
    questionSets: {
      type: String, // SORT LATER
    },
  },
  { _id: false }
);

// TODO: This seems...sub optimal
Object.entries(EmbeddedSystemSchemas)
  .map((k) => ({ system: k[0], schema: k[1] }))
  .forEach(({ system, schema }) =>
    (PrimmPredictSchema.path("codeWidget") as any).discriminator(system, schema)
  );

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
