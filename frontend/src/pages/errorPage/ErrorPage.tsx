import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex justify-center text-center items-center h-screen">
      <div className="w-72 bg-gray-200 rounded-md border shadow-xl p-10 mx-auto">
        <h2 className="text-xl font-bold">Route not found! 404</h2>
        <div className="mt-5">
          <Link
            className="text-blue-600 bg-white mt-5 px-4 py-2 rounded-md font-semibold"
            to="/"
          >
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
