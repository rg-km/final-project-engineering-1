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
          <div className="bg-orange-800/30 absolute inset-0" />
          <div className="hidden md:block absolute space-y-4 left-12 right-12">
            <h1 className="font-bold text-3xl text-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </h1>
            <p className="font-bold text-white">
              Quod enim, incidunt vero rerum cum molestias nemo
            </p>
          </div>
          <div className="absolute w-24 h-auto bottom-12 left-12">
            {/* <img src="/logo-white.png" alt="" /> */}
            <h1 className="font-bold text-4xl text-white">LOGO</h1>
          </div>
        </div>
      </div>
      <div />
      {/* Login Form */}
      <div className="relative h-full flex items-center justify-center">
        <div className="bg-white rounded shadow w-full border m-4 md:my-24 md:mx-12 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary text-center">
              REGISTRASI
            </h1>
            <p className="text-center font-medium text-black">
              Silahkan lengkapi seluruh data di bawah ini
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-row items-center space-x-8">
              <div className="w-1/2">
                <Input label="NIK" />
              </div>
              <div className="w-1/2">
                <Input label="Nomor KK" />
              </div>
            </div>
            <div className="flex flex-row items-center space-x-8">
              <div className="w-1/2">
                <Input label="Nomor Ponsel" />
              </div>
              <div className="w-1/2">
                <Input label="Email" />
              </div>
            </div>
            <div className="flex flex-row items-center space-x-8">
              <div className="w-1/2">
                <Input label="Nama Lengkap" />
              </div>
              <div className="w-1/2">
                <Input label="Username" />
              </div>
            </div>
            <div className="flex flex-row items-center space-x-8">
              <div className="w-1/2">
                <Input
                  label="Password"
                  type="password"
                  info="Minimal 8 karakter"
                />
              </div>
              <div className="w-1/2">
                <Input
                  label="Ulangi Password"
                  type="password"
                  info="Minimal 8 karakter"
                />
              </div>
            </div>
            <div className="">
              <Checkbox
                danger
                label={`Dengan ini saya menyetujui kebijakan dari ${process.env.REACT_APP_APP_NAME}`}
              />
            </div>
            <Button danger label="Kirim Registrasi" block bold />
            <div className="flex flex-row items-center justify-between text-sm">
              <span>Sudah memiliki akun?</span>
              <Link
                to="/auth/login"
                className="space-x-1 flex flex-row items-center text-primary hover:text-red-700"
              >
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
