import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Axios } from "../../api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import Select from "../../Components/Select";
import TextArea from "../../Components/TextArea";
import { Category } from "../../Model";
import useStore from "../../store/store";

type Props = {};

type Values = {
  id_category: number;
  title: string;
  subtitle: string;
  deskripsi: string;
};
const schema = yup.object({
  title: yup.string().required(),
  deskripsi: yup.string().required(),
  id_category: yup.number().required(),
});

export default function CreateQuestion({}: Props) {
  const { setIsLoading } = useStore();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  const onSubmit = (data: Values) => {
    setIsLoading(true);
    Axios.post("/content", data)
      .then(() => {
        Swal.fire({
          title: "Pertanyaan berhasil dibuat",
          icon: "success",
        }).then(() => navigate("/"));
      })
      .catch((err) => {
        console.log(err.response);
        toast.error("Pertanyaan gagal dibuat");
      })
      .finally(() => setIsLoading(false));
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
        <Input
          label="Judul Pertanyaan"
          {...register("title")}
          error={errors.title?.message}
        />
        <TextArea
          label="Isi Pertanyaan"
          {...register("deskripsi")}
          error={errors.deskripsi?.message}
        />
        <Controller
          name="id_category"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label="Kategori"
              options={categories}
              onChange={onChange}
              value={value}
              error={errors.id_category?.message}
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
