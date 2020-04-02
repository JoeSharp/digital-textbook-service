import { model, Schema, Document, Types } from "mongoose";

export interface ICommentThread extends Document {
  type: string;
  aboutId: Types.ObjectId;
}

const CommentThreadSchema: Schema = new Schema({
  type: {
    type: String
  },
  aboutId: {
    type: Types.ObjectId
  }
});

export const CommentThread = model<ICommentThread>(
  "commentThread",
  CommentThreadSchema
);
