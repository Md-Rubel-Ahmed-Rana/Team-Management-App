import { useForgetPasswordMutation } from "@/features/user";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

type FormData = {
  email: string;
};

const ForgetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const router = useRouter();
  const handleSubmitEmail: SubmitHandler<FormData> = async (data) => {
    const res: any = await forgetPassword(data);
    if (res?.data?.statusCode === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Reset email was sent!",
        text: res?.data?.message,
        showConfirmButton: true,
      });
      router.push("/");
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong!",
        text: res?.error?.data?.message,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };
  return (
    <div className="h-screen flex items-center justify-center p-5">
      <div className="dark:bg-gray-700 bg-gray-100 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <p className="mb-4">Enter your email to reset your password.</p>
        <form onSubmit={handleSubmit(handleSubmitEmail)}>
          <div className="mb-4">
            <input
              autoFocus
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
              } placeholder-gray-500 bg-white text-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className={`w-full  text-white py-2 px-4 rounded ${
              isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } `}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
