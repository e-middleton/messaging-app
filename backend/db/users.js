const { collection, doc, getDoc, getDocs, updateDoc, setDoc } = require("firebase/firestore");
const db = require("../firebase");

const fetchAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));

  return querySnapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

const fetchUserById = async (id) => {
  const userSnapshot = await getDoc(doc(db, "users", id));

  if (!userSnapshot.exists()) {
    return null;
  }

  return {
    id: userSnapshot.id,
    ...userSnapshot.data(),
  };
};

// creates a new user via username with first post id
const createUser = async (post) => {
  const docRef = await setDoc(doc(db, "users", post.username), {
    message_ids: [post.message_id]
  });
}

// updates the posts of a user or creates a new one
const addPost = async (post) => {
  // get user
  const user = await fetchUserById(post.username);
  console.log(post);

  if (user === null) {
    await createUser(post);
    return;
  }

  const posts = user.message_ids;
  posts.push(post.message_id);
  
  const docRef = await updateDoc(doc(db, "users", post.username), {
    message_ids: posts
  })
}

module.exports = {
  fetchAllUsers,
  fetchUserById,
  addPost,
};
