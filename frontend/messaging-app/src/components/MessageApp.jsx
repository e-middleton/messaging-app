import {useState, useEffect} from 'react';
import axios from 'axios'
import { ListItem, Button, TextField } from "@mui/material";
import "./Messages.css";
import PostForm from './PostForm';

const MessageApp = ( ) => {
  const [allPosts, setAllPosts] = useState([]);
  const [currPost, setCurrPost] = useState(null);
  const [update, setUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get('http://localhost:3001/posts');
      setAllPosts(data);
    }

    fetchPosts();
  }, [refresh]);

  // open the update form
  const startUpdate = (post) => {
    setUpdate(true);
    setCurrPost(post);
  }

  // update the post in the database
  const handleUpdate = async () => {
    try {
      const result = await axios.put("http://localhost:3001/posts", currPost);
      console.log(result);
      setUpdate(false);
      setRefresh(prevState => !prevState);
    } catch (err) {
      console.error(err.response?.data);
    }
  }

  // handle deleting an old post
  const handleDelete = async (post) => {
    try {
      console.log(post);
      const result = await axios.delete("http://localhost:3001/posts", {
        data: post
      });
      console.log(result);
      setRefresh(prevState => !prevState);
    } catch (err) {
      console.error(err.response?.data);
    }
  }

  return (
    <>
      <div className="app-layout">
        <h2>Messaging Forum</h2>
        <PostForm setRefresh={setRefresh}/>
        <div className="past-messages">
          {/* update post form */}
          {update ? 
          <div style={{border:"solid black 1px", borderRadius:"2rem", padding: "1rem", display: "flex", flexDirection: "column", width:"30rem", gap:"0.5rem", alignItems:"center"}}>
            <h3>Update Post</h3>
            <h4>Username: {currPost.username}</h4>
            <TextField 
            sx={{width:"fit-content"}}
            label="message" 
            value={currPost ? currPost.message : null}
            onChange={(e) => setCurrPost({...currPost, message: e.target.value})}
            >
            </TextField>
            <Button sx={{width:"fit-content"}}
            onClick={() => handleUpdate()}
            variant="contained">Submit</Button>
          </div> : null}

          {/* display past messages */}
          <ul className="all-posts">
            {allPosts.map( (post)  => (
              <div key={post.id} className="post">
                <ListItem 
                sx={{width:"100%"}}
                >
                  <div className="post-text">
                    <p>
                      <i>{post.username}</i>
                    </p>
                    <p>
                      {post.message}
                    </p>
                  </div>
                </ListItem>
                <div className="buttons">
                    <Button 
                    sx={{paddingLeft: "0.5rem", paddingRight: "0.5rem"}}
                    variant="outlined" 
                    onClick={() => startUpdate(post)}
                    >
                      Update
                    </Button>
                    <Button 
                    variant="contained" 
                    sx={{pl:"0.5rem",pr:"0.5rem"}}
                    onClick={() => handleDelete(post)}>
                      Delete
                    </Button>
                  </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
export default MessageApp;