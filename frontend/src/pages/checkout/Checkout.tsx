import React from "react";
import { useLoggedInUserQuery } from "../../features/user/userApi";
import { useParams } from "react-router-dom";
import pricingData from "../../constants/pricingData";
import { IPrice } from "../../interfaces/price.interface";

const CheckoutPage = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user = userData?.data;
  const { id } = useParams();
  const paymentData = pricingData.find((data: IPrice) => data._id === id);

  return (
    <div className="container mx-auto py-20">
      <div className="w-2/3 mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Thanks for checkout
        </h2>
        <div className="lg:flex gap-10 py-10 w-full">
          <div className="mb-4 w-1/2">
            <h3 className="text-xl font-bold">User Information</h3>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>User ID: {user._id}</p>
          </div>
          <div className="mb-4 w-1/2">
            <h3 className="text-xl font-bold">Payment Information</h3>
            <p>Plan: {paymentData?.plan}</p>
            <p>Price: ${paymentData?.price}/month</p>
            <p>Features: {paymentData?.features.join(", ")}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-500 w-1/2 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
