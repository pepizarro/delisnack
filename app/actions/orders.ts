"use server";

import { Grade, LunchPreview, Order } from "@/db/schema";
import { CartLunch } from "../(customer)/cart/page";
import { getPaymentMethod, PaymentMethods } from "@/payments/payments";
import db from "@/db/db";
import { OrderError, OrderErrorType } from "@/utils/errors";

export type OrderActionResponse = {
  // optional code
  code?: number;
  message: string;
  redirectUrl?: string;
  token?: string;
  error: boolean;
};

export async function placeOrder(
  prevState: OrderActionResponse,
  formData: FormData,
): Promise<OrderActionResponse> {
  const rawFormData = {
    name: formData.get("name") as string,
    grade: formData.get("grade"),
    total: formData.get("total"),

    lunches: formData.get("lunches"),
    paymentMethod: formData.get("paymentMethod"),
  };

  try {
    let lunches = JSON.parse(rawFormData.lunches as string);
    lunches = lunches.map((lunch: CartLunch) => {
      if (lunch.amount <= 0 || lunch.amount > lunch.stock) {
        throw new OrderError(
          `Cantidad inválida de "${lunch.name}"`,
          OrderErrorType.InvalidAmount,
        );
      }
      return {
        lunchId: lunch.id,
        name: lunch.name,
        amount: lunch.amount,
        pricePerUnit: lunch.price,
      };
    });

    console.log("lunches: ", lunches);

    const order: Order = {
      id: "",
      lunches: lunches as LunchPreview[],
      customerInfo: {
        name: rawFormData.name as string,
        grade: rawFormData.grade as Grade,
      },
      paid: false,
      paymentMethod: rawFormData.paymentMethod as PaymentMethods,
      totalPrice: Number(rawFormData.total),
      placedOrderTime: new Date(),
    };

    const orderId = await db.createOrder(order);
    const payment = getPaymentMethod(order.paymentMethod);

    const paymentUrl = await payment.createTransaction(
      orderId,
      order.totalPrice,
    );
    console.log("paymentUrl: ", paymentUrl);

    return {
      message: "",
      redirectUrl: paymentUrl.url,
      token: paymentUrl.token,
      error: false,
    };
  } catch (error) {
    if (error instanceof OrderError) {
      return {
        message: error.message,
        error: true,
      };
    }
    return {
      message: "Error generating order",
      error: true,
    };
  }
}
