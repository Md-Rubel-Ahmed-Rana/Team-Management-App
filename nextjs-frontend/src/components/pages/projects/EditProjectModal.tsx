import React, {  Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateProjectMutation } from "@/features/project";
import { IProject } from "@/interfaces/project.interface";

const EditProjectModal = ({ isEdit, setIsEdit, project }: any) => {
  const { register, handleSubmit } = useForm<Partial<IProject>>({
    mode: "onChange",
  });
  const closeModal = () => {
    setIsEdit(false);
  };
  const [updateProject] = useUpdateProjectMutation();

  const handleEditProject: SubmitHandler<Partial<IProject>> = async (data) => {
    const result: any = await updateProject({
      id: project._id,
      data,
    });
    if (result?.data?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      closeModal();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        text: result?.data?.message,
        showConfirmButton: true,
      });
      closeModal();
    }
  };

  return (
    <Transition appear show={isEdit} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-25" />
        </Transition.Child>

        <div className=" fixed inset-0 flex flex-col items-center justify-center">
          <div className="p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="lg:w-[400px] mx-auto transform rounded-xl bg-orange-50 p-6 text-left  shadow-xl transition-all relative">
                <div className="mt-3">
                  <form onSubmit={handleSubmit(handleEditProject)}>
                    <h3 className="text-xl font-bold mb-5">Edit Project</h3>

                    <div className="relative w-full py-2">
                      <p className="text-stone-500 mb-2">Name</p>
                      <input
                        {...register("name", { required: true })}
                        required
                        type="text"
                        id="name"
                        defaultValue={project?.name}
                        className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-3 outline-none px-2 shadow-sm sm:text-sm"
                      />
                    </div>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 mb-2">Category</p>
                      <input
                        {...register("category", { required: true })}
                        required
                        type="text"
                        id="category"
                        defaultValue={project?.category}
                        className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-3 outline-none px-2 shadow-sm sm:text-sm"
                      />
                    </div>

                    <div className="mt-5 lg:flex justify-between">
                      <button
                        onClick={closeModal}
                        type="button"
                        className="border-2 mb-4 lg:mb-0 mx-auto outline-none border-black rounded-full px-10 py-2  text-sm flex items-center gap-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="border mx-auto outline-none rounded-full px-10 py-2 bg-blue-700 text-white text-md flex items-center gap-2"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditProjectModal;
