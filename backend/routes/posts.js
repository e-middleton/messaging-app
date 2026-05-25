const express = require("express");
const { fetchAllPosts, createPost, updatePost, deletePost } = require("../db/posts");

const router = express.Router();

// get all posts
router.get("/", async(req, res) => {
  try {
    const posts = await fetchAllPosts();
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({message: "Error retrieving posts"});
  }
});

// create a new post
router.post("/", async(req, res) => {
  try {
    const { username, message } = req.body;

    if (!username || !message) {
      return res.status(400).json({ error: 'username and message are required' });
    }

    const docRef = await createPost(req.body);
    res.status(201).json(docRef);
  } catch (error) {
    // This prints err in backend terminal
    console.error("Backend Error in POST /posts:", error); 
    
    // Sends the error message back to React for easier debugging
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
})

// update an old post
router.put("/", async(req, res) => {
  try {
    const result = await updatePost(req.body);
    res.status(201).json(result)
  } catch (err) {
    console.error("error in put", err);
    // sends err back to react
    res.status(500).json({message: "Internal server error", error: err.message });
  }
})

// delete a post
router.delete("/", async(req, res) => {
  try {
    // console.log(`req.body: ${req.body}`);
    const result = await deletePost(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("error in delete", err);
    res.status(500).json({message: "Internal server error", error: err.message});
  }
})

module.exports = router;