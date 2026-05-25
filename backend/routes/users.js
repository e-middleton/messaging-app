const express = require("express");
const { fetchAllUsers, fetchUserById, addPost } = require("../db/users");

const router = express.Router();

router.get("/", async(req, res) => {
  try {
    const items = await fetchAllUsers();
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({message: "Error retrieving users"});
  }
});

//update a user via their username
router.put("/", async(req, res) => {
  try {
    await addPost(req.body);
    res.status(200).json({message: "updated user"})
  } catch (err) {
    res.status(500).json({message: "Error updating user"})
  }
})


router.get("/:id", async (req, res) => {
  try {
    const item = await fetchUserById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error getting user" });
  }
});


module.exports = router;