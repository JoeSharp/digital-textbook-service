import { connect } from "mongoose";

export function connectDb() {
  connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
}
