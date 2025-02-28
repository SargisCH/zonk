import clsx from "clsx";
import React from "react";

export default function Card({ variant }: { variant?: string }) {
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
        <h2 className="text-2xl font-semibold text-gray-800">Card Title</h2>
        <p className="text-gray-600 mt-2">
          This is a simple description of the card. You can add details,
          features, or any content here.
        </p>
        <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
          Action Button
        </button>
      </div>
    </div>
  );
}
