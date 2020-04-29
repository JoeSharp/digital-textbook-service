import { model, Schema, Types, Document } from "mongoose";

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
  { discriminatorKey: "system" }
);

export const EmbeddedTrinketSchema = new Schema({
  trinketId: {
    type: String,
  },
});
export const EmbeddedCodePenSchema = new Schema({
  codePenId: {
    type: String,
  },
});

export const EmbeddedCodeDotOrgSchema = new Schema({
  projectId: {
    type: String,
  },
});

export const EmbeddedP5SketchSchema = new Schema({
  sketchId: {
    type: String,
  },
});

export const EmbeddedGitHubGistSchema = new Schema({
  gistId: {
    type: String,
  },
});

export const EmbeddedIframe = model<IEmbeddedIframeDoc>(
  "embeddedIframe",
  EmbeddedIframeSchema
);

export const EmbeddedTrinket = EmbeddedIframe.discriminator(
  IEmbeddedIframeSystem.Trinket.toString(),
  EmbeddedTrinketSchema
);
export const EmbeddedCodePen = EmbeddedIframe.discriminator(
  IEmbeddedIframeSystem.codePen.toString(),
  EmbeddedCodePenSchema
);
export const EmbeddedCodeDotOrg = EmbeddedIframe.discriminator(
  IEmbeddedIframeSystem.codeDotOrg.toString(),
  EmbeddedCodeDotOrgSchema
);
export const EmbeddedP5Sketch = EmbeddedIframe.discriminator(
  IEmbeddedIframeSystem.p5js.toString(),
  EmbeddedP5SketchSchema
);
export const EmbeddedGitHubGist = EmbeddedIframe.discriminator(
  IEmbeddedIframeSystem.gitHubGist.toString(),
  EmbeddedGitHubGistSchema
);
