import { model, Schema, Document } from "mongoose";

export enum IUserProfile {
  student = "student",
  teacher = "teacher",
  administrator = "administrator",
}

export enum IApplicationRoles {
  viewContent = "VIEW_CONTENT",
  study = "STUDY",
  editResources = "EDIT_COURSES",
  editUsers = "EDIT_USERS",
}

export interface IUser {
  profile: IUserProfile;
  emailAddress: string;
  authorisations: IApplicationRoles[];
}

export type IUserDoc = Document & IUser;

const UserSchema: Schema = new Schema({
  profile: {
    type: String,
    enum: Object.keys(IUserProfile),
  },
  emailAddress: {
    type: String,
  },
});

export const User = model<IUserDoc>("user", UserSchema);
