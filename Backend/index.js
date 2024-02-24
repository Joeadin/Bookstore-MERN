import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/booksModel.js";
import booksRoute from "./routes/booksRoutes.js";
import cors from 'cors'

const app = express();
//middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
//Option 1: Allow All origins with default of cors(*)
app.use(cors());
//option 2: Allow custom Origins
// app.use(
//   cors({
//     orgin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     aloowesHeaders: ["Content-Type"],
//   })
// );
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
