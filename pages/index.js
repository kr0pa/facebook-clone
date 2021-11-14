import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import ToolShow from "../components/ToolShow";
import { selectSnackbar } from "../slices/snackbarSlice";

export default function Home() {
  const router = useRouter();
  const selectData = useSelector(selectSnackbar);
  const { data: session } = useSession();

  return (
    <div className="bg-[whitesmoke] dark:bg-[#18191A]">
      <Head>
        <title>Facebook-clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {session ? (
        <>
          <Header />

          <main className="flex justify-center ">
            <Sidebar />
            {/* <Feed /> */}
          </main>

          {/* <Toast
  open={selectData?.open}
  message={selectData?.message}
  time={selectData?.time}
/>

<ToolShow /> */}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   return {
//     props: {
//       session,
//     },
//   };
// }
