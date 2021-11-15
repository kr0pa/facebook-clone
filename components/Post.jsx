import Image from "next/image";
import {
  ThumbUpIcon,
  ThumbDownIcon,
  AnnotationIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import Message from "./Message";
import { snackbarStatus } from "../slices/snackbarSlice";
import { useDispatch } from "react-redux";
import ToolShow from "./ToolShow";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "@firebase/firestore";

function Post({ id, image, message, postImage, timestamp, name }) {
  const { data: session } = useSession("");
  const commentRef = useRef("");
  const [statusComment, setStatusComment] = useState(false);
  const [statusLike, setStatusLike] = useState(false);

  const [insertedLike, setInsertedLike] = useState(false);
  const [insertedDislike, setInsertedDislike] = useState(false);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(
    () =>
      likes.findIndex((like) => {
        if ((like.id === session?.user?.uid) !== -1) {
          setInsertedLike(true);
          setInsertedDislike(false);
        }
      }),
    [likes]
  );

  useEffect(
    () =>
      dislikes.findIndex((dislike) => {
        if ((dislike.id === session?.user?.uid) !== -1) {
          setInsertedDislike(true);
          setInsertedLike(false);
        }
      }),
    [dislikes]
  );

  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(
  //         collection(db, "posts", id, "likes"),
  //         where("name", "==", session?.user?.name)
  //       ),
  //       (snap) => {
  //         setInsertedLike(snap.docs);
  //       }
  //     ),
  //   [db, id]
  // );

  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(
  //         collection(db, "posts", id, "dislikes"),
  //         where("name", "==", session?.user?.name)
  //       ),
  //       (snap) => {
  //         setInsertedDislike(snap.docs);
  //       }
  //     ),
  //   [db, id]
  // );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "messages"),
          orderBy("timestamp", "asc")
        ),
        (snap) => {
          setMessages(snap.docs);
        }
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "likes"),
          orderBy("timestamp", "desc")
        ),
        (snap) => {
          setLikes(snap.docs);
        }
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "dislikes"),
          orderBy("timestamp", "desc")
        ),
        (snap) => {
          setDislikes(snap.docs);
        }
      ),
    [db, id]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "posts", id, "messages"), {
      name: session?.user.name,
      message: commentRef?.current.value,
      image: session?.user.image,
      timestamp: serverTimestamp(),
    }).then(() => {
      commentRef.current.value = "";
    });
  };

  const addLike = async () => {
    if (!insertedLike) {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
        name: session.user.name,
        timestamp: serverTimestamp(),
      })
        .then(() => {
          deleteDoc(doc(db, "posts", id, "dislikes", session.user.uid));
        })
        .then(() => {
          dispatch(
            snackbarStatus({
              open: true,
              message: "Dodałeś laike!",
            })
          );
        });
    }
  };

  const addDislike = async () => {
    if (!insertedDislike) {
      await setDoc(doc(db, "posts", id, "dislikes", session.user.uid), {
        username: session.user.username,
        name: session.user.name,
        timestamp: serverTimestamp(),
      })
        .then(() => {
          deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
        })
        .then(() => {
          dispatch(
            snackbarStatus({
              open: true,
              message: "Usunełeś laike!",
            })
          );
        });
    }
  };

  return (
    <div className="relative bg-white dark:bg-[#242526] mt-4 rounded-lg shadow-md">
      <div className="bg-blue-600" />

      <div className="flex items-center p-2">
        <Image className="rounded-full" src={image} width={40} height={40} />

        <div className="ml-2">
          <h1 className="font-bold text-sm dark:text-white">{name}</h1>
          <p className="text-xs text-gray-400">
            {new Date(timestamp?.toDate()).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="my-2 ml-2 text-sm font-semibold dark:text-white text-justify">
        {message}
      </div>

      <div className="flex flex-col justify-center cursor-default mb-2">
        {postImage && (
          <Image src={postImage} width={600} height={400} objectFit="contain" />
        )}
      </div>

      <div className="flex justify-end items-center p-2 text-red-500 cursor-default border-b dark:border-[#4E4F50]">
        {statusLike ? (
          <>
            {likes?.length ? (
              <ToolShow
                content={likes?.map((like) => (
                  <p key={like.id}>{like.data().name}</p>
                ))}
              >
                <div
                  onClick={addLike}
                  className="flex items-center cursor-pointer"
                >
                  <ThumbUpIcon width={18} height={18} />
                  <p className="text-md text-black dark:text-white ml-1">
                    {likes?.length}
                  </p>
                </div>
              </ToolShow>
            ) : (
              <div
                onClick={addLike}
                className="flex items-center cursor-pointer"
              >
                <ThumbUpIcon width={18} height={18} />
                <p className="text-md text-black dark:text-white ml-1">
                  {likes?.length}
                </p>
              </div>
            )}

            {dislikes?.length ? (
              <ToolShow
                content={dislikes?.map((dislike) => (
                  <p key={dislike.id}>{dislike.data().name}</p>
                ))}
              >
                <div
                  onClick={addDislike}
                  className="flex items-center ml-3 cursor-pointer"
                >
                  <ThumbDownIcon width={18} height={18} />
                  <p className="text-md text-black dark:text-white ml-1">
                    {dislikes?.length}
                  </p>
                </div>
              </ToolShow>
            ) : (
              <div
                onClick={addDislike}
                className="flex items-center ml-3 cursor-pointer"
              >
                <ThumbDownIcon width={18} height={18} />
                <p className="text-md text-black dark:text-white ml-1">
                  {dislikes?.length}
                </p>
              </div>
            )}
          </>
        ) : (
          ". . ."
        )}
      </div>

      {statusComment && (
        <div
          onClick={() => setStatusComment(!statusComment)}
          className="flex justify-center mt-1 p-2 dark:bg-[#18191A] dark:text-white cursor-pointer  transition hover:bg-gray-200 dark:hover:bg-[#3A3B3C]"
        >
          Hide comments
        </div>
      )}

      {statusComment && (
        <div className="flex flex-col p-3">
          {messages &&
            messages?.map((doc) => {
              const { name, message, image, timestamp } = doc.data();

              return (
                <div key={doc.id} className="mb-2">
                  <Message
                    key={doc.id}
                    id={doc.id}
                    postID={id}
                    name={name}
                    message={message}
                    image={image}
                    timestamp={timestamp}
                  />
                </div>
              );
            })}

          <div className="flex items-center mx-1 ">
            <Image
              className="rounded-full"
              src={session?.user.image}
              width={33}
              height={33}
            />

            <form className="flex flex-1">
              <input
                className="text-sm bg-gray-200 w-full p-[8px] pl-5 rounded-full outline-none ml-4 dark:text-white dark:bg-[#4E4F50]"
                type="text"
                placeholder={"Napisz komentarz..."}
                ref={commentRef}
              />
              <button type="submit" onClick={handleSubmit} className="hidden">
                Submit
              </button>
            </form>
          </div>

          <p className="text-black text-xs dark:text-white ml-[60px] mt-1 cursor-default">
            Naciśnij Enter, aby opublikować.
          </p>
        </div>
      )}

      <div className="flex justify-between text-gray-400 cursor-pointer border-t dark:border-[#4E4F50]">
        <div
          onClick={() => setStatusLike(!statusLike)}
          className="flex justify-center items-center text-sm flex-1 transition hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-3 rounded-bl-lg"
        >
          <ThumbUpIcon width={20} height={20} />
          <p className="hidden sm:inline-flex ml-2">Like / Dislike</p>
        </div>

        <div
          onClick={() => setStatusComment(!statusComment)}
          className="flex justify-center items-center text-sm flex-1 transition hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-3"
        >
          <AnnotationIcon width={20} height={20} />
          <p className="hidden sm:inline-flex ml-2">Comment</p>
        </div>

        <div className="flex justify-center items-center text-sm flex-1 transition hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-3 rounded-br-lg">
          <ShareIcon width={20} height={20} />
          <p className="hidden sm:inline-flex ml-2">Share</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
