import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { useEffect } from "react";
import { loggedinUser, setCurrentUser } from "./features/user/userSlice";
import { useDispatch } from "react-redux";

import { AppDispatch } from "./app/store";
import SocketProvider from "./context/SocketContext";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchUser = async () => {
      const user: any = await dispatch(loggedinUser());
      if (user?.payload?.data?.success) {
        dispatch(setCurrentUser(user?.payload?.data?.data));
      }
      if (!user?.payload?.data?.success) {
        fetch("https://little-programmer.vercel.app/auth/login/success", {
          method: "GET",
          credentials: "include",
        })
          .then((response) => {
            if (response.status === 200) return response.json();
            throw new Error("authentication has been failed!");
          })
          .then((resObject) => {
            dispatch(
              setCurrentUser({
                username: resObject?.user?.displayName,
                email: null,
                role: "user",
              })
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="lg:w-[1280px] mx-auto">
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </div>
  );
}

export default App;
