import { Link } from "react-router-dom";
import LoginLogo from "../../assets/login.png";

const UserDashboard = () => {
  return (
    <div className="flex items-center lg:h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <div className="text-center">
            <img className="mx-auto w-20" src={LoginLogo} alt="" />
          </div>
          <h2 className="mb-2 font-semibold text-center text-2xl leading-9 text-gray-900">
            Hey, Welcome to our Team
          </h2>
          <h4 className="mb-4 font-semibold text-center text-2xl leading-9 text-gray-900">
            You may have new notification
          </h4>
        </div>
        <div className="mt-6 flex justify-center gap-5">
          <Link to="/team-members">
            <button
              type="button"
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
            >
              Go to Team
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
