import db from "@/db/db";
import LunchesHomeComponent from "./lunches";

export const dynamic = "force-dynamic";

export default async function Menu() {
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
    <div className="w-full max-w-[1500px] mx-auto px-10 pb-10 flex flex-col gap-5 ">
      <h1 className="text-3xl font-bold text-gray-800">Menu</h1>
      {lunches()}
    </div>
  );
}
