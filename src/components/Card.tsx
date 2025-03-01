import clsx from "clsx";
import { ReactNode } from "react";

export default function Card({
  variant,
  title,
  children,
}: {
  variant?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className={clsx(
        "max-w-sm rounded-lg overflow-hidden shadow-lg h-fit",
        variant === "outline"
          ? "outline-2 outline-offset-2 outline-pink-700"
          : "bg-white",
      )}
    >
      <div className="p-4">
        <h2 className="text-3xl font-semibold text-gray-400">{title}</h2>
        <div className="bg-gray-400 h-1"></div>

        <div className="p-4 mt-2">{children}</div>
      </div>
    </div>
  );
}
