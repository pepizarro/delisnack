export function PlusIcon({
  w,
  h,
  className,
}: {
  w?: number;
  h?: number;
  className?: string;
}) {
  return (
    <svg
      width={w || 16}
      height={h || 16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.75 2C7.94891 2 8.13968 2.07902 8.28033 2.21967C8.42098 2.36032 8.5 2.55109 8.5 2.75V7H12.75C12.9489 7 13.1397 7.07902 13.2803 7.21967C13.421 7.36032 13.5 7.55109 13.5 7.75C13.5 7.94891 13.421 8.13968 13.2803 8.28033C13.1397 8.42098 12.9489 8.5 12.75 8.5H8.5V12.75C8.5 12.9489 8.42098 13.1397 8.28033 13.2803C8.13968 13.421 7.94891 13.5 7.75 13.5C7.55109 13.5 7.36032 13.421 7.21967 13.2803C7.07902 13.1397 7 12.9489 7 12.75V8.5H2.75C2.55109 8.5 2.36032 8.42098 2.21967 8.28033C2.07902 8.13968 2 7.94891 2 7.75C2 7.55109 2.07902 7.36032 2.21967 7.21967C2.36032 7.07902 2.55109 7 2.75 7H7V2.75C7 2.55109 7.07902 2.36032 7.21967 2.21967C7.36032 2.07902 7.55109 2 7.75 2Z"
        className={className}
      />
    </svg>
  );
}

export function PencilIcon({
  w,
  h,
  className,
}: {
  w?: number;
  h?: number;
  className?: string;
}) {
  return (
    <svg
      width={w || 16}
      height={h || 16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0126 1.42675C11.696 0.743329 12.804 0.743331 13.4874 1.42675L14.5732 2.51254C15.2566 3.19595 15.2566 4.30399 14.5732 4.98741L5.96355 13.5971C5.75325 13.8074 5.49283 13.9606 5.20687 14.0423L1.95603 14.9711C1.69413 15.046 1.41226 14.9729 1.21966 14.7803C1.02706 14.5877 0.954019 14.3059 1.02884 14.044L1.95766 10.7931C2.03936 10.5072 2.19259 10.2467 2.40289 10.0364L11.0126 1.42675ZM12.4268 2.48741C12.3291 2.38978 12.1708 2.38978 12.0732 2.48741L10.8106 3.74997L12.25 5.18931L13.5126 3.92675C13.6102 3.82912 13.6102 3.67083 13.5126 3.5732L12.4268 2.48741ZM11.1893 6.24997L9.74999 4.81063L3.46355 11.0971C3.43351 11.1271 3.41162 11.1643 3.39994 11.2052L2.842 13.158L4.79479 12.6C4.83564 12.5884 4.87284 12.5665 4.90289 12.5364L11.1893 6.24997Z"
        className={className}
      />
    </svg>
  );
}

export function LoadingSpinner({
  w,
  h,
  className,
}: {
  w?: number;
  h?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w || 16}
      height={h || 16}
      className={`animate-spin duration-500 ${className}`}
      viewBox="0 0 512 512"
    >
      <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
    </svg>
  );
}

export function Plus({
  w,
  h,
  className,
}: {
  w?: number;
  h?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w || 16}
      height={h || 16}
      className={className}
      viewBox="0 0 512 512"
    >
      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
    </svg>
  );
}

export function Minus({
  w,
  h,
  className,
}: {
  w?: number;
  h?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w || 16}
      height={h || 16}
      className={className}
      viewBox="0 0 512 512"
    >
      <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
    </svg>
  );
}

export function Thrash({
  w,
  h,
  className,
}: {
  w?: number;
  h?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w || 16}
      height={h || 16}
      className={className}
      viewBox="0 0 512 512"
    >
      <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
    </svg>
  );
}

export function CheckIcon({
  w,
  h,
  className,
}: {
  w?: number;
  h?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w || 16}
      height={h || 16}
      className={className}
      viewBox="0 0 448 512"
    >
      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
    </svg>
  );
}
