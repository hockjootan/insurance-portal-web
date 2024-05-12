import { useRouter } from "next/router";

const Error: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-sky-50 w-full h-screen flex justify-center items-center">
      <div className="bg-white w-1/2 min-w-[400px] max-w-[600px] h-80 shadow rounded flex flex-col p-8 justify-center items-center">
        <h1 className="text-center text-lg font-medium">Error has occurred</h1>
        <button
          className="flex gap-2 mt-8 p-2 px-4 rounded-md bg-sky-100"
          onClick={() => router.push("/login")}
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default Error;
