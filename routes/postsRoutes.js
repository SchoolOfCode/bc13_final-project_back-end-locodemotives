import express from "express";
const postsRouter = express.Router();

import {
  getAllPosts,
  getPostsByAuthor,
  getPostsBySearch,
  getRepliesByPost,
  getRepliesByUser,
  createNewPost,
  createNewReply,
  deletePost,
  deleteReply,
} from "../models/postsModels.js";

// Get all posts
postsRouter.get("/", async (req, res) => {
  try {
    const result = await getAllPosts();
    res.json({ success: true, payload: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Get posts by author
postsRouter.get("/author", async (req, res) => {
  try {
    const result = await getPostsByAuthor(req.query.author);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Get posts by searching using title and topic
postsRouter.get("/search", async (req, res) => {
  try {
    const result = await getPostsBySearch(req.query.title, req.query.topic);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Get replies for a post
postsRouter.get("/replies", async (req, res) => {
  try {
    const result = await getRepliesByPost(req.query.post);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Get replies for a user
postsRouter.get("/replies", async (req, res) => {
  try {
    const result = await getRepliesByUser(req.query.user);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Create a new post
postsRouter.post("/post", async (req, res) => {
  try {
    const result = await createNewPost(req.body);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Create a new reply
postsRouter.post("/reply", async (req, res) => {
  try {
    const result = await createNewReply(req.body);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Delete post by post_id
postsRouter.delete("/deletePost/:id", async (req, res) => {
  try {
    const result = await deletePost(req.params.id);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

// Delete replies by reply_id
postsRouter.delete("/deleteReply/:id", async (req, res) => {
  try {
    const result = await deleteReply(req.params.id);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, payload: "error" });
  }
});

export default postsRouter;
