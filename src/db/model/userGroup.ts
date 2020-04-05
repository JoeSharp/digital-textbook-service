import { model, Schema, Document, Types } from "mongoose";

export interface IUserGroup {
  teacherId: Types.ObjectId;
  name: string;
}

export type IUserGroupDoc = Document & IUserGroup;

const UserGroupSchema: Schema = new Schema({
  teacherId: {
    type: Types.ObjectId,
  },
  name: {
    type: String,
  },
});

export const UserGroup = model<IUserGroupDoc>("user", UserGroupSchema);
