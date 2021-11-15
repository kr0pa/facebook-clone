import { useSession } from "next-auth/react";
import Image from "next/image";
import { VideoCameraIcon, CameraIcon } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

function InputBox() {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);

  const name = () => {
    let name = session?.user.name.split(" ");

    return name[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    const docRef = await addDoc(collection(db, "posts"), {
      name: session.user.username,
      message: inputRef.current.value,
      image: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, image, "data_url").then(async (snap) => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "posts", docRef.id), {
        postImage: downloadURL,
      });

      inputRef.current.value = "";
    });

    // db.collection("posts")
    //   .add({
    //     name: session?.user.name,
    //     image: session?.user.image,
    //     email: session?.user.email,
    //     message: inputRef?.current.value,
    //     timestamp: serverTimestamp(),
    //   })
    //   .then((doc) => {
    //     if (image) {
    //       const uploadTask = storage
    //         .ref(`posts/${doc.id}`)
    //         .putString(image, "data_url");

    //       removeImage();

    //       uploadTask.on(
    //         "state_change",
    //         null,
    //         (err) => console.error(err),
    //         () => {
    //           storage
    //             .ref("posts")
    //             .child(doc.id)
    //             .getDownloadURL()
    //             .then((url) => {
    //               db.collection("posts").doc(doc.id).set(
    //                 {
    //                   postImage: url,
    //                 },
    //                 { merge: true }
    //               );
    //             });
    //         }
    //       );
    //     }

    //     inputRef.current.value = "";
    //   });
  };

  const addImage = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="bg-white dark:bg-[#242526] mt-4 p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <Image
          className="rounded-full"
          src={session?.user?.image}
          width={45}
          height={45}
        />

        <form className="flex flex-1">
          <input
            className="bg-gray-200 w-full p-2 pl-5 rounded-full outline-none ml-4 dark:text-white dark:bg-[#4E4F50]"
            type="text"
            placeholder={`O czym myślisz, ${name()}?`}
            ref={inputRef}
          />
          <button type="submit" onClick={handleSubmit} className="hidden">
            Submit
          </button>
        </form>

        {image && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img
              className="h-10 object-contain rounded-md"
              src={image}
              alt=""
            />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>

      <div className="h-[2px] w-full bg-gray-200 dark:bg-[#4E4F50] rounded-full my-3" />

      <div className="flex justify-between cursor-pointer md:w-full">
        <div className="flex items-center px-8 py-2 transition hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-xl">
          <VideoCameraIcon className="text-red-500" width={25} heiht={25} />
          <p className="hidden md:inline-flex ml-1 text-sm font-medium whitespace-nowrap dark:text-[#B8BBBF]">
            Live Video
          </p>
        </div>

        <div
          onClick={() => fileRef?.current.click()}
          className="flex items-center px-8 py-2 transition hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-xl"
        >
          <CameraIcon className="text-gray-400" width={25} heiht={25} />
          <p className="hidden md:inline-flex ml-1 text-sm font-medium whitespace-nowrap dark:text-[#B8BBBF]">
            Photo/Video
          </p>
          <input ref={fileRef} onChange={addImage} type="file" hidden />
        </div>

        <div className="flex items-center px-8 py-2 transition hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-xl">
          <EmojiHappyIcon className="text-yellow-300" width={25} heiht={25} />
          <p className="hidden md:inline-flex ml-1 text-sm font-medium whitespace-nowrap dark:text-[#B8BBBF]">
            Feeling/Activity
          </p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
