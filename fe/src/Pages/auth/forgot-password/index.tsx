
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Button from "../../../Components/Button";
import { DoubleChevronIcon } from "../../../Components/Icons";
import Input from "../../../Components/Input";
import useStore from "../../../store/store";
import { toast } from "react-toastify";
import { Axios } from "../../../api";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

type Values = {
  email: string;
};

export default function Index({}: Props) {
  const { setIsLoading } = useStore();
  const { handleSubmit, register } = useForm<Values>({ mode: "onChange" });
  const navigate = useNavigate();

  const onSubmit = (data: Values) => {
    const { email } = data;
    if (!email) return toast.error("Email tidak boleh kosong", {theme: 'colored'});
    setIsLoading(true);
    Axios.post("/forgot_password", data)
      .then((res) => {
        const response = res.data;
        if (response.success) {
          Swal.fire({
            title: "Permintaan telah terkirim",
            text: "Kami telah mengirimkan surel berisi tautan untuk mengatur ulang kata sandi akun Anda. Silahkan periksan pesan masuk di Email Anda, dan klik tautan untuk mengganti kata sandi Anda.",
            icon: "success",
            confirmButtonText: "Oke",
            confirmButtonColor: "#EA2227",
          }).then(() => navigate("/auth/login"));
        } else {
          Swal.fire({
            title: "Permintaan gagal dikirim",
            text: "Periksa kembali email yang Anda masukkan",
            icon: "error",
            confirmButtonText: "Oke",
            confirmButtonColor: "#EA2227",
          });
        }
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        if (response.data.errors.email) return toast.error(response.data.errors.email?.[0], { theme: "colored" });
        toast.error(response.data.message, { theme: "colored" })
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Banner */}
      <div className="fixed w-full md:w-1/2 left-0 top-0 bottom-0 z-[-1]">
        <div className="relative min-h-screen h-full px-8 py-12">
          <img
            src="/banner.png"
            alt=""
            className="absolute inset-0"
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
              LUPA SANDI
            </h1>
            <p className="text-center font-medium text-black">
              Masukan Email Anda untuk melakukan reset
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Input label="Email" {...register("email")} />
            <Button danger label="Reset kata sandi" block bold />
            <div className="flex flex-row items-center justify-between text-sm">
              <span>Ingat Akun Anda?</span>
              <Link to="/auth/login" className="space-x-1 flex flex-row items-center text-primary hover:text-red-700">
                  <span>Login</span>
                  {DoubleChevronIcon}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
