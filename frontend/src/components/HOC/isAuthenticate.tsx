import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { useRouter } from "next/router";
import { useEffect } from "react";
import FullScreenLoader from "../shared/FullScreenLoader";

const isAuthenticate = (WrappedComponent: any) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const { data, isLoading, error }: any = useLoggedInUserQuery({});
    const user: IUser = data?.data;

    useEffect(() => {
      if (!isLoading && !user) {
        router.push("/login");
      }
    }, [isLoading, user, router]);

    if (isLoading) {
      return <FullScreenLoader />;
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-[60vh] lg:h-[80vh] w-screen bg-gray-100">
          <h1 className="text-lg lg:text-3xl font-bold">
            Your are not authenticated!
          </h1>
        </div>
      );
    }

    return user ? <WrappedComponent {...props} /> : null;
  };

  // Copy getLayout so it is not lost
  if (WrappedComponent.getLayout) {
    ComponentWithAuth.getLayout = WrappedComponent.getLayout;
  }

  return ComponentWithAuth;
};

export default isAuthenticate;
