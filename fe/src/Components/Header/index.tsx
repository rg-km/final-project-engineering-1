import Button from "../Button";
import {
  LogoutIcon,
  UserIcon,
  ArrowRightIcon,
  GridIcon,
  UserPlusIcon
} from "../Icons";
import useStore from "../../store/store";
import { useRouter } from "next/router";
import Cookies from 'js-cookie'

type Props = {};

export default function Header({}: Props) {
  const { user, setUser } = useStore();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/");
  };

  const items: Item[] = [
    {
      label: "Dashboard",
      icon: GridIcon,
      onClick: () => router.push("/dashboard"),
    },
    {
      label: "Profile",
      icon: UserIcon,
      onClick: () => router.push("/profile"),
    },
    {
      label: "Pengembang",
      icon: UserPlusIcon,
      onClick: () => router.push("/developer"),
    },
    {
      label: "Keluar",
      icon: LogoutIcon,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="sticky top-0 left-0 right-0 h-[65px] bg-white shadow flex items-center justify-between px-4 lg:px-24 py-4 z-30">
      <div>
        <Link href="/">
          <a>
            <Image src="/logo.png" alt="" width={91} height={40} />
          </a>
        </Link>
      </div>
      {user ? (
        <div className="flex flex-row space-x-2 items-center">
          <Dropdown
            label={user.fullname}
            items={items}
            leftIcon={<Image src={user?.photo || "/avatar.png"} alt="" width={40} height={40} />}
          />
        </div>
      ) : (
        <div className="flex flex-row space-x-4 items-center">
          <Button
            to="/auth/register"
            label="Buat Akun"
            danger
            className="rounded-full text-sm"
          />
          <Button
            to="/auth/login"
            label="Masuk"
            danger
            className="rounded-full text-sm"
            icon={ArrowRightIcon}
            iconPlacement="right"
          />
        </div>
      )}
    </div>
  );
}
