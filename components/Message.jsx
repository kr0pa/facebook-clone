import Image from "next/image";
import { PlusCircleIcon, ChatIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import MessageComment from "./MessageComment";
import { serverTimestamp } from "@firebase/firestore";

function Message({ id, postID, name, message, image, timestamp }) {
  const commentRef = useRef("");
  const { data: session } = useSession();
  const [visibleComment, setVisibleComment] = useState(false);

  const [messageComments] = useCollection(
    db
      .collection("posts")
      .doc(postID)
      .collection("messages")
      .doc(id)
      .collection("comment")
      .orderBy("timestamp", "asc")
  );

  const handleComment = () => {
    setVisibleComment(!visibleComment);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!commentRef.current.value) return;

    db.collection("posts")
      .doc(postID)
      .collection("messages")
      .doc(id)
      .collection("comment")
      .add({
        name: session?.user.name,
        image: session?.user.image,
        email: session?.user.email,
        message: commentRef?.current.value,
        timestamp: serverTimestamp(),
      })
      .then(() => {
        commentRef.current.value = "";
      });
  };

  return (
    <div className="flex items-start text-sm dark:text-white">
      <div>
        <Image
          className="rounded-full"
          src={image}
          width={30}
          height={30}
          layout="fixed"
        />
      </div>

      <div className="flex flex-col rounded-xl p-3 ml-1 bg-[whitesmoke] dark:bg-[#3A3B3C] min-w-[200px]">
        <div>
          <p className="text-md leading-tight font-medium">{name}</p>
          <p>{message}</p>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center mt-1">
            <div
              onClick={handleComment}
              className="flex items-center text-yellow-500 cursor-pointer"
            >
              <PlusCircleIcon width={15} height={15} />
            </div>

            <div className="flex items-center text-yellow-600 cursor-default">
              <p className="text-sm mr-1">{messageComments?.size}</p>
              <div>
                <ChatIcon width={14} height={14} />
              </div>
            </div>

            <p className="text-[10px] text-gray-500 leading-tight cursor-default">
              {new Date(timestamp?.toDate()).toLocaleDateString()}
            </p>
          </div>

          {visibleComment &&
            messageComments?.docs.map((messageComment) => {
              const { name, message, image, timestamp } = messageComment.data();

              return (
                <MessageComment
                  key={messageComment.id}
                  id={messageComment.id}
                  visible={visibleComment}
                  name={name}
                  message={message}
                  image={image}
                  timestamp={timestamp}
                />
              );
            })}

          {visibleComment && (
            <form className="flex items-center flex-1 border-t mt-1 dark:border-[#4E4F50] p-2">
              <div>
                <Image
                  className="rounded-full"
                  src={image}
                  width={30}
                  height={30}
                  layout="fixed"
                />
              </div>

              <div className="mr-2 w-full">
                <input
                  className="text-sm bg-gray-200 w-full p-[8px] pl-5 rounded-full outline-none ml-4 dark:text-white dark:bg-[#4E4F50]"
                  type="text"
                  placeholder={"Napisz komentarz..."}
                  ref={commentRef}
                />
                <button type="submit" onClick={handleSubmit} className="hidden">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
