import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-green-500 text-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
        <p>Thank you for your purchase.</p>
        <Link to="/">
          <button className="bg-blue-500 w-full px-4 py-2 text-center rounded-md text-white mt-4">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
