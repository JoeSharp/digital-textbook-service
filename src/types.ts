import { Schema } from "mongoose";

export interface Config {
  DB_URL: string;
  DB_COLLECTION_COURSES: string;
  UI_ORIGIN: string;
}

export interface SchemaById {
  [s: string]: Schema;
}
