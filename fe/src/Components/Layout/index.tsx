import { Outlet, useLocation } from "react-router-dom";
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
        <div
          className={classNames(
            !location.pathname.includes("/auth")
              ? "flex flex-row space-x-14"
              : ""
          )}
        >
          {/* LEFT SECTION */}
          {!location.pathname.includes("/auth") && (
            <div className="border w-2/12 px-8 py-5 space-y-4 text-justify p-10">
              <strong>Forum</strong>
              <h1></h1>
              <strong>Tags</strong>
              <h1></h1>
              <strong>Video</strong>
            </div>
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
            <div className="border flex-auto space-y-4 w-2 py-3 px-5 text-justify">
              <strong>Selamat Datang CAMP!</strong>
              <p>Ikuti Instagram kami untuk update terbaru.</p>
              <p>
                Setelah membuat pertanyaan, kamu bisa copy-paste link pertanyaan
                kamu ke grup Discord untuk memberi tahu para member di grup
                tersebut.
              </p>
            </div>
          )}
        </div>
      </div>
      {!location.pathname.includes("/auth") && <Footer />}
    </div>
  );
}
