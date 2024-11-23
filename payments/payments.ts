import { WebPay } from "./webpay/webpay";

export enum PaymentMethods {
  Webpay = "webpay",
}

export interface Payments {
  createTransaction(
    orderId: string,
    amount: number,
  ): Promise<{ url: string; token: string }>;
  confirmTransaction(orderId: string, token: string): Promise<boolean>;
  checkTransaction(token: string): Promise<boolean>;
}

const webpayPayments = new WebPay() as Payments;

export function getPaymentMethod(method: PaymentMethods): Payments {
  switch (method) {
    case PaymentMethods.Webpay:
      return webpayPayments;
    default:
      throw new Error("Invalid payment method");
  }
}
