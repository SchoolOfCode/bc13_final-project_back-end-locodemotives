// Import node packages
import express from "express";
import morgan from "morgan";
import cors from "cors";

// Import REST routes
import userRouter from "./routes/userRoutes.js";
import postsRouter from "./routes/postsRoutes.js";
import resourcesRouter from "./routes/resourcesRoutes.js";

const app = express(); // Use express as 'app'
const port = process.env.PORT; // Set port using environment variable

// Middleware
app.use(cors()); // Enables cross-origin HTTP requests
app.use(express.json()); // Parse body as JSON
app.use(morgan("dev")); // Logs HTTP requests and errors

// Route middleware
app.use("/user", userRouter);
app.use("/posts", postsRouter);
app.use("/resources", resourcesRouter);

// Set server to listen at 'port'
export const server = app.listen(port, () => {
  console.log(`Server running and listening on port ${port}`);
});

export default app;
