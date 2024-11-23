import db from "@/db/db";
import EditLunchForm from "./form";
import { Lunch } from "@/db/schema";

export default async function EditLunchPage({
  params,
}: {
  params: Promise<{ lunch_id: string }>;
}) {
  let lunch = {} as Lunch;
  const lunchId = (await params).lunch_id;

  try {
    lunch = await db.getLunch((await params).lunch_id);
  } catch {
    return <div>No existe el almuerzo</div>;
  }

  return (
    <div className="w-full px-7 max-w-[600px] xl:max-w-[1100px] m-auto flex flex-col gap-8 items-start justify-center">
      <h1 className="text-xl font-semibold text-gray-800">Editar Almuerzo</h1>
      <EditLunchForm currentLunch={lunch} lunchId={lunchId} />
    </div>
  );
}
