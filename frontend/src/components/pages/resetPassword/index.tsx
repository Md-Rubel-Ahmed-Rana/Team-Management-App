import { useRouter } from "next/router";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

type FormData = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordPage = () => {
  const router = useRouter();
  const [togglePassword, setTogglePassword] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });
  const handleResetPassword: SubmitHandler<FormData> = (data) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Password reset successful",
      text: "Now, try to login with new password",
      showConfirmButton: false,
      timer: 2000,
    });
    router.push("/login");
  };

  const handleTogglePassword = (type: string) => {
    if (type === "password") {
      setTogglePassword((prev) => ({ ...prev, password: !prev.password }));
    } else {
      setTogglePassword((prev) => ({
        ...prev,
        confirmPassword: !prev.confirmPassword,
      }));
    }
  };

  const password = watch("password");

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-gray-50 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
        <p className="mb-2 text-gray-600">Change your password carefully</p>
        <form onSubmit={handleSubmit(handleResetPassword)}>
          <div className="-mt-px relative mb-4">
            <label htmlFor="password">Password</label>
            <input
              aria-label="Password"
              type={togglePassword.password ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`appearance-none dark:text-white rounded-md relative block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Enter a new password"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
            <button
              type="button"
              className="absolute top-9 right-2 z-50"
              onClick={() => handleTogglePassword("password")}
            >
              {togglePassword.password ? <IoMdEye /> : <IoMdEyeOff />}
            </button>
          </div>
          <div className="-mt-px relative mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              aria-label="Confirm Password"
              type={togglePassword.confirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                minLength: {
                  value: 6,
                  message: "Confirm Password must be at least 6 characters",
                },
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`appearance-none dark:text-white rounded-md relative block w-full px-3 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Enter a new password"
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
            <button
              type="button"
              className="absolute top-9 right-2 z-50"
              onClick={() => handleTogglePassword("confirmPassword")}
            >
              {togglePassword.confirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </button>
          </div>
          <button
            type="submit"
            className={`w-full  text-white py-2 px-4 rounded   bg-blue-500 hover:bg-blue-600`}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
