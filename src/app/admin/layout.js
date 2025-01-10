"use client";
import { useEffect, useState } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

export default function DashboardLayout({ children }) {
  const [isopenSidebar, setIsopenSidebar] = useState(true);
  const [mediaScreen, setMediaScreen] = useState("lg");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setMediaScreen("sm");
        setIsopenSidebar(false);
      } else if (window.innerWidth <= 992) {
        setMediaScreen("md");
        setIsopenSidebar(false);
      } else {
        setMediaScreen("lg");
        setIsopenSidebar(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div>
      <div className="flex flex-row">
        <Sidebar isopenSidebar={isopenSidebar} mediaScreen={mediaScreen} />
        <div className="h-screen flex flex-col flex-1 overflow-y-auto bg-bg">
          <Header
            mediaScreen={mediaScreen}
            setIsopenSidebar={setIsopenSidebar}
            isopenSidebar={isopenSidebar}
          />
          <div className="p-[10px] lg:p-[40px] pb-0">{children}</div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}
