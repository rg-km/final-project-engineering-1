import Button from "../Button";
import { ArrowRightIcon, LogoutIcon, UserIcon } from "../Icons";
import useStore from "../../store/store";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input";
import Dropdown, { Item } from "../Dropdown";
import { useEffect } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { Axios } from "../../api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

type Props = {};

export default function Header({}: Props) {
  const { user, setIsLoading, setCategories, setQuestions } = useStore();
  const token = Cookies.get("token");
  const { handleSubmit, register } = useForm();
  let navigate = useNavigate();

  const items: Item[] = [
    {
      label: "Profile",
      icon: UserIcon,
      onClick: () => navigate("/profile"),
    },
    {
      label: "Keluar",
      icon: LogoutIcon,
      onClick: handleLogout,
    },
  ];

  const getCategories = () => {
    setIsLoading(true);
    Axios.get("/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => {
        console.log(err.response);
        toast.error("Failed to get data categories");
      })
      .finally(() => setIsLoading(false));
  };

  const onSubmit = (data: any) => {
    setIsLoading(true);
    if (data.keyword) {
      Axios.get("/searchbycontent", { params: data })
        .then((res) => setQuestions(res.data.data))
        .catch((err) => {
          console.log(err.response);
          toast.error("Failed to get data questions");
        })
        .finally(() => setIsLoading(false));
    } else {
      Axios.get("/contents")
        .then((res) => {
          const data = res.data.data;
          console.log(data)
          setQuestions(data || []);
        })
        .catch((err) => {
          console.log(err.response);
          toast.error("Failed to get data");
        })
        .finally(() => setIsLoading(false));
    }
    console.log(data);
  };

  function handleLogout() {
    Cookies.remove("token");
    navigate("/auth/login");
  }

  useEffect(() => {
    if (!user) {
      handleLogout();
    }
    getCategories();
  }, [user]);

  return (
    <div className="sticky top-0 left-0 right-0 h-16 space-x-8 bg-primary-light shadow-md flex items-center justify-between px-4 lg:px-24 py-4 z-30">
      <div className="flex flex-row items-center space-x-8">
        <Link to="/">
          {/* <img src="/logo.png" alt="" width={91} height={40} /> */}
          <p className="font-bold text-xl text-white whitespace-nowrap">
            {process.env.REACT_APP_APP_NAME}
          </p>
        </Link>
        <Button
          to="/about"
          label="Tentang"
          primary
          className="rounded-full text-sm"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input
          placeholder="Ketik disini untuk mencari.."
          search
          {...register("keyword")}
        />
      </form>
      {user && user.username ? (
        <div className="flex flex-row space-x-2 items-center">
          <Dropdown
            label={user.username}
            items={items}
            leftIcon={<img src={"/avatar.png"} alt="" className="h-6 w-6" />}
          />
        </div>
      ) : (
        <div className="flex flex-row space-x-4 items-center">
          <Button
            to="/auth/register"
            label="Buat Akun"
            primary
            className="rounded-full text-sm"
          />
          <Button
            to="/auth/login"
            label="Masuk"
            primary
            className="rounded-full text-sm"
            icon={ArrowRightIcon}
            iconPlacement="right"
          />
        </div>
      )}
    </div>
  );
}
