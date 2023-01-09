import express from "express";
import morgan from "morgan";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";
import postsRouter from "./routes/postsRoutes.js";
import resourcesRouter from "./routes/resourcesRoutes.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/posts", postsRouter);
app.use("/resources", resourcesRouter);

export const server = app.listen(port, () => {
  console.log(`Server running and listening on port ${port}`);
});

export default app;
