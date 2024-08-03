import { FaTwitter } from "react-icons/fa";

const TwitterLogin = ({ api }: { api: string }) => {
  const handleTwitterLogin = async () => {
    window.open(api, "_self");
  };
  return (
    <button
      onClick={handleTwitterLogin}
      className="bg-blue-400 dark:bg-blue-600 text-white w-full px-5 py-2 rounded-full"
      type="button"
    >
      <FaTwitter className="w-full text-xl" />
    </button>
  );
};

export default TwitterLogin;
