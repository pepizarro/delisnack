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

type LunchPreview = {
  lunchId: string;
  name: string;
  quantity: number;
  pricePerUnit: number;
};

enum Grade {
  "1ro básico",
  "2do básico",
  "3ro básico",
  "4to básico",
  "5to básico",
  "6to básico",
  "7mo básico",
  "8vo básico",
  "1ro medio",
  "2do medio",
  "3ro medio",
  "4to medio",
}

export type Reservation = {
  lunches: LunchPreview[];
  customerInfo: {
    name: string;
    grade: Grade;
  };
  paid: boolean;
  totalPrice: number;
  reservationTime: Date;
};
