import { Document } from "mongoose";
import { IEmbeddedIframe } from "../embeddedIframe";

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
