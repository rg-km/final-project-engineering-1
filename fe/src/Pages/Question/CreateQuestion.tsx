import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Axios } from "../../api";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import Select from "../../Components/Select";
import TextArea from "../../Components/TextArea";
import { Category } from "../../Model";
import useStore from "../../store/store";

type Props = {};

export default function CreateQuestion({}: Props) {
  const { setIsLoading } = useStore();
  const { control, handleSubmit } = useForm();
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  const onSubmit = () => {
    Swal.fire({
      title: "Pertanyaan berhasil dibuat",
      icon: "success",
    }).then(() => navigate("/"));
  };

  const getCategories = () => {
    setIsLoading(true);
    Axios.get("/categories")
      .then((res) => {
        const data = res.data.data
          .filter((cat: any) => cat.status)
          .map((cat: any) => ({ value: cat.id, label: cat.name }));
        setCategories(data);
      })
      .catch((err) => {
        console.log(err.response);
        toast.error("Failed to get data categories");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getCategories();
    return () => setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bold text-2xl">Buat Pertanyaan</h1>
        <Button label="Kembali" primary to="/" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Judul Pertanyaan" />
        <TextArea label="Isi Pertanyaan" />
        <Controller
          name="category"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label="Kategori"
              options={categories}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <div className="flex justify-end">
          <Button label="Kirim" primary />
        </div>
      </form>
    </div>
  );
}
