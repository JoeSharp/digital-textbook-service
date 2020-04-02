import { model, Schema, Document, Types } from "mongoose";

export interface IReusableComment extends Document {
  content: string;
}

const ReusableCommentSchema: Schema = new Schema({
  content: {
    type: String
  }
});

export const ReusableComment = model<IReusableComment>(
  "reusableComment",
  ReusableCommentSchema
);
