import React, { useEffect } from "react";
import Input from "../../Components/Input";
import useStore from "../../store/store";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../Components/Button";
import { toast } from "react-toastify";
import { Axios } from "../../api";

type Props = {};

type Values = {
  username: string;
  email: string;
  password: string;
};

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(8).required(),
});

export default function Profile({}: Props) {
  const { setIsLoading, user } = useStore();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Values) => {
    setIsLoading(true);
    Axios.put("/updateuser", {name: data.username, email: data.email, password: data.password}).then(() => {
      toast.success("Success update");
    }).catch((err) => {
      console.log(err.response);
      toast.error("Failed update");
    }).finally(() => setIsLoading(false));
  }

  useEffect(() => {
    setIsLoading(false);
    if (user) {
      reset(user);
    }
    return () => setIsLoading(true);
  }, [user]);

  return (
    <div className="space-y-8">
      <h1 className="font-bold text-2xl">Ubah profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-96 mx-auto">
        <Input label="Email" value={user?.email} disabled />
        <Input
          label="Nama"
          {...register("username")}
          error={errors.username?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <div className='flex justify-end'><Button label='Simpan' primary/></div>
      </form>
    </div>
  );
}
