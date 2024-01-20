import { IPrice } from "../interfaces/price.interface";

const pricingData: IPrice[] = [
  {
    _id: "65aa9bc07eb996b412859b4e",
    plan: "Basic",
    price: 19,
    features: ["Task Management", "Basic Reporting", "5 Team Members"],
  },
  {
    _id: "65aa9bca7eb996b412842b4e",
    plan: "Pro",
    price: 39,
    features: [
      "Advanced Project Management",
      "Analytics Dashboard",
      "Unlimited Team Members",
    ],
  },
  {
    _id: "61aa4bcabeb996b412842b4e",
    plan: "Enterprise",
    price: 99,
    features: [
      "Priority Support",
      "Custom Integrations",
      "Dedicated Account Manager",
    ],
  },
];

export default pricingData;
