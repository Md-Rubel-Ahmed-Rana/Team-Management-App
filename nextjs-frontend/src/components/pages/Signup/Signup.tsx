import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/router";
import { IUser } from "@/interfaces/user.interface";
import { useCreateUserMutation } from "@/features/user";
import useUploadFile from "@/hooks/useUploadFile";
import GoogleLogin from "@/components/shared/GoogleLogin";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();
  const router = useRouter();
  const [createUser] = useCreateUserMutation();
  const [profilePicture, setProfilePicture] = useState("");

  const handleRegister: SubmitHandler<IUser> = async (data) => {
    data.profile_picture = profilePicture;
    const result: any = await createUser(data);
    if (result?.data?.success) {
      if (result?.data?.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: result?.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/login");
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: result?.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const uploadFile = useUploadFile();

  const handleFileChange = async (e: any) => {
    const selectedFile = e.target.files[0];
    const uploadedFile: any = await uploadFile(selectedFile);
    setProfilePicture(uploadedFile?.url);
  };

  return (
    <div className="flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[620px] w-full">
        <form
          className="shadow-2xl lg:px-10 px-5 py-5 rounded-md"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div>
            <h2 className="mb-4 text-center lg:text-3xl text-xl leading-9 font-extrabold">
              Create account
            </h2>
          </div>
          <div className="lg:flex lg:flex-wrap w-full gap-5">
            <div className="rounded-md shadow-sm lg:w-1/2 w-full">
              <div>
                <label htmlFor="username">Name</label>
                <input
                  aria-label="name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.name.message}
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
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
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
            <div className="rounded-md shadow-sm lg:w-1/2 w-full mt-4 lg:mt-0">
              <div>
                <label htmlFor="username">Email</label>
                <input
                  aria-label="email"
                  type="text"
                  {...register("email", { required: "email is required" })}
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.email.message}
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
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
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
              <div className="my-5">
                <label htmlFor="profile_picture">Profile Picture</label>
                <input
                  aria-label="Profile Image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    errors.profile_picture
                      ? "border-red-500"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 dark:bg-gray-600 dark:hover:bg-gray-700 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
            >
              Sign up
            </button>
          </div>
          <GoogleLogin />
        </form>
      </div>
    </div>
  );
};

export default Signup;
