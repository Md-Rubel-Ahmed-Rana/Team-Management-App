import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  email: string;
};

const ForgetPasswordPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });
  const handleSubmitEmail: SubmitHandler<FormData> = (data) => {
    router.push("/reset-password");
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-gray-50 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <p className="mb-4 text-gray-600">
          Enter your email to reset your password.
        </p>
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
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full  text-white py-2 px-4 rounded  bg-blue-500 hover:bg-blue-600`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
