import { model, Schema, Document, Types } from "mongoose";

export interface IUser {
  emailAddress: string;
  groupId: Types.ObjectId;
}

export type IUserDoc = Document & IUser;

const UserSchema: Schema = new Schema({
  emailAddress: {
    type: String,
  },
  groupId: {
    type: Types.ObjectId,
  },
});

export const User = model<IUserDoc>("user", UserSchema);
