import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useMediaQuery } from "react-responsive";
import { Settings2, Undo2 } from "lucide-react";
import { motion } from "framer-motion";
import { ExportButton } from "@/components/ui/buttons.jsx";

export const Row = ({ children, style }) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${style}`}>{children}</div>
  );
};

export const Col = ({ children, style }) => {
  return <div className={`flex-1 flex flex-col ${style}`}>{children}</div>;
};

export const Card = ({ style = "", children }) => {
  return (
    <div
      className={`w-full p-3
                  rounded-2xl border border-gray-200 bg-white shadow-sm ${style}`}
    >
      {children}
    </div>
  );
};

//Layout Contols layout
export const ControlLayout = ({ children }) => {
  const isSmallMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      <header
        className={`flex
         ${isSmallMobile ? `  flex-row` : `flex-row`}
         gap-1 w-full mb-5 justify-end px-2`}
      >
        {children}
      </header>
    </>
  );
};

//For Button Layout Responsiveness for table
export const ButtonLayout = ({
  Buttons = [],
  hasExport = false,
  hasNavBack = false,
  BackNavigationLink = "",
}) => {
  const isDesktop = useMediaQuery({ minWidth: 968 });
  const isSmallDesktop = useMediaQuery({ minWidth: 768 });
  const isXSmallMobile = useMediaQuery({ maxWidth: 500 });
  return (
    <div
      className={`flex gap-3 justify-end pr-1 ${
        isXSmallMobile ? `w-1/5` : isSmallDesktop ? `w-1/1` : `w-1/1`
      }`}
    >
      {isDesktop ? (
        <div className={"flex items-center justify-between gap-3 w-1/1 "}>
          {hasNavBack ? (
            <Link to={BackNavigationLink} className="cursor-pointer">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05, color: "#3c2350" }}
                className="items-center justify-center hidden gap-1 mb-2 font-semibold sm:flex text-violet-500"
              >
                <Undo2 /> Back
              </motion.button>
            </Link>
          ) : (
            ""
          )}
          <div className={`flex items-end justify-center gap-3 `}>
            {Buttons.map((btn, index) => {
              const btnControl = (
                <motion.button
                  onClick={btn.onClick}
                  key={index}
                  whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
                  whileHover={{ scale: 1.05, backgroundColor: "#3c2350" }}
                  className="flex px-4 py-2 text-sm text-white cursor-pointer bg-violet-400 rounded-3xl"
                >
                  <btn.iconControl className={"h-5 w-5 mr-1"} />
                  {btn.BtnLabel}
                </motion.button>
              );

              return btn.to ? (
                <Link to={btn.to}>{btnControl}</Link>
              ) : (
                btnControl
              );
            })}
            {hasExport ? <ExportButton /> : ""}
          </div>
        </div>
      ) : (
        <div className={"flex justify-center items-center"}>
          <button
            className={`bg-violet-400 text-white flex text-sm py-3 px-4 rounded-lg`}
          >
            <Settings2 className={"h-4 w-4 "} />{" "}
            {isSmallDesktop ? `Controls` : ``}
          </button>
        </div>
      )}
    </div>
  );
};

//Page Setup
export const Layout = ({ currentWebPage = "", children, style = "" }) => {
  const [MobileSideBar, setMobileSideBar] = useState(null);

  const HandleMobileSideBar = (state) => {
    setMobileSideBar(state);
  };

  return (
    <div className={`bg-gray-100 w-1/1 h-screen flex ${style}`}>
      <Navbar
        page={currentWebPage}
        setSideBarMobile={HandleMobileSideBar}
        mobileSideBarState={MobileSideBar}
      />
      <Sidebar SideBarMobileState={MobileSideBar} />
      {children}
    </div>
  );
};

//Parent
export const MainWrapper = ({ children, mainStyle = "", style = "" }) => {
  const IsSmallMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <div
      className={`flex-1 pt-3 px-0 w-1/2 ${mainStyle}  ${
        IsSmallMobile ? `mt-15` : `mt-15`
      }`}
    >
      <div
        className={`  rounded-2xl w-full h-1/1 ${style} ${
          IsSmallMobile ? `p-1` : `p-3`
        }`}
      >
        {children}
      </div>
    </div>
  );
};
