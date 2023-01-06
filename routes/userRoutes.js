import express from "express";
const userRouter = express.Router();

import {
  getUserByEmail,
  getUserByName,
  newUser,
  deleteUser,
} from "../models/userModels.js";

// Get users by email
userRouter.get("/", async (req, res) => {
  if (req.query.email != undefined) {
    try {
      const result = await getUserByEmail(req.query.email);
      res.json({ success: true, payload: result });
    } catch (error) {
      console.log(error);
      res.json({ success: false, payload: "error" });
    }
  } else if (req.query.name != undefined) {
    try {
      const result = await getUserByName(req.query.name);
      res.json({ success: true, payload: result });
    } catch (error) {
      console.log(error);
      res.json({ success: false, payload: "error" });
    }
  }
});

// Add new user
userRouter.post("/", async (req, res) => {
  try {
    const result = await newUser(req.body);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Delete users by user_id
userRouter.delete("/:id", async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

export default userRouter;
