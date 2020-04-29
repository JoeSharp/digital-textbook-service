import { model, Schema, Document } from "mongoose";

export interface IUser {
  emailAddress: string;
}

export type IUserDoc = Document & IUser;

const UserSchema: Schema = new Schema({
  emailAddress: {
    type: String,
  },
});

export const User = model<IUserDoc>("user", UserSchema);
