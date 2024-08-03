import FacebookLogin from "./FacebookLogin";
import GithubLogin from "./GithubLogin";
import GoogleLogin from "./GoogleLogin";
import TwitterLogin from "./TwitterLogin";

const SocialLogin = () => {
  const baseApi = process.env.NEXT_PUBLIC_BASE_API;
  console.log({ baseApi });
  return (
    <div>
      <div className="flex items-center gap-2 mt-3">
        <hr className="w-full border-1 border-gray-400" />
        <span className="font-semibold">OR</span>
        <hr className="w-full border-1 border-gray-400" />
      </div>
      <div className="flex justify-between items-center mt-3 gap-2">
        <GoogleLogin api={`${baseApi}/auth/google/login`} />
        <FacebookLogin api={`${baseApi}/auth/facebook/login`} />
        <GithubLogin api={`${baseApi}/auth/github/login`} />
        <TwitterLogin api={`${baseApi}/auth/twitter/login`} />
      </div>
    </div>
  );
};

export default SocialLogin;
