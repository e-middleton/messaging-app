import {useState, useEffect} from 'react';
import axios from 'axios'

const Messages = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get('http://localhost:3001/posts');
      setAllPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <>
      {/* display past messages */}
      <ul>
        {allPosts.map( (post)  => (
          <li key={post.id}>
              <strong>User: {post.username}</strong>
              <p>message: {post.message} </p>
          </li>
          ))}
      </ul>
    </>
  );
}
export default Messages;