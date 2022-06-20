import Button from "../Button";
import { ArrowRightIcon, LogoutIcon, UserIcon } from "../Icons";
import useStore from "../../store/store";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input";
import Dropdown, { Item } from "../Dropdown";

type Props = {};

export default function Header({}: Props) {
  const { user, setUser } = useStore();
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

  function handleLogout() {
    Cookies.remove("token");
    setUser(null);
    navigate("/");
  }

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
      <div className="w-full">
        <Input placeholder="Ketik disini untuk mencari.." search />
      </div>
      {/* <div className="flex flex-row space-x-2 items-center">
        <Dropdown
          label="Username"
          items={items}
          leftIcon={
            <img
              src={user?.photo || "/avatar.png"}
              alt=""
              className="h-6 w-6"
            />
          }
        />
      </div> */}
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
    </div>
  );
}
