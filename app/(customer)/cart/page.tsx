import { Lunch } from "@/db/schema";
import CartPageClientComponent from "./cartClient";

export type CartLunch = Lunch & {
  amount: number;
};

export default async function CartPage() {
  return (
    <div className="w-full px-10 flex flex-col items-center gap-5">
      <h1 className="text-3xl font-bold text-gray-800">Carrito</h1>
      <CartPageClientComponent />
    </div>
  );
}
