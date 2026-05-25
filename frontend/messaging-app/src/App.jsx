import './App.css'
import { useState, useEffect } from 'react';
import {Box, Button, TextField} from '@mui/material';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [error, setError] = useState(false);

  const handlePostSubmit = async () => {
    if (username === "" || message === "") {
      setError(true);
      return
    }
    setError(false); 
    const post = {username: username, message: message};
    try {
      const response = await axios.post('http://localhost:3001/posts', post);
      // retrieve the id of the new message object
      const message_id = response.data.referencePath.split("/")[1];
      // update the user to track their new post item
      post.message_id = message_id;
      console.log(message_id);
      const response2 = await axios.put('http://localhost:3001/users', post);
      console.log(response);
      console.log(response2);
    } catch (err) {
      console.error(err.response?.data);
    }
    
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get('http://localhost:3001/posts');
      setAllPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <>
      <div>
        <Box>
          <TextField
          required
          value={username}
          label="username"
          error={error}
          helperText={error ? "Enter username" : ""}
          onChange={(e) => setUsername(e.target.value)}>
          </TextField>
          <TextField
          required
          value={message}
          error={error}
          helperText={error? "Enter message" : ""}
          label="message"
          onChange={(e)=>setMessage(e.target.value)}>

          </TextField>
          <Button
          onClick={() => handlePostSubmit()}
          >
            Submit
          </Button>
        </Box>

        {/* display past messages */}
        <ul>
          {allPosts.map( (post)  => (
            <li key={post.id}>
                <strong>User: {post.username}</strong>
                <p>message: {post.message} </p>
            </li>
            ))}
        </ul>
        
      </div>
    </>
  )
}

export default App
