import GetHead from "@/utils/Head";
import Link from "next/link";
import React from "react";

const PaymentCancel = () => {
  return (
    <>
      <GetHead
        title="Payment Cancel: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-500 text-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Payment Canceled</h2>
          <p className="mb-4">Your payment has been canceled.</p>

          <Link href="/">
            <button className="bg-white w-full px-4 py-2 text-center rounded-md text-black mt-4">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentCancel;
