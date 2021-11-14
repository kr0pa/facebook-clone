import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Post from "./Post";

function Posts() {
  const [posts] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );

  return (
    <div>
      {posts?.docs.map((post) => {
        const { image, message, name, postImage, timestamp } = post.data();

        return (
          <Post
            id={post.id}
            key={post.id}
            image={image}
            message={message}
            name={name}
            postImage={postImage}
            timestamp={timestamp}
          />
        );
      })}
    </div>
  );
}

export default Posts;
