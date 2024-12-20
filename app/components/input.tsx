export function TextInputComponent({
  label,
  id,
  name,
  placeholder,
  required,
  value,
  onChange,
}: {
  label: string;
  id: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full flex flex-col items-start justify-center">
      <label className="font-medium text-gray-600 text-sm" htmlFor={name}>
        {label}
      </label>
      <input
        required={required}
        className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-deliGreen focus:outline-none"
        id={id}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function NumberInputComponent({
  label,
  id,
  name,
  placeholder,
  limits,
  required,
  value,
  onChange,
}: {
  label: string;
  id: string;
  name?: string;
  placeholder?: string;
  limits?: { min: number; max: number };
  required?: boolean;
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full flex flex-col items-start justify-center">
      <label className="font-medium text-gray-600 text-sm" htmlFor={name}>
        {label}
      </label>
      <input
        className="w-full max-w-[200px] border-2 border-gray-300 rounded-md p-2 focus:border-deliGreen focus:outline-none"
        required={required}
        id={id}
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={limits?.min}
        max={limits?.max}
      />
    </div>
  );
}

export function SubmitButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="w-full max-w-[200px] bg-deliGreen text-white font-semibold rounded-md p-2  hover:bg-deliGreenDark focus:outline-none"
    >
      {label}
    </button>
  );
}
