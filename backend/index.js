import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase } from "./Database/connection.database.js";
import { postRouter } from "./Routes/postRouter.router.js";
import { getRouter } from "./Routes/getRouter.router.js";
import { deleteRouter } from "./Routes/deleteRouter.router.js";

const test = {
  origin: "*", 
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
};

/**
 * @config for hanlding environement variables in the project
 */
config();

/**
 * @app = express object for routing and api's
 * @port = default port on which the server will listen the incoming  request.
 */

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * @middleware = bodyParser.json() for extracting data from the incoming request in json format
 * @middleware = bodyParser.urlEncoded() for extracting data in all the datatypes in the encoded format.
 * @middleware = cors() for allowing all origins (PORT), headers, and REQUEST TYPE [GET,POST,PATCH,PUT,DELETE]
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(test));

/**
 * @router = get for testing purpose.
 */

app.get("/", (req, res) => {
  res.send("hello this is working fine");
});

app.use(postRouter);
app.use(getRouter);
app.use(deleteRouter);

/**
 * @function = for connecting the virtual cloud mongodb server.
 * @params = callback that will be executed only  when the connection will be established.
 */

connectDatabase(() => {
  app.listen(5000, () => {
    console.log(`Server is listening on the port ${PORT}`);
  });
});
