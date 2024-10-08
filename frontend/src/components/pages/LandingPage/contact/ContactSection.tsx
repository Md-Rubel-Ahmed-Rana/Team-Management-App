import { useSendContactEmailMutation } from "@/features/mail";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

const ContactSection = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [sendEmail] = useSendContactEmailMutation();

  const handleSendEmail: SubmitHandler<Inputs> = async (data) => {
    const result: any = await sendEmail(data);
    if (result?.data?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thanks for contact",
        text: result?.data?.message,
        timer: 2000,
        showConfirmButton: true,
        confirmButtonText: "Okay",
      });
      reset();
    }
    if (result?.error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Thanks for contact",
        text: result?.error?.data?.message,
        timer: 2000,
        showConfirmButton: true,
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <section className="py-16 px-2 lg:px-5 text-center">
      <h2 className="text-xl lg:text-3xl font-bold mb-2">Contact Us</h2>
      <p className="text-sm lg:text-lg mb-8">
        Have questions or need assistance? Reach out to our team for support.
      </p>
      <div className="max-w-md mx-auto bg-white p-2 lg:p-5 rounded-md ">
        <form onSubmit={handleSubmit(handleSendEmail)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-start"
            >
              Your Name
            </label>
            <input
              required
              {...register("name", { required: true })}
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 w-full border rounded-md bg-white text-gray-800"
              placeholder="Enter your professional name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-start"
            >
              Your Email
            </label>
            <input
              required
              {...register("email", { required: true })}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your official email"
              className="mt-1 p-2 w-full border rounded-md bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-start"
            >
              Your Message
            </label>
            <textarea
              required
              {...register("message", { required: true })}
              id="message"
              name="message"
              rows={4}
              placeholder="Write your respective message here..."
              className="mt-1 p-2 w-full border rounded-md bg-white text-gray-800"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full lg:w-auto text-white py-2 px-4 rounded-full hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
