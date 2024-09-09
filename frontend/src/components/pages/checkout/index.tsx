import CheckoutSkeleton from "@/components/skeletons/CheckoutSkeleton";
import { useCheckoutMutation } from "@/features/payment";
import { useGetSinglePricingQuery } from "@/features/pricing";
import { useLoggedInUserQuery } from "@/features/user";
import { IPlanItem } from "@/interfaces/payment.interface";
import { IPrice } from "@/interfaces/price.interface";
import { IUser } from "@/interfaces/user.interface";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const { query } = useRouter();
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: pricingData, isLoading: isPlanLoading } =
    useGetSinglePricingQuery(query?.id);
  const plan = pricingData?.data as IPrice;
  const [checkout, { isLoading: checkoutLoading }] = useCheckoutMutation();

  const DISCOUNT_PERCENT = 5; // 5%
  const VAT_PERCENT = 0.5; // 0.5%
  const TAX_PERCENT = 1; // 1%

  const calculatedPricing = useMemo(() => {
    const price = pricingData?.data?.price || 0;

    const discount = (DISCOUNT_PERCENT / 100) * price;
    const priceAfterDiscount = price - discount;

    const vat = (VAT_PERCENT / 100) * priceAfterDiscount;
    const tax = (TAX_PERCENT / 100) * priceAfterDiscount;

    const subtotal = priceAfterDiscount + vat + tax;

    return {
      discount: discount.toFixed(2),
      priceAfterDiscount: priceAfterDiscount.toFixed(2),
      vat: vat.toFixed(2),
      tax: tax.toFixed(2),
      subtotal: subtotal.toFixed(2),
    };
  }, [pricingData]);

  const handleCheckout = async () => {
    const payment: IPlanItem[] = [
      {
        id: plan.id,
        user: user.id,
        name: plan.plan,
        price: Number(calculatedPricing.subtotal),
        quantity: 1,
      },
    ];
    const result: any = await checkout(payment);
    if (result?.data?.data?.url) {
      window.location.href = result?.data?.data?.url;
    }
    if (result?.error) {
      toast.error(result?.error?.data?.message);
    }
  };

  return (
    <div className="container mx-auto my-20">
      <h2 className="text-3xl font-bold text-center mb-8">
        Confirm Your Purchase
      </h2>
      {!isPlanLoading ? (
        <div className="max-w-[1000px] w-full mx-auto">
          <CheckoutSkeleton />
        </div>
      ) : (
        <div className="flex justify-center flex-col lg:flex-row shadow-md max-w-[1000px] w-full mx-auto bg-gray-100 p-4">
          {/* Product Info Section */}
          <div className="w-full lg:w-1/2 p-4 lg:border-r-2 flex flex-col gap-2">
            <h3 className="text-xl font-semibold mb-4">Product info</h3>
            <p>
              <strong>Name:</strong> Plan Package
            </p>
            <p>
              <strong>Type:</strong> {plan.plan}
            </p>
            <p>
              <strong>Price:</strong> ${plan?.price}
            </p>
            <p>
              <strong>Plan duration:</strong> 1 month
            </p>
            <p>
              <strong>Renew:</strong> After 1 month
            </p>
            <p>
              <strong>Renew type:</strong> Manual
            </p>
            <p className="mt-4">
              <strong>What you will get:</strong>
            </p>
            <ul className="list-disc pl-5">
              {plan?.features?.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          {/* Payment Info Section */}
          <div className="w-full lg:w-1/2 p-4 border-t-2 lg:border-t-0 flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-semibold mb-4">Payment info</h3>
              <p>
                <strong>Product Price:</strong> ${plan?.price}
              </p>
              <p>
                <strong>Discount:</strong> 5% (-${calculatedPricing.discount})
              </p>
              <p>
                <strong>Price After Discount:</strong> $
                {calculatedPricing.priceAfterDiscount}
              </p>
              <p>
                <strong>VAT:</strong> 0.5% (${calculatedPricing.vat})
              </p>
              <p>
                <strong>Tax:</strong> 1% (${calculatedPricing.tax})
              </p>
              <p>
                <strong>Subtotal:</strong> ${calculatedPricing.subtotal}
              </p>
              <p>
                <strong>Total:</strong> ${calculatedPricing.subtotal}
              </p>
            </div>
            {/* Checkout Button */}
            {user && user?.id ? (
              <button
                disabled={checkoutLoading}
                onClick={handleCheckout}
                className="mt-8 w-full bg-blue-500  hover:bg-blue-600 text-white py-2 rounded-lg text-lg transition duration-300 ease-in-out"
              >
                {checkoutLoading ? "Processing..." : "Go To Checkout"}
              </button>
            ) : (
              <Link
                href={"/login"}
                className="mt-8 w-full text-center bg-blue-500  hover:bg-blue-600 text-white py-2 rounded-lg text-lg transition duration-300 ease-in-out"
              >
                Login to Proceed
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
