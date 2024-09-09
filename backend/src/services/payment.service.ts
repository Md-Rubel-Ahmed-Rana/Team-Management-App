import Stripe from "stripe";
import { config } from "dotenv";
import { Plan } from "@/models/plan.model";
import { Payment } from "@/models/payment.model";
import { config as envConfig } from "@/configurations/envConfig";
import { PackageService } from "./package.service";
config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

class Service {
  async checkout(items: any) {
    const plan = await Plan.findById(items[0].package);
    const storedData = items.map((item: any) => {
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: storedData,
      success_url: envConfig.stripe.successUrl,
      cancel_url: envConfig.stripe.cancelUrl,
    });

    // store payment data in database
    const paymentData = items.map((item: any) => ({
      user: item.user,
      package: item?.package,
      sessionId: session?.id,
      sessionUrl: session?.url,
    }));

    console.log({ paymentData });

    const newPayment: any = await Payment.create(paymentData);
    console.log({ newPayment });
    const newPackage = await PackageService.addNewPackage(
      items[0]?.user,
      plan?.id,
      newPayment[0]?._id
    );
    console.log({ newPackage });

    // create a notification for new payment and new package

    return { url: session.url };
  }

  async makePaymentStatusSuccess(sessionId: string) {
    await Payment.findOne({ sessionId: sessionId }, { status: "success" });
  }

  async webHook(event: any) {
    switch (event.type) {
      case "checkout.session.completed":
        const payment = event.data.object;
        const sessionId = payment?.id;
        await this.makePaymentStatusSuccess(sessionId);
        // make the payment status as success
        console.log(
          "Received payment data from webhook as completed event",
          payment
        );
        break;
      case "checkout.session.async_payment_failed":
        const paymentFailed = event.data.object;
        console.log("Payment failed", paymentFailed);
        break;
      case "checkout.session.async_payment_succeeded":
        const AsyncPaymentSucceeded = event.data.object;
        console.log("Async payment succeed", AsyncPaymentSucceeded);
        break;
      case "checkout.session.expired":
        const checkoutSessionExpired = event.data.object;
        console.log("Payment time expired", checkoutSessionExpired);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  async myPayments(userId: string) {
    const payments = await Payment.find({ user: userId }).populate({
      path: "package",
      model: "Plan",
    });

    return payments;
  }
}
export const PaymentService = new Service();
