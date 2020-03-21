import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8080; // default port to listen

const DB_USER = "admin";
const DB_PASSWORD = "JP1pTsVh";
const DB_URL =
  "csdigitaltextbook-bec0y.mongodb.net/test?retryWrites=true&w=majority";
const DB_NAME = "teach-code";
const COLLECTION_COURSES = "courses";
const UI_ORIGIN = "http://localhost:3000";
const CORS_HEADER = "Access-Control-Allow-Origin";

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}`;

interface Course {
  name: string;
}

// define a route handler for the default home page
app.get("/courses", async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true });

  try {
    await client.connect();

    const collection = client.db(DB_NAME).collection(COLLECTION_COURSES);
    // perform actions on the collection object
    const courses: Course[] = [];
    const cursor = collection.find();
    while (await cursor.hasNext()) {
      const course = await cursor.next();
      courses.push(course as Course);
    }

    res.setHeader(CORS_HEADER, UI_ORIGIN);
    res.send(courses);
  } catch (err) {
    res.sendStatus(500);
  }

  // Close connection
  client.close();
});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
