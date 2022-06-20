import { useEffect } from "react";
import Button from "../../../Components/Button";
import Input from "../../../Components/Input";
import useStore from "../../../store/store";
import { useForm } from "react-hook-form";
import { Axios } from "../../../api";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { DoubleChevronIcon } from "../../../Components/Icons";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

type Props = {};

type Data = {
  message: string;
  success: boolean;
  data: {
    access_token: string;
    expires_in: number;
    kittens: string;
    prev: string;
    refresh_token: string;
    token_type: string;
  };
};

type Values = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email tidak boleh kosong"),
  password: yup.string().required("Password tidak boleh kosong"),
});

export default function Login({}: Props) {
  const { setIsLoading, setUser } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: Values) => {
    const { email, password } = data;
    if (!email)
      return toast.error("Email tidak boleh kosong", { theme: "colored" });
    if (!password)
      return toast.error("Password tidak boleh kosong", { theme: "colored" });
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    setIsLoading(true);
    // Axios.post("/login", formData)
    //   .then((res) => {
    //     const response: Data = res.data;
    //     if (response.success) {
    //       Cookies.set(
    //         "token",
    //         `${response.data.token_type} ${response.data.access_token}`
    //       );
    //       Axios.get("/profile")
    //         .then((res) => {
    //           setUser(res.data.data);
              toast.success("Berhasil login", { theme: "colored" });
              navigate("/");
      //       })
      //       .catch((err) => {
      //         const response = err.response;
      //         console.log(response);
      //         toast.error("Failed to get data profile", { theme: "colored" });
      //         setIsLoading(false);
      //       });
      //   }
      // })
      // .catch((err) => {
      //   const response = err.response;
      //   console.log(response);
      //   toast.error("Email atau password salah", { theme: "colored" });
      //   setIsLoading(false);
      // });
  };

  return (
    <>
      <Helmet>
        <title>Login - Unique Digital Identity</title>
        <meta
          name="description"
          content="Login - Your Unique Digital Identity"
        />
      </Helmet>
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
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </h1>
              <p className="font-bold text-white">
                Quod enim, incidunt vero rerum cum molestias nemo
              </p>
            </div>
            <div className="absolute w-24 h-auto bottom-12 left-12">
              {/* <img src="/logo-white.png" alt="" /> */}
              <h1 className='font-bold text-4xl text-white'>LOGO</h1>
            </div>
          </div>
        </div>
        <div />
        {/* Login Form */}
        <div className="relative min-h-screen h-full flex items-center justify-center">
          <div className="bg-white rounded shadow w-full border m-4 lg:m-24 p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-primary text-center">
                MASUK
              </h1>
              <p className="text-center font-medium text-black">
                Silahkan isi informasi dibawah ini untuk masuk.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <Input
                label="Email"
                {...register("email")}
                error={errors.email?.message}
              />
              <Input
                label="Password"
                type="password"
                {...register("password")}
                error={errors.password?.message}
              />
              <div className="flex flex-row items-center justify-end">
                <Link
                  to="/auth/forgot-password"
                  className="text-primary hover:text-primary-dark text-sm"
                >
                  Lupa sandi?
                </Link>
              </div>
              <Button primary label="Masuk" block bold />
              <div className="flex flex-row items-center justify-between text-sm">
                <span>Belum memiliki akun?</span>
                <Link
                  to="/auth/register"
                  className="space-x-1 flex flex-row items-center text-primary hover:text-primary-dark"
                >
                  <span>Buat Akun</span>
                  {DoubleChevronIcon}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
