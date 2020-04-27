import { model, Schema, Types, Document } from "mongoose";
import { IEmbeddedIframeSystem, IEmbeddedIframe } from "./embeddedIframe";

export enum ITaskType {
  EmbeddedIframe = "EmbeddedIframe",
  FreeFlowText = "FreeFlowText",
}

export interface IBaseTask {
  type: ITaskType;
  lessonId: string;
  title: string;
  instruction: string;
  videoLink: string;
}

export interface ITaskEmbeddedIframe extends IBaseTask {
  type: ITaskType.EmbeddedIframe;
  iframe: IEmbeddedIframe;
}
export interface ITaskFreeFlowText extends IBaseTask {
  type: ITaskType.FreeFlowText;
}

export type ITask = ITaskEmbeddedIframe | ITaskFreeFlowText;

export type ITaskDoc = Document & ITask;

const EmbeddedIframeSchema: Schema = new Schema(
  {
    system: {
      type: String,
      enum: Object.keys(IEmbeddedIframeSystem),
    },
  },
  { discriminatorKey: "system" }
);
const EmbeddedIframe = model("embeddedIframe", EmbeddedIframeSchema);

const EmbeddedTrinket = EmbeddedIframe.discriminator(
  "Trinket",
  new Schema({
    trinketId: {
      type: String,
    },
  })
);
const EmbeddedCodePen = EmbeddedIframe.discriminator(
  "codePen",
  new Schema({
    codePenId: {
      type: String,
    },
  })
);
const EmbeddedCodeDotOrg = EmbeddedIframe.discriminator(
  "codeDotOrg",
  new Schema({
    projectId: {
      type: String,
    },
  })
);
const EmbeddedP5Sketch = EmbeddedIframe.discriminator(
  "p5js",
  new Schema({
    sketchId: {
      type: String,
    },
  })
);
const IEmbeddedGitHubGist = EmbeddedIframe.discriminator(
  "gitHubGist",
  new Schema({
    gistId: {
      type: String,
    },
  })
);

const TaskSchema: Schema = new Schema(
  {
    lessonId: {
      type: Types.ObjectId,
    },
    title: {
      type: String,
    },
    type: {
      type: String,
      enum: Object.keys(ITaskType),
    },
    instructions: {
      type: String,
    },
    videoLink: {
      type: String,
    },
  },
  { discriminatorKey: "type" }
);
export const Task = model<ITaskDoc>("task", TaskSchema);

export const TaskEmbeddedIframe = Task.discriminator(
  "TaskEmbeddedIframe",
  new Schema({})
);
export const TaskFreeFlowText = Task.discriminator(
  "TaskFreeFlowText",
  new Schema({
    iframe: {
      type: EmbeddedIframeSchema,
    },
  })
);
