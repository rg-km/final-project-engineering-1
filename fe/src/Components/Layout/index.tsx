import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

type Props = {};

export default function Layout({}: Props) {
  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh-8rem)] p-8">
        <div className="flex flex-row space-x-14">
          {/* LEFT SECTION */}
          <div className="border w-2/12">LEFT SECTION</div>
          {/* CONTENT */}
          <div className="border w-7/12">
            <Outlet />
          </div>
          {/* RIGHT SECTION */}
          <div className="border w-3/12">RIGHT SECTION</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
