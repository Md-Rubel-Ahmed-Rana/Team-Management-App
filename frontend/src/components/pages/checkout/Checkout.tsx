import { useCheckoutMutation } from "@/features/payment";
import { useGetSinglePricingQuery } from "@/features/pricing";
import { useLoggedInUserQuery } from "@/features/user";
import { IPrice } from "@/interfaces/price.interface";
import { IUser } from "@/interfaces/user.interface";
import { useRouter } from "next/router";
import React from "react";

const CheckoutPage = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { query } = useRouter();
  const { data: pricingData } = useGetSinglePricingQuery(query?.id);
  const paymentData: IPrice = pricingData?.data;
  const [checkout, { isLoading }] = useCheckoutMutation();

  const payment = [
    {
      user: user?.id,
      quantity: 1,
      package: query?.id,
    },
  ];

  const handleCheckout = async () => {
    const result: any = await checkout(payment);
    if (result?.data?.data?.url) {
      window.open(result?.data?.data?.url);
    }
  };

  return (
    <div className="container mx-auto py-20">
      <div className="w-2/3 mx-auto  p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Thanks for checkout
        </h2>
        <div className="lg:flex gap-10 py-10 w-full">
          <div className="mb-4 w-1/2">
            <h3 className="text-xl font-bold">User Information</h3>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>User ID: {user?.id}</p>
          </div>
          <div className="mb-4 w-1/2">
            <h3 className="text-xl font-bold">Payment Information</h3>
            <p>Plan: {paymentData?.plan}</p>
            <p>Price: ${paymentData?.price}/month</p>
            <p>Features: {paymentData?.features.join(", ")}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            disabled={isLoading}
            onClick={handleCheckout}
            className="bg-blue-500 w-1/2 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            {isLoading ? "Processing" : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
