import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../Components/Button";
import Input from "../../../Components/Input";
import useStore from "../../../store/store";
import { Axios } from "../../../api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

type Props = {
  email: string;
  token: string;
};

type Values = {
  email: string;
  new_password: string;
  c_new_password: string;
  token: string;
};

const schema = yup.object({
  token: yup.string().required("Token tidak boleh kosong"),
  email: yup.string().email().required("Email tidak boleh kosong"),
  new_password: yup
    .string()
    .min(6, "Password baru minimal 6 karakter")
    .required("Password baru tidak boleh kosong"),
  c_new_password: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Password tidak sama"),
});

export default function Index({ email, token }: Props) {
  const { setIsLoading } = useStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Values>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: Values) => {
    setIsLoading(true);
    Axios.post('/forgot_password_confirmation', data).then((res) => {
      if (res.data.success) {
        Swal.fire({
          title: "Sandi berhasil dirubah",
          text: 'Silahkan kembali login menggunakan kata sandi baru.',
          icon:'success',
          confirmButtonText: "Oke",
          confirmButtonColor: "#EA2227",
        });
      }
      navigate('/auth/login')
    }).catch((err) => {
      console.log(err.response);
      Swal.fire({
        title: "Permintaan gagal dikirim",
        text: err?.response?.data?.message,
        icon: "error",
        confirmButtonText: "Oke",
        confirmButtonColor: "#EA2227",
      });
    })
  };

  const getData = () => {
    if (!email) return navigate("/auth/login");
    setValue("email", email);
    setValue("token", token);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Helmet>
        <title>Reset Password - Unique Digital Identity</title>
        <meta name="description" content="Your Unique Digital Identity" />
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Banner */}
        <div className="fixed w-full md:w-1/2 left-0 top-0 bottom-0 z-[-1]">
          <div className="relative min-h-screen h-full px-8 py-12">
            <img
              src="/banner.png"
              alt=""
              className="absolute object-center object-cover inset-0"
            />
            <div className="hidden md:block absolute space-y-4 left-12 right-12">
              <h1 className="font-bold text-3xl text-white">
                Ada kendala mengakses Akun?
              </h1>
              <p className="font-bold text-white">
                Masukkan NIK atau alamat surel Anda di formulir ini. Kami akan
                mengirimkan surel berisi tautan untuk mengatur ulang kata sandi
                akun Anda.
              </p>
            </div>
            <img
              src="/logo-white.png"
              alt=""
              className="absolute w-24 h-auto bottom-12 left-12"
            />
          </div>
        </div>
        <div />
        {/* Login Form */}
        <div className="relative min-h-screen h-full flex items-center justify-center">
          <div className="bg-white rounded shadow w-full border m-4 lg:m-24 p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-primary text-center">
                RESET SANDI
              </h1>
              <p className="text-center font-medium text-black">
                Masukan Email dan kata sandi baru Anda
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <Input label="Email" {...register("email")} disabled />
              <Input
                label="Kata Sandi Baru"
                type="password"
                {...register("new_password")}
                error={errors.new_password?.message}
              />
              <Input
                label="Ulangi Kata Sandi"
                type="password"
                {...register("c_new_password")}
                error={errors.c_new_password?.message}
              />
              <Button danger label="Reset kata sandi" block bold />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
