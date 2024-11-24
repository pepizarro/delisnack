"use client";
import { Lunch } from "@/db/schema";
import Image from "next/image";

import { useEffect, useState } from "react";

type Props = {
  lunches: Lunch[];
};

type CartItem = {
  id: string;
};

type CartLunch = Lunch & {
  inCart: boolean;
};

export default function LunchesHomeComponent({ lunches }: Props) {
  const [allLunches, setAllLunches] = useState<CartLunch[]>([]);

  const [search, setSearch] = useState<string>("");
  const [filteredLunches, setFilteredLunches] = useState<CartLunch[]>([]);

  useEffect(() => {
    setAllLunches(
      lunches.map((lunch) => {
        const cart = localStorage.getItem("cart");
        const cartItems: CartItem[] = cart ? JSON.parse(cart) : [];
        return {
          ...lunch,
          inCart: cartItems.some((item) => item.id === lunch.id),
        };
      }),
    );
    setFilteredLunches(
      lunches.map((lunch) => {
        const cart = localStorage.getItem("cart");
        const cartItems: CartItem[] = cart ? JSON.parse(cart) : [];
        return {
          ...lunch,
          inCart: cartItems.some((item) => item.id === lunch.id),
        };
      }),
    );
  }, [lunches]);

  useEffect(() => {
    setFilteredLunches(
      allLunches.filter((lunch) =>
        lunch.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, allLunches]);

  const addToCart = (lunch: CartLunch) => {
    const cart = localStorage.getItem("cart");
    const cartItems: CartItem[] = cart ? JSON.parse(cart) : [];

    if (!cartItems.some((item) => item.id === lunch.id)) {
      cartItems.push({ id: lunch.id });
      localStorage.setItem("cart", JSON.stringify(cartItems));

      setAllLunches(
        allLunches.map((l) => (l.id === lunch.id ? { ...l, inCart: true } : l)),
      );
    }

    const event = new CustomEvent("addedToCart");
    window.dispatchEvent(event);
  };

  filteredLunches.map((lunch) => {
    const firstImage = lunch.images[0];
    return firstImage;
  });

  return (
    <div>
      <input
        className="mb-8 px-4 py-2 w-full md:w-[450px] border-2 rounded-md border-gray-200 focus:border-purpleDark focus:outline-none"
        type="text"
        placeholder="Buscar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="w-full grid gap-x-3 gap-y-6 grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
        {filteredLunches.length > 0 &&
          filteredLunches.map((lunch) => (
            <div
              key={lunch.name}
              className="flex flex-col items-center border-2 border-gray-300 min-h-[300px] md:max-w-[400px] md:max-h-[400px] overflow-hidden rounded-xl shadow-lg xl:w-[300px] xl:h-[350px]"
            >
              <div className="h-[60%] w-full bg-gray-900">
                <Image
                  key={lunch.images[0]}
                  src={lunch.images[0]}
                  alt={lunch.name}
                  width={300}
                  height={300}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="w-full h-[40%] flex flex-col gap-1 md:gap-3 justify-around bg-white px-4 py-2">
                <div className="relative group flex flex-col gap-1">
                  <h2 className="text-lg md:text-xl font-semibold">
                    {lunch.name}
                  </h2>
                  <p className="text-gray-400 max-w-full overflow-hidden truncate">
                    {lunch.shortDescription}
                  </p>
                </div>
                <div className="flex w-full flex-row items-center justify-between">
                  <p className="text-xl font-semibold pt-1">
                    {lunch.price.toLocaleString("de-DE")}$
                  </p>
                  {lunch.inCart ? (
                    <p>En carrito</p>
                  ) : lunch.stock > 0 && lunch.available ? (
                    <button
                      className="md:h-[32px] px-3 py-1 text-center border-2 rounded-md border-purpleDark bg-purpleDark text-gray-100 hover:bg-white hover:text-purpleDark font-semibold transition duration-200"
                      onClick={() => addToCart(lunch)}
                    >
                      Reservar
                    </button>
                  ) : (
                    <p className="text-gray-400">Agotado</p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
