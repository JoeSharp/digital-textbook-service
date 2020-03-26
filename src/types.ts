export interface Config {
  DB_URL: string;
  DB_NAME: string;
  DB_COLLECTION_COURSES: string;
  UI_ORIGIN: string;
}

export interface Course {
  name: string;
}

export const CORS_HEADER = "Access-Control-Allow-Origin";
