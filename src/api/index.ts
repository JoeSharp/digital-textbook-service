import courseApi from "./courseApi";
import taskApi from "./taskApi";
import lessonApi from "./lessonApi";
import userApi from "./userApi";
import primmApi from "./primmApi";
import { RestApi } from "./types";

const apis: RestApi[] = [userApi, courseApi, lessonApi, taskApi, primmApi];

export default apis;
