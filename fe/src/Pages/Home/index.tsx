import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Axios } from "../../api";
import Button from "../../Components/Button";
import CardQuestion from "../../Components/Cards/CardQuestion";
import useStore from "../../store/store";

type Props = {};

export default function Home({}: Props) {
  const { setIsLoading, questions, setQuestions } = useStore();

  const getData = () => {
    setIsLoading(true);
    Axios.get("/contents")
      .then((res) => {
        setQuestions(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
        toast.error("Failed to get data");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getData();
    return () => setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        <h1 className="font-bold text-2xl">Pertanyaan Teratas</h1>
        <Button label="Buat Pertanyaan Baru" primary to="/question/create" />
      </div>
      <div className="space-y-4">
        {questions && questions.length > 0
          ? questions.map((item) => <CardQuestion key={item.id} data={item} getData={getData}/>)
          : "Tidak Ada Data"}
      </div>
    </div>
  );
}
