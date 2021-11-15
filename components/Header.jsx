import Image from "next/image";
import {
  SearchIcon,
  ShoppingCartIcon,
  PlayIcon,
  FlagIcon,
} from "@heroicons/react/outline";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import HeaderIcon from "./HeaderIcon";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Header() {
  const { data: session } = useSession();
  const [mode, setMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const html = document.querySelector("html");
    const theme = JSON.parse(localStorage.getItem("theme"));

    if (theme) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    setMode(theme);
  }, []);

  const handleMode = () => {
    const html = document.querySelector("html");

    if (!mode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    setMode(!mode);
    localStorage.setItem("theme", JSON.stringify(!mode));
  };

  return (
    <div className="flex items-center p-2 shadow-md justify-between bg-white dark:bg-[#242526] sticky top-0 z-50">
      <div className="flex items-center">
        <Image
          onClick={() => router.push("/")}
          className="cursor-pointer"
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />

        <div className="hidden lg:inline-flex items-center bg-gray-100 dark:bg-[#4E4F50] rounded-full p-2 ml-2">
          <SearchIcon
            width={30}
            height={20}
            className=" text-gray-600 dark:text-gray-300"
          />
          <input
            className="bg-transparent outline-none ml-2 dark:text-white"
            type="text"
            placeholder="Wyszukaj..."
          />
        </div>
      </div>

      <div className="flex justify-center flex-grow">
        <div className="flex items-center justify-around mx-5 w-full">
          <HeaderIcon Icon={HomeIcon} active />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />

          <div className="hidden md:inline-flex">
            <HeaderIcon Icon={ShoppingCartIcon} />
          </div>

          <div className="hidden lg:inline-flex">
            <HeaderIcon Icon={UserGroupIcon} />
          </div>
        </div>
      </div>

      <div className="flex items-center sm:space-x-2 justify-end">
        <div onClick={handleMode} className="cursor-pointer">
          <div
            className={`w-9 h-5 flex items-center bg-gray-300 rounded-full p-1 mr-4 ${
              mode && "bg-[#52555a]"
            }`}
          >
            <div
              className={`${
                mode && "toggle-dot bg-black"
              } w-4 h-4 bg-white rounded-full shadowm-md transform transition duration-300`}
            ></div>
          </div>
        </div>

        <div
          onClick={signOut}
          className="flex items-center mr-1 cursor-pointer"
        >
          {/* <Image
            className="rounded-full"
            src={session?.user.image}
            width={40}
            height={40}
            objectFit="contain"
            layout="fixed"
          /> */}
        </div>
        {/* <p className="text-sm font-bold pr-3 whitespace-nowrap dark:text-white sm:text-base">
          {session?.user.name}
        </p> */}
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>

      {session && (
        <img
          onClick={() => signOut()}
          className="ml-6 h-12 w-12 rounded-full cursor-pointer border-2 border-black dark:border-white"
          src={session?.user.image}
          alt=""
        />
      )}
    </div>
  );
}

export default Header;
