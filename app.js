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
    ? "https://pedagogichub.com"
    : "http://localhost:3000";

// Apply CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests quickly
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

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
