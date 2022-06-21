import { useEffect, useState } from "react";
import Button from "../../Components/Button";
import useStore from "../../store/store";

type Props = {};

export default function NotFound({}: Props) {
  const { setIsLoading } = useStore();

  useEffect(() => {
    setIsLoading(false);
    return () => setIsLoading(true);
  }, []);

  return (
    <div className="space-y-4">
      <img src="/404.svg" alt="" className="w-auto h-96 mx-auto" />
      <h1 className="text-4xl font-bold text-primary text-center">
        404 Page Not Found
      </h1>
      <div className="text-center">
        <Button label="Beranda" to="/" primary />
      </div>
    </div>
  );
}
