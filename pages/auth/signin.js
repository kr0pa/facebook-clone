import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GoogleLoginButton } from "react-social-login-buttons";
import Header from "../../components/Header";

function signin({ providers }) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] md:h-[calc(100vh-67px)] bg-[whitesmoke] dark:bg-[#18191A]">
        <img
          //   onClick={() => router.push("/")}
          className="w-80"
          src="https://links.papareact.com/t4i"
          alt=""
        />

        <div className="mt-40">
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
                }}
                activeStyle={{ opacity: 0.8, border: "2px solid white" }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signin;
