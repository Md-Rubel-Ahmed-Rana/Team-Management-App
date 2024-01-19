import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateUserMutation } from "../../features/user/userApi";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import LoginLogo from "../../assets/login.png";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import { AppDispatch } from "../../app/store";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result: any = await dispatch(loginUser(data));
    console.log(result);
    if (result?.payload?.data?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.payload?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard");
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: result?.payload?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <form
          className="shadow-2xl px-10 py-5 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="text-center">
              <img className="mx-auto w-20" src={LoginLogo} alt="" />
            </div>
            <h2 className="mb-4 font-semibold text-center text-3xl leading-9 text-gray-900">
              Welcome<strong> Back!</strong>
            </h2>
          </div>
          <div className="rounded-md shadow-sm">
            <div className="my-5">
              <label htmlFor="email">Email</label>
              <input
                aria-label="Email address"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
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
            <div className="-mt-px">
              <label htmlFor="password">Password</label>
              <input
                aria-label="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="text-center my-4">
            <button className="outline-none" type="button">
              Forget password?
            </button>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
            >
              Continue
            </button>
          </div>
          <div className="text-center my-3">
            <p>
              Don't have an account?{" "}
              <Link className="text-blue-400" to="/signup">
                Sign up
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
