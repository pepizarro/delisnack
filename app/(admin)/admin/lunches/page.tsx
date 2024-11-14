import { PencilIcon, PlusIcon } from "@/app/icons";
import db from "@/db/db";
import Image from "next/image";
import Link from "next/link";

export default async function AdminLunchesPage() {
  return (
    <div className="w-full md:w-[700px] xl:w-[900px] md:m-auto px-8 flex flex-col gap-5 items-start">
      <h1 className="text-2xl font-bold text-gray-700">Almuerzos</h1>
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="font-semibold text-gray-600">Nuevo almuerzo</h1>
        </div>
        <Link
          href="/admin/lunches/new"
          className="w-[100px] grid place-items-center py-1 rounded-md border-2 border-gray-700 bg-gray-300 group  hover:bg-gray-700 hover:cursor-pointer"
        >
          <PlusIcon
            w={18}
            h={18}
            className="stroke-gray-700 stroke-1 fill-gray-700 group-hover:fill-gray-200 group-hover:stroke-gray-200"
          />
        </Link>
      </div>
      <div className="w-full flex flex-col gap-5 items-center">{lunches()}</div>
    </div>
  );
}

async function lunches() {
  try {
    const lunches = await db.getLunches();
    return (
      <div className="w-full grid place-items-center gap-6 grid-cols-1 xl:grid-cols-2">
        {lunches.map((lunch) => (
          <div
            key={lunch.id}
            className="relative group w-full rounded-lg shadow-lg bg-white pr-4 flex flex-row gap-3 overflow-hidden"
          >
            <div className="w-1/3 max-w-[200px] bg-black flex items-center justify-center">
              <Image
                src={lunch.images[0]}
                alt={lunch.name}
                width={400}
                height={400}
              />
            </div>
            <div className="py-3 flex flex-col gap-1 justify-evenly">
              <h2 className="font-semibold text-lg">{lunch.name}</h2>
              <p className="text-lg font-bold">
                {lunch.price.toLocaleString("de-DE")}$
              </p>
              {lunch.available ? (
                <p className="text-green-500 font-semibold text-sm">
                  Disponible
                </p>
              ) : (
                <p className="text-red-500 font-semibold text-sm">
                  No disponible
                </p>
              )}
              <p className="font-semibold">Stock: {lunch.stock}</p>
            </div>
            <div className="absolute top-3 right-3 hidden group-hover:block hover:cursor-pointer">
              <PencilIcon w={18} h={18} className="fill-gray-700 " />
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>error</div>;
  }
}
