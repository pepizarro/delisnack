import NewLunchForm from "./form";

export default function NewLunchPage() {
  return (
    <div className="w-full px-7 max-w-[600px] xl:max-w-[1100px] m-auto flex flex-col gap-8 items-start justify-center">
      <h1 className="text-xl font-semibold text-gray-800">Nuevo Almuerzo</h1>
      <NewLunchForm />
    </div>
  );
}
