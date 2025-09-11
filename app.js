import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRoute from "./routes/user.js";
import cors from "cors";
import requestRoute from "./routes/request.js";
import applyRoute from "./routes/apply.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET;

const app = express();

// Trust Cloudflare/Railway proxies
app.set("trust proxy", 1);

// Define allowed frontend
const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.pedagogichub.com"
    : "http://localhost:3000";

// middlewares
app.use(
  cors({
    origin: [FRONTEND_URL],
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
app.use("/apply", applyRoute);

app.get("/", (req, res) => {
  res.json("Welcome to Pedagogic Hub Backend API");
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on port " + PORT);
    });
  })
  .catch((err) => console.log(err));
