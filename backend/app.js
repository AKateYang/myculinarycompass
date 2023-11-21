// app.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import recipesRoutes from "./routes/recipes.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware setup
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Routes
app.use("/auth", authRoutes);
app.use("/recipes", recipesRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Additional middleware for production (if needed)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("../frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}

export default app;