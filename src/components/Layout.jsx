import { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar.jsx";
import { useMediaQuery } from "react-responsive";
import { Settings2 } from "lucide-react";

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

//Layout Contols layout
export const ControlLayout = ({ children }) => {
  const isSmallMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      <header
        className={`flex
         ${isSmallMobile ? `  flex-row` : `flex-row`}
         gap-1 w-full mb-5 justify-end `}
      >
        {children}
      </header>
    </>
  );
};

//For Button Layout Responsiveness for table
export const ButtonLayout = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 968 });
  const isSmallDesktop = useMediaQuery({ minWidth: 768 });
  const isXSmallMobile = useMediaQuery({ maxWidth: 500 });
  return (
    <div
      className={`flex gap-3 justify-end ${
        isXSmallMobile
          ? `w-1/5` /* device 400 and below */
          : isSmallDesktop
          ? `w-1/1`
          : `w-1/1`
      }`}
    >
      {isDesktop ? (
        children
      ) : (
        <div className={"flex justify-center items-center"}>
          <button
            className={`bg-violet-400 text-white flex text-sm py-3 px-4 rounded-2xl`}
          >
            <Settings2 className={"h-5 w-5 "} />{" "}
            {isSmallDesktop ? `Controls` : ``}
          </button>
        </div>
      )}
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
