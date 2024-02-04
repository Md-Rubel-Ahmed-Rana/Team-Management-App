import React from "react";

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    window.open("http://localhost:5000/google/login", "_self");
  };
  return (
    <div className="my-3 text-center font-semibold">
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-300 dark:bg-gray-600 w-full px-5 py-2 rounded-md"
        type="button"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
