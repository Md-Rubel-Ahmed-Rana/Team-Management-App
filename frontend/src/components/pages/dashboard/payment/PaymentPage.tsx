import PaymentSkeleton from "@/components/skeletons/PaymentSkeleton";
import { useMyPaymentsQuery } from "@/features/payment";
import { useLoggedInUserQuery } from "@/features/user";
import { IPayment } from "@/interfaces/payment.interface";
import { IUser } from "@/interfaces/user.interface";
import React from "react";

const Payments = () => {
  const { data: userData }: any = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data, isLoading } = useMyPaymentsQuery(user?.id);
  const payments: IPayment[] = data?.data;

  return (
    <div className="w-[76vw]">
      <h3 className="text-xl font-bold mb-4">Payment History</h3>
      {isLoading ? (
        <PaymentSkeleton />
      ) : (
        <>
          {payments.length > 0 ? (
            <div className="flex-grow h-screen overflow-y-auto pb-20 w-full">
              {payments?.map((payment: IPayment) => (
                <>
                  <div key={payment?.id}>
                    <p>
                      <span className="font-bold">Plan:</span>{" "}
                      {payment?.package?.plan}
                    </p>
                    <p>
                      <span className="font-bold">Price:</span> $
                      {payment?.package?.price}
                      /month
                    </p>
                    <p>
                      <span className="font-bold">Features:</span>{" "}
                      {payment?.package?.features?.join(", ")}
                    </p>
                    <p>
                      <span className="font-bold">Date:</span>{" "}
                      {payment?.createdAt}
                    </p>
                    <p>
                      <span className="font-bold">Status: </span>
                      <span className="capitalize">{payment?.status}</span>
                    </p>
                  </div>
                  <hr className="my-3 border-2" />
                </>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-full w-full">
              <h3>No payment history found!</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Payments;
