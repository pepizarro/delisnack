import type { Metadata } from "next";
//import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";

import logo from "@/public/logo.png";
import { CartComponent } from "./cart/cart";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Delisnack",
  description: "Tienda Delisnack",
};

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={poppins.className}>
      <body className={poppins.className}>
        <div className="w-full flex flex-row bg-white items-center justify-between border-b border-gray-300 mb-10 px-4">
          <div className="flex flex-row gap-5 items-center justify-start">
            <Link href="/" className="hover:cursor-pointer">
              <Image src={logo} alt="logo" width={120} />
            </Link>
          </div>
          <CartComponent />
        </div>
        {children}
      </body>
    </html>
  );
}
