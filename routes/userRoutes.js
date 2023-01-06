import express from "express";
const userRouter = express.Router();

import { getUser, deleteUser } from "../models/userModels.js";

// Get users by email
userRouter.get("/", async (req, res) => {
  try {
    const result = await getUser(req.query.email);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Delete users by user_id
userRouter.delete("/:id", async (req, res) => {
  try {
    // const result = await deleteUser(req.params.id);
    res.json({ success: true, payload: "DELETE user" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

export default userRouter;
