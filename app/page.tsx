import Image from "next/image";
import logo from "@/public/logo.png";
import db from "@/db/db";
import { Cart } from "./cart";

import LunchesHomeComponent from "./lunches";

export default async function Home() {
  async function lunches() {
    try {
      const lunches = await db.getLunches();
      return <LunchesHomeComponent lunches={lunches} />;
    } catch (error) {
      console.error(error);
      return <div>error</div>;
    }
  }

  return (
    <div>
      <div className="w-full flex flex-row bg-white items-center justify-between border-b-2 border-gray-200 mb-10 px-4">
        <Image src={logo} alt="logo" width={120} />
        <Cart />
      </div>
      <div className="w-full max-w-[1500px] mx-auto px-10 flex flex-col gap-5 ">
        <h1 className="text-3xl font-bold text-gray-800">Menu</h1>
        {lunches()}
      </div>
    </div>
  );
}
