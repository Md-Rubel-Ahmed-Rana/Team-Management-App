import { Link } from "react-router-dom";
import LoginLogo from "../../assets/login.png";
import { useAppSelector } from "../../redux/hooks";

const WelcomePage = () => {
  const user: any = useAppSelector((state) => state.user.user);

  return (
    <div className="flex items-center h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
      {user?.email ? (
        <div className="max-w-md w-full">
          <div>
            <div className="text-center">
              <img className="mx-auto w-20" src={LoginLogo} alt="" />
            </div>
            <h2 className="mb-2 font-semibold text-center text-2xl leading-9 text-gray-900">
              Welcome to Little Programmer
            </h2>
            <h4 className="mb-4 font-semibold text-center text-2xl leading-9 text-gray-900">
              Manage your team efficiently
            </h4>
          </div>
          <div className="mt-6 flex justify-center gap-5">
            <Link to="/dashboard">
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
              >
                Go Dashboard
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-md w-full">
          <div>
            <div className="text-center">
              <img className="mx-auto w-20" src={LoginLogo} alt="" />
            </div>
            <h2 className="mb-2 font-semibold text-center text-2xl leading-9 text-gray-900">
              Welcome to our Team Management Hall
            </h2>
            <h4 className="mb-4 font-semibold text-center text-2xl leading-9 text-gray-900">
              Login your account to continue
            </h4>
          </div>
          <div className="mt-6 flex justify-center gap-5">
            <Link to="/login">
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
              >
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
              >
                Signup
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
