import { FaGoogle } from "react-icons/fa";

const GoogleLogin = ({ api }: { api: string }) => {
  const handleGoogleLogin = async () => {
    window.open(api, "_self");
  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-red-600 dark:bg-red-800 text-white w-full px-5 py-2 rounded-full"
      type="button"
    >
      <FaGoogle className="w-full text-xl" />
    </button>
  );
};

export default GoogleLogin;
