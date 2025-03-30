import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRoute from "./routes/user.js";
import cors from "cors";
import requestRoute from "./routes/request.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your client's origin
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Specify the allowed HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Specify the allowed headers
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Enable credentials (cookies, authorization headers, etc.)
  next();
});

// middlewares
app.use(
  cors({
    origin: ["https://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// express session
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 60 * 60 * 1000 * 24 * 3, //3 days
      httpOnly: true,
      secure: process.env.NODE === "production",
      sameSite: process.env.NODE === "production" ? "none" : null,
    },
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
    }),
  })
);

// routes
app.use("/user", userRoute);
app.use("/request", requestRoute);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on port " + PORT);
    });
  })
  .catch((err) => console.log(err));
