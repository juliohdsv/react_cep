import { ComponentProps } from "react";

import { Spinner } from "./Spinner";

type Props = ComponentProps<"button"> & {
  isLoading?: boolean;
};

export function Button({ isLoading, disabled, children, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`flex justify-center items-center w-full h-10 font-medium text-20 rounded-xl transition-all duration-500 tracking-tight ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-teal-800 lg:hover:bg-teal-600"}`}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
