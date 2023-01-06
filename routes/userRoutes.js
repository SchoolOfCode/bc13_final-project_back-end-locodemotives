import express from "express";
const userRouter = express.Router();

// import { getUser } from "../models/userModels.js";

userRouter.get("/", async (req, res) => {
  try {
    // const result = await getUser(req.query.email);
    res.json({ success: true, payload: "GET user" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

export default userRouter;
