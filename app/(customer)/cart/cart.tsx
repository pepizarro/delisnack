"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type CartItem = {
  id: string;
};

export function cleanCart() {
  localStorage.removeItem("cart");
}

export function CartComponent() {
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    const cartItems: CartItem[] = cart ? JSON.parse(cart) : [];
    setCartCount(cartItems.length);

    const handleCartAdded = () => {
      const cart = localStorage.getItem("cart");
      const cartItems: CartItem[] = cart ? JSON.parse(cart) : [];
      setCartCount(cartItems.length);
    };

    const handleCartRemoved = () => {
      const cart = localStorage.getItem("cart");
      const cartItems: CartItem[] = cart ? JSON.parse(cart) : [];
      setCartCount(cartItems.length);
    };

    window.addEventListener("addedToCart", handleCartAdded);
    window.addEventListener("removedFromCart", handleCartRemoved);

    return () => {
      window.removeEventListener("addedToCart", handleCartAdded);
      window.removeEventListener("removedFromCart", handleCartRemoved);
    };
  }, []);

  return (
    <Link href="/cart" className="hover:cursor-pointer relative">
      {cartCount > 0 && (
        <div className="absolute -top-2 right-4 w-[20px] h-[20px] grid place-items-center bg-red-500 rounded-full">
          <p className="text-white text-xs">{cartCount}</p>
        </div>
      )}
      <svg
        fill="#000000"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        width="25px"
        viewBox="0 0 902.86 902.86"
      >
        <g>
          <g>
            <path
              d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
                         M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"
            />
            <path
              d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
                        c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
                        c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
                        C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
                        c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
                         M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
                        S619.162,694.432,619.162,716.897z"
            />
          </g>
        </g>
      </svg>
    </Link>
  );
}
