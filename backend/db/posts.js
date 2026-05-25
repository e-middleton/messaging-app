const { collection, doc, getDoc, getDocs, addDoc } = require("firebase/firestore");
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

module.exports = {
  fetchAllPosts,
  createPost
};