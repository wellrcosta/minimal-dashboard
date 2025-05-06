import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.static(path.join(__dirname, "../dist")));

console.log("Starting server...");
console.log("MongoDB URI:", process.env.MONGO_URI ? "Defined" : "Not defined");

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    console.log("MongoDB URI:", process.env.MONGO_URI);
    console.log("Using database:", process.env.MONGO_URI?.split("/").pop());
    console.log("Registered models:", Object.keys(mongoose.models));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    console.error("MongoDB URI:", process.env.MONGO_URI);
    process.exit(1);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

const dashboardSchema = new mongoose.Schema({
  _id: { type: String, default: "main-dashboard" },
  sections: { type: Array, default: [] },
});
const Dashboard = mongoose.model("Dashboard", dashboardSchema);

app.get("/api/dashboard", async (req, res) => {
  try {
    let dashboard = await Dashboard.findById("main-dashboard");

    if (!dashboard) {
      const file = await fs.readFile(
        path.join(__dirname, "../src/config/dashboard.config.json"),
        "utf-8"
      );
      const defaultConfig = JSON.parse(file);
      dashboard = await Dashboard.create({
        _id: "main-dashboard",
        sections: defaultConfig.sections || [],
      });
    }

    res.json(dashboard);
  } catch (err) {
    console.error("GET /api/dashboard error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/dashboard", async (req: Request, res: Response) => {
  try {
    console.log("PUT /api/dashboard - Request body:", req.body);

    if (!req.body) {
      console.error("No request body received");
      return res.status(400).json({ error: "No request body received" });
    }

    const { sections } = req.body;

    if (!Array.isArray(sections)) {
      console.error("Invalid sections data:", sections);
      return res
        .status(400)
        .json({ error: "Invalid or missing 'sections' array." });
    }

    console.log("Updating dashboard with sections:", sections);
    const updated = await Dashboard.findByIdAndUpdate(
      "main-dashboard",
      { sections },
      { new: true, upsert: true }
    ).catch((err) => {
      console.error("MongoDB update error:", err);
      throw err;
    });

    console.log("Dashboard updated successfully:", updated);
    return res.json(updated);
  } catch (err) {
    console.error("PUT /api/dashboard error:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      details: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Dashboard running at http://localhost:${PORT}`);
});
