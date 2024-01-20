import Stripe from "stripe";
import { config } from "dotenv";
config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const checkout = async (items: any) => {
  console.log(process.env.STRIPE_SECRET_KEY);
  const storedData = items.map((item: any) => {
    if (item.quantity) {
      item.quantity = item.quantity >= 1 ? item.quantity : 1;
    } else {
      item.quantity = 1;
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.payment_amount * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: storedData,
    success_url: process.env.SUCCESS_URL as string,
    cancel_url: process.env.CANCEL_URL as string,
  });

  // store payment data in database

  return { url: session.url };
};

const webHook = (event: any) => {
  switch (event.type) {
    case "checkout.session.completed":
      const payment = event.data.object;
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

export const PaymentService = {
  checkout,
  webHook,
};
