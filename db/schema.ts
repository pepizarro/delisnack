import { PaymentMethods } from "@/payments/payments";

export type Lunch = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  available: boolean;
  stock: number;
  images: string[];
};

export type LunchPreview = {
  lunchId: string;
  name: string;
  amount: number;
  pricePerUnit: number;
};

export enum Grade {
  B1 = "1ro básico",
  B2 = "2do básico",
  B3 = "3ro básico",
  B4 = "4to básico",
  B5 = "5to básico",
  B6 = "6to básico",
  B7 = "7mo básico",
  B8 = "8vo básico",
  M1 = "1ro medio",
  M2 = "2do medio",
  M3 = "3ro medio",
  M4 = "4to medio",
}

export type Order = {
  id: string;
  lunches: LunchPreview[];
  customerInfo: {
    name: string;
    grade: Grade;
  };
  paid: boolean;
  paymentMethod: PaymentMethods;
  paymentToken?: string;
  totalPrice: number;
  placedOrderTime: Date;
};
