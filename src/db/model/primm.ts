import { model, Schema, Types, Document } from "mongoose";
import {
  IEmbeddedIframe,
  EmbeddedIframeSchema,
  EmbeddedGitHubGistSchema,
  IEmbeddedIframeSystem,
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

const PrimmSectionSchema = new Schema(
  {
    codeWidget: {
      type: EmbeddedIframeSchema,
    },
  },
  { _id: false }
);

const PrimmPredictSchema = new Schema();
PrimmPredictSchema.add(PrimmSectionSchema);
PrimmPredictSchema.add({
  questionSets: {
    type: String, // SORT LATER
  },
});

(PrimmPredictSchema.path("codeWidget") as any).discriminator(
  IEmbeddedIframeSystem.gitHubGist.toString(),
  EmbeddedGitHubGistSchema
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
