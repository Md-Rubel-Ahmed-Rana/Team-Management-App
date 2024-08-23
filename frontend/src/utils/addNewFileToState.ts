const addNewFileToState = (prev: FileList, newFiles: FileList): FileList => {
  const dataTransfer = new DataTransfer();

  // Append previous files
  if (prev) {
    Array.from(prev).forEach((file) => dataTransfer.items.add(file));
  }

  // Append new files
  Array.from(newFiles).forEach((file) => dataTransfer.items.add(file));

  return dataTransfer.files;
};

export default addNewFileToState;
