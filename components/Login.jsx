import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../components/Header";

function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <Header />
      <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-67px)] flex justify-center items-center">
        <h1 className="dark:text-white text-2xl mr-5">
          Nie jesteś zalogowany. Przejdź do Login Page
        </h1>

        <Image
          onClick={() => signIn()}
          className="cursor-pointer animate-pulse"
          src="/arrow_login.png"
          width={100}
          height={80}
          layout="fixed"
        />
        {/* <Header />

      <div className="h-[calc(100vh-56px)] md:h-[calc(100vh-67px)] flex flex-col justify-center items-center bg-[whitesmoke] dark:bg-[#18191A]">
        <Image
          src="https://links.papareact.com/t4i"
          height={400}
          width={400}
          objectFit="contain"
        />

        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <GoogleLoginButton
              text="Zaloguj sie poprzez Google"
              className="bg-blue-500 p-3 rounded-lg text-white"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: 600,
                letterSpacing: "1px",
                border: "2px solid black",
                borderRadius: "10px",
                padding: "30px 20px",
                textTransform: "uppercase",
                transition: ".3s",
                marginBottom: 200,
                width: "base",
              }}
              activeStyle={{ opacity: 0.8, border: "2px solid white" }}
            />
          </div>
        ))}

        {() => router.push("/auth/signin")}
      </div> */}
      </div>
    </>
  );
}

// export async function getServerSideProps() {
//   const providers = await getProviders();

//   return {
//     props: {
//       providers,
//     },
//   };
// }

export default Login;
