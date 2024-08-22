import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import Link from "next/link";
import { useResetPasswordMutation } from "@/features/user";

type FormData = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordPage = () => {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [userId, setUserId] = useState<any>();
  const [tokenError, setTokenError] = useState<string | null>(null);
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

  const handleResetPassword: SubmitHandler<FormData> = async (data) => {
    const payload = {
      userId,
      password: data.password,
    };
    const res: any = await resetPassword(payload);
    if (res?.data?.statusCode === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: res?.data?.message,
        showConfirmButton: false,
      });
      router.push("/login");
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong! Try again",
        text: res?.error?.data?.message,
        showConfirmButton: false,
        timer: 2500,
      });
    }
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

  useEffect(() => {
    const paths = router?.asPath;
    const params = new URLSearchParams(paths.split("?")[1]);
    const userId = params.get("userId");
    const token = params.get("token") as string;
    if (token) {
      try {
        jwt.verify(
          token,
          process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET as string
        );

        setUserId(userId);
      } catch (error) {
        setTokenError(
          "The token is expired or invalid. Please request a new password reset."
        );
      }
    }
  }, [router]);

  const password = watch("password");

  if (tokenError) {
    return (
      <div className="h-screen flex items-center justify-center p-5 ">
        <div className="dark:bg-gray-700 bg-gray-100 p-8 rounded-md shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2">Token Error</h1>
          <p className="mb-5">{tokenError}</p>
          <Link
            className="bg-blue-700  text-white px-4 py-2 rounded-md"
            href={"/forget-password"}
          >
            Resend
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center p-5">
      <div className="dark:bg-gray-700 bg-gray-100 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
        <p className="mb-2">Change your password carefully</p>
        <form onSubmit={handleSubmit(handleResetPassword)}>
          <div className="-mt-px relative mb-4">
            <label htmlFor="password">Password</label>
            <input
              autoFocus
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
              } placeholder-gray-500 bg-white text-gray-800 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
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
              } placeholder-gray-500 bg-white text-gray-800 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
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
            disabled={isLoading}
            type="submit"
            className={`w-full text-white py-2 px-4 rounded ${
              isLoading
                ? "bg-gray-800 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } `}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
