import { FaGithub } from "react-icons/fa";

const GithubLogin = ({ api }: { api: string }) => {
  const handleGithubLogin = async () => {
    window.open(api, "_self");
  };
  return (
    <button
      onClick={handleGithubLogin}
      className="bg-gray-800 dark:bg-gray-600 text-white w-full px-5 py-2 rounded-full"
      type="button"
    >
      <FaGithub className="w-full text-xl" />
    </button>
  );
};

export default GithubLogin;
