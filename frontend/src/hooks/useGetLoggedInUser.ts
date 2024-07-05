import { useEffect, useState } from "react";
import { IUser, userInitData } from "@/interfaces/user.interface";

const useGetLoggedInUser = () => {
  const [user, setUser] = useState<IUser>(userInitData);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          "https://api-team-manager.onrender.com/user/auth",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log("User from useGetLoggedInUser hook", data);
        setUser(data?.data);
      } catch (error) {
        console.log("Failed to fetch user");
      }
      console.log("Will call");
    };
    fetchUser();
  }, []);

  return user;
};

export default useGetLoggedInUser;
