import { model, Schema, Document, Types } from "mongoose";

export interface IReusableComment {
  content: string;
}

export type IReusableCommentDoc = Document & IReusableComment;

const ReusableCommentSchema: Schema = new Schema({
  content: {
    type: String,
  },
});

export const ReusableComment = model<IReusableCommentDoc>(
  "reusableComment",
  ReusableCommentSchema
);
