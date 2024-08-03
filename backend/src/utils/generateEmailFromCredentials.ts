export const generateEmailFromCredentials = (name: string, id: string) => {
  const newEmail = name.split(" ").join("").toLowerCase() + id + "@gmail.com";
  return newEmail;
};
