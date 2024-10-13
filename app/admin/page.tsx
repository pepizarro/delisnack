import db from "@/db/db";
import Link from "next/link";

export default async function Admin() {
  async function lunches() {
    try {
      const lunches = await db.getLunches();
      return <div className="w-full grid place-items-center grid-cols-1"></div>;
    } catch (error) {
      console.error(error);
      return <div>error</div>;
    }
  }

  return (
    <div className="w-full flex flex-col gap-5 items-center">
      <h1 className="text-2xl font-bold">Admin</h1>
      <p>
        vacío por ahora, ir a{" "}
        <Link className="text-blue-500 underline" href="/admin/lunches">
          almuerzos
        </Link>
      </p>
      {lunches()}
    </div>
  );
}
