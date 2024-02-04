import { useState } from "react";

const LinkModal = ({ isOpen, onClose, onSubmit }: any) => {
  const [link, setLink] = useState("");
  const [isValidLink, setIsValidLink] = useState(true);

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLink = e.target.value;
    setLink(newLink);
    validateLink(newLink);
  };

  const validateLink = (value: string) => {
    const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    setIsValidLink(linkRegex.test(value));
  };

  const handleSubmit = () => {
    if (isValidLink) {
      onSubmit(link);
      onClose();
    }
  };

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="relative z-50 bg-white  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-white dark:bg-gray-800 p-4">
            <span
              onClick={onClose}
              className="cursor-pointer absolute top-0 right-0 p-4"
            >
              <svg
                className="h-6 w-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
            <label className="block mb-2">
              Enter Link:
              <input
                type="text"
                value={link}
                onChange={handleLinkChange}
                className={`border p-2 w-full mt-2 ${
                  isValidLink ? "" : "border-red-500"
                }`}
              />
            </label>
            {!isValidLink && (
              <p className="text-red-500 text-sm mb-2">
                Please enter a valid link.
              </p>
            )}
            <button
              disabled={!isValidLink}
              onClick={handleSubmit}
              className={`bg-blue-500 text-white py-2 px-6 rounded-md ${
                !isValidLink && "cursor-not-allowed"
              }`}
            >
              Add Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
