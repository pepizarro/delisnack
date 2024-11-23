import Image from "next/image";
import Link from "next/link";
import "../globals.css";
import logo from "@/public/logo.png";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={poppins.className}>
      <body className={poppins.className}>
        <div className="w-full flex flex-row bg-white items-center justify-between border-b border-gray-300 mb-10 px-4">
          <div className="flex flex-row gap-5 items-center justify-start">
            <Link href="/" className="hover:cursor-pointer">
              <Image src={logo} alt="logo" width={120} />
            </Link>
            <Link className="font-semibold" href="/admin/">
              Órdenes
            </Link>

            <Link className="font-semibold" href="/admin/lunches">
              Almuerzos
            </Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
