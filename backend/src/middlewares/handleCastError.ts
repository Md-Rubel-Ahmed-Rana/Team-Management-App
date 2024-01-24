const handleCastError = (error: any) => {
  console.log("Inside Cast error handler");
  const errors = [
    {
      path: error?.path,
      message: "Invalid Id",
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Cast Error",
    errorMessages: errors,
  };
};

export default handleCastError;
