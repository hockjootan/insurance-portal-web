import Image from "next/image";

const Login: React.FC = () => {
  return (
    <div className="bg-sky-50 w-full h-screen flex justify-center items-center">
      <div className="bg-white w-1/2 min-w-[400px] max-w-[600px] h-80 shadow rounded flex flex-col p-8 items-center">
        <h1 className="text-center text-lg font-medium mt-8">
          Welcome to Z Portal
        </h1>
        <button className="flex gap-2 mt-12 p-2 px-4 rounded-md bg-sky-100">
          <Image
            src="/assets/images/google.png"
            alt="google-icon"
            width={24}
            height={24}
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
