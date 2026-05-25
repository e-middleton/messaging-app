// Import the express module
const express=require('express');
const cors = require("cors");
require("dotenv").config();

// Create an instance of the express application
const app=express();
// Specify a port number for the server
const port=process.env.PORT || 3001;

// use middleware to parse json request bodies
app.use(cors());
app.use(express.json());

// import router modules
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");

// user the router moduels
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

// Start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
