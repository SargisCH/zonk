import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md h-fit ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
