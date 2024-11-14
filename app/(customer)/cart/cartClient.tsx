"use client";

import { useEffect, useState } from "react";
import { CartItem } from "./cart";
import Image from "next/image";
import { Minus, Plus, Thrash } from "@/app/icons";
import CheckoutComponent from "./checkout";
import { CartLunch } from "./page";

const getLunch = (id: string) =>
  fetch("/api/lunches/" + id).then((res) => res.json());

export default function CartPageClientComponent() {
  const [cartItems, setCartItems] = useState<CartLunch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCartItems([]);
    const fetchCartItems = async () => {
      const cart = localStorage.getItem("cart");
      const cartIds: CartItem[] = cart ? JSON.parse(cart) : [];
      //async function fetchLunches(id: string) {
      //  const res = await fetch("/api/lunches/" + id);
      //  const data = await res.json();
      //  console.log("data: ", data);
      //  setCartItems((prev) => [...prev, data]);
      //}

      const requests = [];
      for (let i = 0; i < cartIds.length; i++) {
        requests.push(getLunch(cartIds[i].id));
      }
      try {
        const items = await Promise.all([...requests]);
        console.log("items: ", items);
        for (let i = 0; i < items.length; i++) {
          if (items[i].stock <= 0) {
            items[i].amount = 0;
            items[i].available = false;
          } else {
            items[i].amount = 1;
          }
        }
        setCartItems(items);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  const handleAdd = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.stock - item.amount > 0
          ? { ...item, amount: item.amount + 1 }
          : item,
      ),
    );
  };

  const handleRemove = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item,
      ),
    );
  };

  const handleDelete = (id: string) => {
    const cart = localStorage.getItem("cart");
    const cartIds: CartItem[] = cart ? JSON.parse(cart) : [];
    const newCart = cartIds.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));

    const event = new CustomEvent("removedFromCart");
    window.dispatchEvent(event);

    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (isLoading) return <p>Cargando...</p>;

  if (!cartItems.length) return <p>No hay productos en el carrito</p>;

  return (
    <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-5">
      <div className="bg-white shadow-md shadow-gray-100 rounded-md p-10 ">
        <div className="min-w-[300px]">
          <h2 className="font-semibold text-xl mb-5 text-gray-800">
            Productos
          </h2>
          <div className="flex flex-col gap-5">
            {cartItems.map((item) => (
              <div key={item.id}>
                <div className="flex flex-row gap-3">
                  <div className="w-[80px] h-[80px] overflow-hidden rounded-lg">
                    <Image
                      key={item.images[0]}
                      src={item.images[0]}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1 group">
                    <p className="font-semibold text-gray-700 text-lg">
                      {item.name}
                    </p>
                    <div className="flex flex-row items-center gap-3">
                      <div className="flex flex-row gap-3 w-[110px] px-3 py-[6px] items-center justify-around border-2 border-gray-300 rounded-lg">
                        <button onClick={() => handleRemove(item.id)}>
                          <Minus className="fill-gray-600" w={12} h={12} />
                        </button>
                        <p className="text-sm text-center">{item.amount}</p>
                        <button onClick={() => handleAdd(item.id)}>
                          <Plus className="fill-gray-600" w={12} h={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <Thrash
                          className="fill-red-400 hover:fill-red-600 hidden group-hover:block"
                          w={18}
                          h={18}
                        />
                      </button>
                    </div>
                    {item.available ? (
                      <p className="text-gray-700 font-bold">
                        ${(item.price * item.amount).toLocaleString("de-DE")}
                      </p>
                    ) : (
                      <p className="text-red-500 font-bold">No disponible</p>
                    )}
                  </div>
                </div>
                {cartItems[cartItems.length - 1] !== item && (
                  <hr className="border-gray-200 mt-5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <CheckoutComponent cartItems={cartItems} />
    </div>
  );
}
