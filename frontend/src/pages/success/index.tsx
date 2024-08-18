import GetHead from "@/utils/Head";
import Link from "next/link";
import React from "react";

const PaymentSuccess = () => {
  return (
    <>
      <GetHead
        title="Payment success: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-green-500 text-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <p>Thank you for your purchase.</p>
          <Link href="/">
            <button className="bg-blue-500 w-full px-4 py-2 text-center rounded-md text-white mt-4">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
