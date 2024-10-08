import Stripe from "stripe";
import { config } from "dotenv";
import { Payment } from "@/models/payment.model";
import { config as envConfig } from "@/configurations/envConfig";
import { PackageService } from "./package.service";
import { IPayment, IPlanItem } from "@/interfaces/payment.interface";
config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

class Service {
  async stripeCheckout(
    items: IPlanItem[]
  ): Promise<{ sessionId: string; sessionUrl: string }> {
    const storedData = items.map((item: IPlanItem) => {
      if (item?.quantity) {
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
          unit_amount: item?.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session: any = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: storedData,
      success_url: envConfig.stripe.successUrl,
      cancel_url: envConfig.stripe.cancelUrl,
    });

    // create a notification for new payment and new package
    return { sessionId: session?.id, sessionUrl: session.url };
  }

  async createNewPayment(item: IPayment) {
    return await Payment.create(item);
  }

  async checkout(items: IPlanItem[]): Promise<{ url: string }> {
    const { sessionId, sessionUrl } = await this.stripeCheckout(items);
    // store payment data in database
    const paymentData = items.map((item: IPlanItem) => ({
      user: item?.user,
      plan: item?.id,
      paymentAmount: item?.price,
      sessionId,
      sessionUrl,
    }));

    const newPayment = await this.createNewPayment(paymentData[0]);
    await PackageService.addNewPackage(
      items[0]?.user,
      items[0]?.id,
      newPayment?._id
    );
    return { url: sessionUrl };
  }

  async makePaymentStatusSuccess(sessionId: string) {
    await Payment.updateOne(
      { sessionId: sessionId },
      { $set: { status: "success" } }
    );
  }

  async webHook(event: any) {
    switch (event.type) {
      case "checkout.session.completed":
        const payment = event.data.object;
        const sessionId = payment?.id;
        await this.makePaymentStatusSuccess(sessionId);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  async myPayments(userId: string) {
    const payments = await Payment.find({ user: userId }).populate({
      path: "plan",
      model: "Plan",
    });
    return payments;
  }
}
export const PaymentService = new Service();
