import express from "express";
const postsRouter = express.Router();

// import { getPostsByAuthor, getPostsBySearch, getRepliesBypost, createnewPost, createNewReply } from "../models/postsModels.js";

// Get posts by author
postsRouter.get("/author", async (req, res) => {
  try {
    // const result = await getPostsByAuthor(req.query.author);
    res.json({ success: true, payload: "GET posts/author" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Get posts by searching using title and type
postsRouter.get("/search", async (req, res) => {
  try {
    // const result = await getPostsBySearch(req.query.title, req.query.topic);
    res.json({ success: true, payload: "GET posts/search" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Get replies for a post
postsRouter.get("/replies", async (req, res) => {
  try {
    // const result = await getRepliesByPost(req.query.post);
    res.json({ success: true, payload: "GET posts/replies" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Create a new post
postsRouter.post("/post", async (req, res) => {
  try {
    // const result = await createNewPost(req.body);
    res.json({ success: true, payload: "POST posts/post" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Create a new reply
postsRouter.post("/reply", async (req, res) => {
  try {
    // const result = await createNewReply(req.body);
    res.json({ success: true, payload: "POST posts/reply" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

export default postsRouter;
