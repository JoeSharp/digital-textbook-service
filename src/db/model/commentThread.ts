import { model, Schema, Document, Types } from "mongoose";

export interface ICommentThread {
  type: string;
  aboutId: Types.ObjectId;
}

export type ICommentThreadDoc = Document & ICommentThread;

const CommentThreadSchema: Schema = new Schema({
  type: {
    type: String,
  },
  aboutId: {
    type: Types.ObjectId,
  },
});

export const CommentThread = model<ICommentThreadDoc>(
  "commentThread",
  CommentThreadSchema
);
