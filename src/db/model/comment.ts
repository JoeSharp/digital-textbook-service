import { model, Schema, Document, Types } from "mongoose";

export interface IComment extends Document {
  threadId: Types.ObjectId;
  reuseId?: Types.ObjectId;
  content: string;
  userId: Types.ObjectId;
  dateTime: number;
}

const CommentSchema: Schema = new Schema({
  threadId: {
    type: Types.ObjectId
  },
  reuseId: {
    type: Types.ObjectId,
    required: false
  },
  content: {
    type: String
  },
  userId: {
    type: Types.ObjectId
  },
  dateTime: {
    type: Date
  }
});

export const Comment = model<IComment>("comment", CommentSchema);
