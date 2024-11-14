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

  constructor(commerceCode: string, apiKey: string) {
    //this.commerceCode = commerceCode;
    //this.apiKey = apiKey;
    console.log(commerceCode, apiKey);
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
        `https://localhost:3000/success/${orderId}`,
      );
      console.log("response from webpay transaction: ", response);
      return { url: response.url, token: response.token };
    } catch (error) {
      console.log("error creating transaction: ", error);
      throw new Error("Error creating transaction");
    }
  }
}
