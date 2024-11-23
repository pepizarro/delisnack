import db from "@/db/db";
import { Payments } from "../payments";
import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  WebpayPlus,
} from "transbank-sdk";

export class WebPay implements Payments {
  private options: Options;

  constructor() {
    //this.commerceCode = commerceCode;
    //this.apiKey = apiKey;
    this.options = new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration,
    );
  }
  async createTransaction(
    orderId: string,
    amount: number,
  ): Promise<{ url: string; token: string }> {
    try {
      const tx = new WebpayPlus.Transaction(this.options);
      const response = await tx.create(
        orderId,
        "session-id",
        amount,
        `http://localhost:3000/success/${orderId}`,
      );
      return { url: response.url, token: response.token };
    } catch (error) {
      console.error("error creating transaction: ", error);
      throw new Error("Error creating transaction");
    }
  }

  async confirmTransaction(orderId: string, token: string): Promise<boolean> {
    try {
      const tx = new WebpayPlus.Transaction(this.options);
      const response = await tx.commit(token);
      if (response.status !== "AUTHORIZED") {
        return false;
      }

      await db.updateOrder(orderId, "paid", true);

      return true;
    } catch (error) {
      console.error("error confirming transaction: ", error);
      return false;
    }
  }
  async checkTransaction(token: string): Promise<boolean> {
    try {
      const tx = new WebpayPlus.Transaction(this.options);
      await tx.status(token);
      return true;
    } catch (error) {
      console.error("error checking transaction: ", error);
      throw new Error("Error checking transaction");
    }
  }
}
