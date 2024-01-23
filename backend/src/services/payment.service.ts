import Stripe from "stripe";
import { config } from "dotenv";
import { Payment } from "../models/payment.model";
import { Plan } from "../models/plan.model";
config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

class Service {
  public async checkout(items: any) {
    const plan = await Plan.findById(items[0].package);
    const storedData = items.map((item: any) => {
      console.log(item);
      if (item?.quantity) {
        item.quantity = item.quantity >= 1 ? item.quantity : 1;
      } else {
        item.quantity = 1;
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: plan?.plan,
          },
          unit_amount: plan && plan?.price * 100,
        },
        quantity: item.quantity,
      };
    });

    console.log({ storedData });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: storedData,
      success_url: process.env.SUCCESS_URL as string,
      cancel_url: process.env.CANCEL_URL as string,
    });

    // store payment data in database
    const paymentData = items.map((item: any) => ({
      userId: item.userId,
      package: item.package,
      sessionId: session?.id,
    }));

    await Payment.create(paymentData);

    return { url: session.url };
  }

  public async webHook(event: any) {
    switch (event.type) {
      case "checkout.session.completed":
        const payment = event.data.object;
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  public async myPayments(userId: string) {
    const payments = await Payment.find({ userId }).populate({
      path: "package",
      model: "Plan",
    });
    return payments;
  }
}
export const PaymentService = new Service();
