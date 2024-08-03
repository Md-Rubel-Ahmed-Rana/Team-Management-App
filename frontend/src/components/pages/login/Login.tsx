/* eslint-disable @next/next/no-img-element */
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoginUserMutation } from "@/features/user";
import Link from "next/link";
import GoogleLogin from "@/components/shared/GoogleLogin";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/router";
import SocialLogin from "@/components/socialLogin";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });
  const [togglePassword, setTogglePassword] = useState(false);
  const router = useRouter();

  const [loginUser] = useLoginUserMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result: any = await loginUser(data);
    if (result?.data?.statusCode === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/dashboard");
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: result?.error?.data?.message,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <form
          className="lg:shadow-2xl lg:px-10 py-5 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="text-center">
              <img
                className="mx-auto w-20"
                src={"https://i.ibb.co/C7mknCv/login.png"}
                alt=""
              />
            </div>
            <h2 className="mb-4 font-semibold text-center text-3xl leading-9">
              Welcome<strong> Back!</strong>
            </h2>
          </div>
          <div className="rounded-md shadow-sm">
            <div className="my-5">
              <label htmlFor="email">Email</label>
              <input
                autoFocus
                aria-label="Email address"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                className={`appearance-none dark:text-white rounded-md relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="-mt-px relative">
              <label htmlFor="password">Password</label>
              <input
                aria-label="Password"
                type={togglePassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                className={`appearance-none dark:text-white rounded-md relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
              <button
                type="button"
                className="absolute top-9 right-2 z-50"
                onClick={() => setTogglePassword((prev) => !prev)}
              >
                {togglePassword ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
            </div>
          </div>
          <div className="my-4">
            <Link
              className="text-sm text-blue-500 underline"
              href={"/forget-password"}
            >
              Forget password?
            </Link>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
            >
              Login
            </button>
          </div>
          <SocialLogin />
          <div className="text-center my-3">
            <p>
              <small>Don&apos; have an account? </small>
              <Link className="text-blue-400 underline" href="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
