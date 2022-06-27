import { useEffect, useState } from "react";
import Button from "../../Components/Button";
import CardQuestion from "../../Components/Cards/CardQuestion";
import useStore from "../../store/store";

type Props = {};

export default function Home({}: Props) {
  const { setIsLoading, questions } = useStore();

  useEffect(() => {
    setIsLoading(false);
    return () => setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bold text-2xl">Pertanyaan Teratas</h1>
        <Button label="Buat Pertanyaan Baru" primary to="/question/create" />
      </div>
      <div className="space-y-4">
        {questions.map((item) => (
          <CardQuestion key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
