// DashboardPage.tsx
import React from "react";
const paymentHistory = [
  {
    plan: "Basic",
    price: 19,
    features: ["Task Management", "Basic Reporting", "5 Team Members"],
    date: "2024-01-25",
  },
  {
    plan: "Pro",
    price: 39,
    features: [
      "Advanced Project Management",
      "Analytics Dashboard",
      "Unlimited Team Members",
    ],
    date: "2024-02-15",
  },
];
const PaymentPage = () => {
  return (
    <div className="mx-auto bg-white p-8">
      <div>
        <h3 className="text-xl font-bold mb-4">Payment History</h3>
        {paymentHistory.map((payment, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md mb-4">
            <p>
              <span className="font-bold">Plan:</span> {payment.plan}
            </p>
            <p>
              <span className="font-bold">Price:</span> ${payment.price}/month
            </p>
            <p>
              <span className="font-bold">Features:</span>{" "}
              {payment.features.join(", ")}
            </p>
            <p>
              <span className="font-bold">Date:</span> {payment.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPage;
