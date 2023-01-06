import express from "express";
const resourcesRouter = express.Router();

import {
  getResources,
  createNewResource,
  deleteResource,
} from "../models/resourcesModels.js";

// Get resouces by topic and type
resourcesRouter.get("/search", async (req, res) => {
  try {
    const result = await getResources(req.query.topic, req.query.type);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Create a new resource
resourcesRouter.post("/", async (req, res) => {
  try {
    const result = await createNewResource(req.body);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Delete resource by resource_id
resourcesRouter.delete("/:id", async (req, res) => {
  try {
    const result = await deleteResource(req.params.id);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

export default resourcesRouter;
