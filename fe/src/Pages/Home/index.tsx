import React from "react";
import Button from "../../Components/Button";
import CardQuestion from "../../Components/Cards/CardQuestion";

type Props = {};

export default function Home({}: Props) {
  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bold text-2xl">Pertanyaan Teratas</h1>
        <Button label="Buat Pertanyaan Baru" primary to='/question/create' />
      </div>
      <div className="space-y-4">
        <CardQuestion id='1' />
        <CardQuestion id='2' />
        <CardQuestion id='3' />
        <CardQuestion id='4' />
        <CardQuestion id='5' />
      </div>
    </div>
  );
}
