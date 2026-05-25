const { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } = require("firebase/firestore");
const db = require("../firebase");

const fetchAllPosts = async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));

  return querySnapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

const createPost = async (post) => {
  const docRef = await addDoc(collection(db, "posts"), {
    username: post.username,
    message: post.message
  });
  return docRef;
}

// update the message of a previous post object
const updatePost = async (post) => {
  const docRef = await updateDoc(doc(db, "posts", post.id), {
    message: post.message
  })
  return docRef;
}

// delete an old post
const deletePost = async (post) => {
  await deleteDoc(doc(db, "posts", post.id));
}

module.exports = {
  fetchAllPosts,
  createPost, 
  updatePost,
  deletePost,
};