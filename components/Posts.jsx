import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snap) => {
          setPosts(snap.docs);
        }
      ),
    [db]
  );

  return (
    <div>
      {posts?.map((post) => (
        <Post
          id={post.id}
          key={post.id}
          image={post.data().image}
          message={post.data().message}
          name={post.data().name}
          postImage={post.data().postImage}
          timestamp={post.data().timestamp}
        />
      ))}
    </div>
  );
}

export default Posts;
