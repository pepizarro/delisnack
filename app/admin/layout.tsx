import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logo.png";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="lunches-layout">
      <div className="w-full flex flex-row bg-white items-center justify-between border-b border-gray-300 mb-10 px-4">
        <div className="flex flex-row gap-5 items-center justify-start">
          <Link href="/" className="hover:cursor-pointer">
            <Image src={logo} alt="logo" width={120} />
          </Link>

          <Link
            href="/admin"
            className="text-gray-500 hover:text-gray-900 hover:underline decoration-2 hover:cursor-pointer"
          >
            <h1 className="text-base font-medium ">Admin</h1>
          </Link>

          <Link
            href="/admin/lunches"
            className="text-gray-500 hover:text-gray-900 hover:underline decoration-2 hover:cursor-pointer"
          >
            <h1 className="text-base font-medium ">Almuerzos</h1>
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
