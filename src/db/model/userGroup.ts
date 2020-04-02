import { model, Schema, Document, Types } from "mongoose";

export interface IUserGroup extends Document {
  teacherId: Types.ObjectId;
  name: string;
}

const UserGroupSchema: Schema = new Schema({
  teacherId: {
    type: Types.ObjectId
  },
  name: {
    type: String
  }
});

export const UserGroup = model<IUserGroup>("user", UserGroupSchema);
