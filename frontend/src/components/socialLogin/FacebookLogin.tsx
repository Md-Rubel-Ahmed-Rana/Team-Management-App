import { FaFacebook } from "react-icons/fa";

const FacebookLogin = ({ api }: { api: string }) => {
  const handleFacebookLogin = async () => {
    window.open(api, "_self");
  };
  return (
    <button
      onClick={handleFacebookLogin}
      className="bg-blue-600 dark:bg-blue-800 text-white w-full px-5 py-2 rounded-full"
      type="button"
    >
      <FaFacebook className="w-full text-xl" />
    </button>
  );
};

export default FacebookLogin;
