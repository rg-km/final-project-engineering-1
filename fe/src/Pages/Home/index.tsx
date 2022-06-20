import React from "react";
import Button from "../../Components/Button";
import CardQuestion from "../../Components/Cards/CardQuestion";

type Props = {};

export default function Home({}: Props) {
  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bold text-2xl">Forum</h1>
        <Button label="Buat Pertanyaan Baru" danger />
      </div>
      <div className="space-y-4">
        <CardQuestion />
        <CardQuestion />
        <CardQuestion />
        <CardQuestion />
        <CardQuestion />
      </div>
    </div>
  );
}
