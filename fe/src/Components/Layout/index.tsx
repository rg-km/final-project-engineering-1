import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { classNames } from "../../Utils/classNames";
import Footer from "../Footer";
import Header from "../Header";

type Props = {};

export default function Layout({}: Props) {
  const location = useLocation();
  return (
    <div>
      {!location.pathname.includes("/auth") && <Header />}
      <div
        className={classNames(
          !location.pathname.includes("/auth")
            ? "min-h-[calc(100vh-8rem)] p-8"
            : ""
        )}
      >
        <div className="flex flex-row space-x-14">
          {/* LEFT SECTION */}
          {!location.pathname.includes("/auth") && (
            <div className="border w-2/12">LEFT SECTION</div>
          )}
          {/* CONTENT */}
          <div
            className={classNames(
              !location.pathname.includes("/auth") ? "w-7/12" : ""
            )}
          >
            <Outlet />
          </div>
          {/* RIGHT SECTION */}
          {!location.pathname.includes("/auth") && (
            <div className="border w-3/12">RIGHT SECTION</div>
          )}
        </div>
      </div>
      {!location.pathname.includes("/auth") && <Footer />}
      <ToastContainer />
    </div>
  );
}
