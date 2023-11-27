import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { verifyToken } from "./middleware/verifytoken.js";

///////////////////////////////////////////////////
// Imports to routes
import authRoutes from "./routes/auth.js";
import recipesRoutes from "./routes/recipes.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

///////////////////////////////////////////////////
// Imports to routes with image paths
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { getPost } from "./controllers/posts.js";
import { deletePost } from "./controllers/posts.js";
import { likePost } from "./controllers/posts.js";
import { getUser } from "./controllers/users.js";
import { searchUsers } from "./controllers/users.js";

///////////////////////////////////////////////////
// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

///////////////////////////////////////////////////
// FILE STORAGE FOR IMAGES (DO NOT REMOVE)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

///////////////////////////////////////////////////
// ROUTES WITH FILES (NEEDED FOR UPLOADING IMAGES & VIDEO. DO NOT REMOVE)
// app.post("/auth/register", upload.single("picture"), register);
app.post(
  "/posts/createPost",
  upload.single("picture"),
  upload.single("video"),
  createPost
);

app.get(
  "/posts/:postId",
  upload.single("picture"),
  upload.single("video"),
  getPost
);

app.delete(
  "/posts/delete/:postId",
  upload.single("picture"),
  upload.single("video"),
  deletePost
);

app.patch("/posts/:postId/likePost", likePost);

app.get("/users/getUser/:userId", upload.single("picture"), getUser);

app.get("/users/searchUsers/:username", searchUsers);

///////////////////////////////////////////////////
// ROUTES
app.use("/auth", authRoutes);
app.use("/recipes", recipesRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
// app.use("/posts/createPost", createPost);

export default app;
