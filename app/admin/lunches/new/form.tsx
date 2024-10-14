"use client";
import { useFormState, useFormStatus } from "react-dom";
import { createLunch } from "@/app/actions/lunches";
import {
  NumberInputComponent,
  TextInputComponent,
} from "@/app/components/input";
import { LoadingSpinner } from "@/app/icons";

export default function NewLunchForm() {
  const initialState = {
    message: "",
    error: false,
  };
  const [state, formAction] = useFormState(createLunch, initialState);

  return (
    <form
      action={formAction}
      className="w-full flex flex-col xl:flex-row gap-4 xl:gap-12"
    >
      <div className="w-full max-w-[500px] flex flex-col gap-4">
        <TextInputComponent label="Nombre" id="name" name="name" required />
        <TextInputComponent
          label="Descripción"
          id="description"
          name="description"
        />
        <TextInputComponent
          label="Descripción corta (aparece en el menú)"
          id="shortDescription"
          name="shortDescription"
        />

        <NumberInputComponent label="Precio" id="price" name="price" required />
        <NumberInputComponent label="Stock" id="stock" name="stock" required />
      </div>
      <div className="flex flex-col gap-6 items-start">
        <div className="flex flex-col gap-3">
          <label className="font-medium text-gray-600 text-sm" htmlFor="images">
            Imágenes
          </label>
          <input type="file" id="images" name="images" multiple />
        </div>
        <SubmitButton label="Crear almuerzo" />
        {state?.error ? (
          <p className="text-red-500 font-medium text-sm">
            Error al subir almuerzo
          </p>
        ) : (
          <p className="text-green-500 font-medium text-sm">{state?.message}</p>
        )}
      </div>
    </form>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-[200px] h-[40px] flex items-center justify-center font-medium py-2 bg-deliGreen text-white rounded-md hover:bg-deliGreenDark"
    >
      {pending ? (
        <LoadingSpinner className="fill-white" w={18} h={18} />
      ) : (
        label
      )}
    </button>
  );
}
