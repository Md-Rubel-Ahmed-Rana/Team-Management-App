import { useMyPaymentsQuery } from "@/features/payment";
import { useLoggedInUserQuery } from "@/features/user";
import { IPayment } from "@/interfaces/payment.interface";
import { IUser } from "@/interfaces/user.interface";
import React from "react";

const PaymentPage = () => {
  const { data: userData }: any = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data } = useMyPaymentsQuery(user._id);
  const payments: IPayment[] = data?.data;

  return (
    <div className="mx-auto bg-white p-8">
      <div>
        <h3 className="text-xl font-bold mb-4">Payment History</h3>
        {payments?.map((payment: IPayment) => (
          <div key={payment._id} className="shadow-md p-4 rounded-md mb-4">
            <p>
              <span className="font-bold">Plan:</span> {payment?.package?.plan}
            </p>
            <p>
              <span className="font-bold">Price:</span> $
              {payment?.package?.price}/month
            </p>
            <p>
              <span className="font-bold">Features:</span>{" "}
              {payment?.package?.features?.join(", ")}
            </p>
            <p>
              <span className="font-bold">Date:</span> {payment?.createdAt}
            </p>
            <p>
              <span className="font-bold">Status: </span>
              <span className="capitalize">{payment?.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPage;
