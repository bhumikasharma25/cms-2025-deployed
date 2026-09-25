import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();


app.use(cors({ origin: "http://localhost:5173" }));

app.get("/api/test", (_req, res) => {
  res.json({
    message: "Backend connected successfully",
    blogs: ["React Basics", "Node.js Guide", "MongoDB Tutorial"],
  });
});

connectDB();

app.listen(5001, () => {
  console.log("Backend running on http://localhost:5001");
});
