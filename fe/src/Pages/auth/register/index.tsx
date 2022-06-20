import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import Checkbox from "../../../Components/Checkbox";
import { DoubleChevronIcon } from "../../../Components/Icons";
import Input from "../../../Components/Input";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useStore from "../../../store/store";
import { useEffect } from "react";
import { Axios } from "../../../api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = {};

type Values = {
  name: string;
  password: string;
  email: string;
};

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required();

export default function Register({}: Props) {
  const { setIsLoading } = useStore();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Values) => {
    setIsLoading(true);
    Axios.post("/register", data)
      .then(() => {
        Swal.fire({
          title: "Registrasi berhasil",
          text: "Silahkan login untuk melanjutkan",
          icon: "success",
        }).then(() => navigate("/auth/login"));
      })
      .catch((err) => {
        console.log(err.response.data);
        Swal.fire({
          title: "Registrasi gagal",
          text: err.response.data.meta.message,
          icon: "error",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(false);
    return () => setIsLoading(true);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Banner */}
      <div className="fixed w-full md:w-1/2 left-0 top-0 bottom-0 z-[-1]">
        <div className="relative min-h-screen h-full px-8 py-12">
          <img
            src="/banner.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="bg-primary/30 absolute inset-0" />
          <div className="hidden md:block absolute space-y-4 left-12 right-12">
            <h1 className="font-bold text-3xl text-white">
              Forum Ruangguru CAMP
            </h1>
            <p className="font-bold text-white">
              Forum yang dapat digunakan untuk mendiskusikan lebih lanjut
              mengenai materi yang ada.
            </p>
          </div>
        </div>
      </div>
      <div />
      {/* Register Form */}
      <div className="relative h-full flex items-center justify-end">
        <div className="bg-white rounded shadow w-full border m-4 lg:m-36 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary text-center">
              REGISTRASI
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Input
              label="Nama Lengkap"
              {...register("name")}
              error={errors.name?.message}
            />
            <Input
              label="Email"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              type="password"
              info="Minimal 8 karakter"
              {...register("password")}
              error={errors.password?.message}
            />
            <Button primary label="Daftar" block bold />
            <div className="flex flex-row items-center justify-between text-sm">
              <Link
                to="/auth/login"
                className="space-x-1 flex flex-row items-center text-primary hover:text-primary-dark"
              >
                <span>Sudah memiliki akun? Sign In</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
