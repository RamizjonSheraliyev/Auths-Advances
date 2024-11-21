import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.route.js";

dotenv.config();  // .env faylini o'qis

console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// CORS sozlamalari
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware
app.use(express.json()); // req.body ni o'qish uchun
app.use(cookieParser()); 

// Auth route
app.use("/api/auth", authRoutes);

// Production uchun static fayllar
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// MongoDB ulanish
const mongoUri = process.env.MONGO_URI || "mongodb+srv://ramizsheraliyev5:sG7mSAsqNyCtGDVQ@cluster0.0lxzo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Serverni ishga tushurish
app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
