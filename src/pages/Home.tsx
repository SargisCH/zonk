import React from "react";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-linear-to-b from-purple-grad-from to-purple-grad-to flex items-center justify-center">
      <Card variant="outline" />
      <Button
        onClick={() => {
          console.log("sss");
        }}
      >
        Play
      </Button>
    </main>
  );
}
