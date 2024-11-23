"use client";
import { useFormState, useFormStatus } from "react-dom";
import { updateLunch } from "@/app/actions/lunches";
import {
  NumberInputComponent,
  TextInputComponent,
} from "@/app/components/input";
import { LoadingSpinner, Thrash } from "@/app/icons";
import { useState } from "react";
import { Lunch } from "@/db/schema";
import Image from "next/image";

export default function EditLunchForm({
  currentLunch,
  lunchId,
}: {
  currentLunch: Lunch;
  lunchId: string;
}) {
  const initialState = {
    message: "",
    error: false,
  };
  const [state, formAction] = useFormState(updateLunch, initialState);

  const [lunch, setLunch] = useState(currentLunch);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLunch({ ...lunch, [name]: value });
  };

  return (
    <form
      action={formAction}
      className="w-full flex flex-col xl:flex-row gap-4 xl:gap-12"
    >
      <div className="w-full max-w-[500px] flex flex-col gap-4">
        <TextInputComponent
          value={lunch.name}
          onChange={handleChange}
          label="Nombre"
          id="name"
          name="name"
          required
        />
        <TextInputComponent
          label="Descripción"
          id="description"
          name="description"
          value={lunch.description}
          onChange={handleChange}
        />
        <TextInputComponent
          label="Descripción corta (aparece en el menú)"
          id="shortDescription"
          name="shortDescription"
          value={lunch.shortDescription}
          onChange={handleChange}
        />

        <NumberInputComponent
          value={lunch.price}
          onChange={handleChange}
          label="Precio"
          id="price"
          name="price"
          required
        />
        <NumberInputComponent
          value={lunch.stock}
          onChange={handleChange}
          label="Stock"
          id="stock"
          name="stock"
          required
        />
      </div>
      <div className="flex flex-col gap-6 items-start">
        <div className="flex flex-col gap-3">
          <label className="font-medium text-gray-600 text-sm" htmlFor="images">
            Imágenes
          </label>
          <div className="flex flex-row items-center max-w-[400px]">
            {lunch.images.map((url) => (
              <div
                key={url}
                className="relative group cursor-pointer"
                onClick={() => {
                  setLunch({
                    ...lunch,
                    images: lunch.images.filter((img) => img !== url),
                  });
                }}
              >
                <Image
                  src={url}
                  width={200}
                  height={200}
                  alt="img"
                  className="group-hover:opacity-50 transition duration-100"
                ></Image>
                <Thrash
                  w={40}
                  h={40}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fill-red-500 hidden group-hover:block transition duration-100"
                />
              </div>
            ))}
          </div>
          <input type="file" id="images" name="images" multiple />
          <input
            type="text"
            name="existing-images"
            id="existing-images"
            value={lunch.images.join(",") || ""}
            readOnly
            hidden
          />
          <input
            type="text"
            name="lunchId"
            value={lunchId}
            readOnly
            hidden
            required
          />
        </div>
        <SubmitButton label="Actualizar almuerzo" />
        {state?.error ? (
          <p className="text-red-500 font-medium text-sm">
            Error al actualizar almuerzo
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
