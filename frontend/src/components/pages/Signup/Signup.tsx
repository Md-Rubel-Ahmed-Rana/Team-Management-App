import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useRouter } from "next/router";
import { IUser } from "@/interfaces/user.interface";
import { useCreateUserMutation } from "@/features/user";
import SocialLogin from "@/components/socialLogin";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({ mode: "onChange" });
  const router = useRouter();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [togglePassword, setTogglePassword] = useState(false);

  const handleRegister: SubmitHandler<IUser> = async (data) => {
    const result: any = await createUser(data);
    if (
      !result?.error?.data?.success &&
      result?.error?.data?.message === "This email already exist"
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to signup",
        text: `${result?.error?.data?.message}. Please try with another email!`,
        showConfirmButton: true,
      });
    }
    if (result?.data?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/login");
    }
    if (result?.error && result?.error?.status === "FETCH_ERROR") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Connection failed",
        text: "Please check your internet connection. Try again!",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <form
          className="lg:shadow-2xl lg:px-10 py-10 rounded-md"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div>
            <h2 className="mb-4 text-center lg:text-3xl text-xl leading-9 font-extrabold">
              Create account
            </h2>
          </div>
          <div className="w-full gap-5">
            <div>
              <label htmlFor="name">Name</label>
              <input
                autoFocus
                aria-label="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`appearance-none dark:text-white rounded-md relative block w-full px-3 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="my-5">
              <label htmlFor="username">Email</label>
              <input
                aria-label="email"
                type="text"
                {...register("email", { required: "email is required" })}
                className={`appearance-none dark:text-white rounded-md relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Enter your active email address"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="my-5">
              <label htmlFor="department">Department</label>
              <input
                aria-label="department"
                type="text"
                {...register("department", {
                  required: "Department is required",
                })}
                className={`appearance-none dark:text-white rounded-md relative block w-full px-3 py-2 border ${
                  errors.department ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Department (Engineering)"
              />
              {errors.department && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.department.message}
                </p>
              )}
            </div>
            <div className="my-5">
              <label htmlFor="Designation">Designation</label>
              <input
                aria-label="Designation"
                type="text"
                {...register("designation", {
                  required: "Designation is required",
                })}
                className={`appearance-none dark:text-white rounded-md relative block w-full px-3 py-2 border ${
                  errors.designation ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Designation (Full Stack Developer)"
              />
              {errors.designation && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.designation.message}
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
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
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
          <div className="mt-6">
            <button
              disabled={isLoading}
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
              }  `}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </div>
          <SocialLogin />
        </form>
      </div>
    </div>
  );
};

export default Signup;
