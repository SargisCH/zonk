import React, { useEffect, useState } from "react";

const imagePaths = [
  "/src/assets/dice-1.png",
  "/src/assets/dice-2.png",
  "/src/assets/dice-3.png",
  "/src/assets/dice-4.png",
  "/src/assets/dice-5.png",
  "/src/assets/dice-6.png",
  "/src/assets/cup.png",
  "/src/assets/bonus.png",
];

export default function ImageLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let loaded = 0;

    imagePaths.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === imagePaths.length) {
          setLoading(false);
        }
      };
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
        <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"></div>
        <p className="ml-4">Loading images...</p>
      </div>
    );
  }

  return <>{children}</>;
}
