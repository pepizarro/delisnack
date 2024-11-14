"use client";
import { useFormState, useFormStatus } from "react-dom";
import { placeOrder } from "@/app/actions/orders";
import { TextInputComponent } from "@/app/components/input";
import { Grade } from "@/db/schema";
import { LoadingSpinner } from "@/app/icons";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PaymentMethods } from "@/payments/payments";
import { CartLunch } from "./page";
import { cleanCart } from "./cart";

const CheckoutComponent: React.FC<{ cartItems: CartLunch[] }> = ({
  cartItems,
}) => {
  const [total, setTotal] = useState<number>(0);
  const initialState = {
    message: "",
    error: false,

    code: 0,
    redirectUrl: "",
    token: "",
  };
  const [state, formAction] = useFormState(placeOrder, initialState);

  const [paymentMethod, setPaymentMethod] = useState(PaymentMethods.Webpay);
  const [valid, setValid] = useState("");

  useEffect(() => {
    // WARN: Kinda looses the point of abstracting payments, will have to see for other payments methods later
    if (state.redirectUrl && state.token) {
      const form = document.createElement("form");
      form.action = state.redirectUrl;
      form.method = "POST";
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "token_ws";
      input.value = state.token;
      form.appendChild(input);
      cleanCart();

      document.body.appendChild(form);
      form.submit();
    }
  }, [state]);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.amount,
      0,
    );
    setTotal(total);
    if (total <= 0) {
      setValid("No hay productos en el carro");
    } else {
      setValid("");
    }
  }, [cartItems]);

  return (
    <div className="bg-white shadow-md shadow-gray-100 p-5 rounded-lg min-w-[200px]">
      <h2 className="font-semibold text-xl mb-5 text-gray-800">Pago</h2>
      <form action={formAction} className="flex flex-col gap-5 items-start">
        <TextInputComponent
          name="name"
          label="Nombre"
          placeholder="Ingresa tu nombre"
          id="name"
          required
        />
        <div className="w-full flex flex-col">
          <label className="font-medium text-gray-600 text-sm" htmlFor="grade">
            Curso
          </label>
          <select
            name="grade"
            className="w-full bg-white border-2 border-gray-300 rounded-md p-2 focus:border-deliGreen focus:outline-none"
            required
          >
            <option value="">Selecciona tu curso</option>
            {Object.values(Grade).map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>

        <p className="font-medium text-gray-600 text-sm">Método de pago</p>
        {Object.values(PaymentMethods).map((method) => (
          <label
            key={method}
            className="w-full flex flex-row gap-3 items-center justify-center px-3"
          >
            <input
              type="radio"
              value={method}
              checked={paymentMethod === method}
              onChange={() => setPaymentMethod(method)}
            />
            <div className="w-full flex justify-center items-center">
              <Image
                src={`/payments/${method}.png`}
                width={200}
                height={100}
                alt={`${method} logo`}
              />
            </div>
          </label>
        ))}

        <div>
          <p className="text-gray-700 font-bold mt-5 mb-2">Total:</p>
          <p className="text-gray-700 font-semibold text-4xl">
            ${total.toLocaleString("de-DE")}
          </p>
        </div>

        <input
          type="hidden"
          name="lunches"
          value={JSON.stringify(cartItems)}
          required
        />
        <input type="hidden" name="total" value={total} required />
        <input
          type="hidden"
          name="paymentMethod"
          value={paymentMethod}
          required
        />

        <input type="hidden" name="valid" value={valid} required />

        {valid ? (
          <p className="text-red-500 text-sm max-w-[300px]">{valid}</p>
        ) : (
          <SubmitButton label="Comprar" />
        )}
        {state.message && (
          <p
            className={`text-sm ${
              state.error ? "text-red-500" : "text-green-500"
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-[150px] h-[40px] flex items-center justify-center font-medium py-2 bg-orange-500 text-white rounded-md hover:bg-orange-400 hover:text-orange-200"
    >
      {pending ? (
        <LoadingSpinner className="fill-white" w={18} h={18} />
      ) : (
        label
      )}
    </button>
  );
}

export default CheckoutComponent;
