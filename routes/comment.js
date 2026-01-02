import express from "express";
import comment from "../models/comment.js";
import blog from "../models/blog.js";

const router = express.Router();

router.post("/:id", async (req, res) => {
  try {
    const blogId = req.params?.id;
    if (!blogId) return res.redirect("/riveria");
    const blogg = await blog.findById(blogId);
    if (!blogg) return res.redirect("/riveria");
    const body = req.body;
    if (!body.commentOnPost) return res.send("No comment");
    await comment.create({
      body: body.commentOnPost,
      author: req.user._id,
      blog: blogId,
    });
    return res.redirect(`/blog/${blogId}`);
  } catch {
    return res.redirect("/riveria");
  }
});

export default router;
