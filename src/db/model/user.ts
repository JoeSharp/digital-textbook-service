import { model, Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  emailAddress: string;
  groupId: Types.ObjectId;
}

const UserSchema: Schema = new Schema({
  emailAddress: {
    type: String
  },
  groupId: {
    type: Types.ObjectId
  }
});

export const User = model<IUser>("user", UserSchema);
