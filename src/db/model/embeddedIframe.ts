import { Schema, Document } from "mongoose";
import { SchemaById } from "../../types";

export enum IEmbeddedIframeSystem {
  Trinket = "Trinket",
  p5js = "p5js",
  codeDotOrg = "codeDotOrg",
  codePen = "codePen",
  gitHubGist = "gitHubGist",
}

export interface IBaseEmbeddedIframe {
  system: IEmbeddedIframeSystem;
}

export interface IEmbeddedTrinket extends IBaseEmbeddedIframe {
  system: IEmbeddedIframeSystem.Trinket;
  trinketId: string;
}
export interface IEmbeddedCodePen extends IBaseEmbeddedIframe {
  system: IEmbeddedIframeSystem.codePen;
  codePenId: string;
}
export interface IEmbeddedCodeDotOrg extends IBaseEmbeddedIframe {
  system: IEmbeddedIframeSystem.codeDotOrg;
  projectId: string;
}
export interface IEmbeddedP5Sketch extends IBaseEmbeddedIframe {
  system: IEmbeddedIframeSystem.p5js;
  sketchId: string;
}
export interface IEmbeddedGitHubGist extends IBaseEmbeddedIframe {
  system: IEmbeddedIframeSystem.gitHubGist;
  gistId: string;
}

export type IEmbeddedIframe =
  | IEmbeddedTrinket
  | IEmbeddedCodePen
  | IEmbeddedCodeDotOrg
  | IEmbeddedP5Sketch
  | IEmbeddedGitHubGist;

export type IEmbeddedIframeDoc = IEmbeddedIframe & Document;

export const EmbeddedIframeSchema: Schema = new Schema(
  {
    system: {
      type: String,
      enum: Object.keys(IEmbeddedIframeSystem),
    },
  },
  { discriminatorKey: "system", _id: false }
);

export const EmbeddedSystemSchemas: SchemaById = {
  [IEmbeddedIframeSystem.Trinket]: new Schema(
    {
      trinketId: {
        type: String,
      },
    },
    { _id: false }
  ),
  [IEmbeddedIframeSystem.codePen]: new Schema(
    {
      codePenId: {
        type: String,
      },
    },
    { _id: false }
  ),
  [IEmbeddedIframeSystem.codeDotOrg]: new Schema(
    {
      projectId: {
        type: String,
      },
    },
    { _id: false }
  ),
  [IEmbeddedIframeSystem.p5js]: new Schema(
    {
      sketchId: {
        type: String,
      },
    },
    { _id: false }
  ),
  [IEmbeddedIframeSystem.gitHubGist]: new Schema(
    {
      gistId: {
        type: String,
      },
    },
    { _id: false }
  ),
};
