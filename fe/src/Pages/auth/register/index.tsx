import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import Checkbox from "../../../Components/Checkbox";
import { DoubleChevronIcon } from "../../../Components/Icons";
import Input from "../../../Components/Input";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

type Props = {};

export default function Register({}: Props) {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    Swal.fire({
      title: "Registrasi berhasil",
      text: "Silahkan login untuk melanjutkan",
      icon: "success",
    }).then(() => navigate("/auth/login"));
  };
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
              Forum yang dapat digunakan untuk mendiskusikan lebih lanjut mengenai materi yang ada.
            </p>
          </div>
          <div className="absolute w-24 h-auto bottom-12 left-12">
            {/* <img src="/logo-white.png" alt="" /> */}
            {/* <h1 className="font-bold text-4xl text-white">LOGO</h1> */}
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
            {/* <p className="text-center font-medium text-black">
              Silahkan lengkapi seluruh data di bawah ini
            </p> */}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-row items-center space-x-8">
              <div className="w-5/2">
                <Input label="Nama Lengkap" />
              </div>
            </div>
            <div className="flex flex-row items-center space-x-8">
              <div className="w-5/2">
                <Input label="Email" />
              </div>
            </div>
            <div className="flex flex-row items-center space-x-8">
              <div className="w-5/2">
                <Input
                  label="Password"
                  type="password"
                  info="Minimal 8 karakter"
                />
              </div>
            </div>
            <Button danger label="Daftar" block bold />
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
