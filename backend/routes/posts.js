const express = require("express");
const { fetchAllPosts, createPost, updatePost } = require("../db/posts");

const router = express.Router();

router.get("/", async(req, res) => {
  try {
    const posts = await fetchAllPosts();
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({message: "Error retrieving posts"});
  }
});

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

router.put("/", async(req, res) => {
  try {
    const res = updatePost(req.body.message);
  } catch (err) {
    console.lerror("error in put", err);
    // sends err back to react
    res.status(500).json({message: "Internal server error", error: err.message });
  }
})

module.exports = router;