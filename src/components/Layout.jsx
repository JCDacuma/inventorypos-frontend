import { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar.jsx";
import { useMediaQuery } from "react-responsive";

export const Row = ({
    children,
    style
}) => {
    return (

        <div className={`flex flex-col sm:flex-row gap-4 ${style}`}>
            {children}
        </div>
    );
}

export const Col = ({
    children,
    style
}) => {
    return (

        <div className={`flex-1 flex flex-col ${style}`}>
            {children}
        </div>
    );
}

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

export const Layout = ({currentWebPage = "", children, style = ""}) => {

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
}

export const MainWrapper = ({children, mainStyle = "", style = ""}) => {
  const IsSmallMobile = useMediaQuery({ maxWidth: 768 });
    return(
      <main className={`flex-1 px-0  ${mainStyle}  ${IsSmallMobile ? `mt-15` : `mt-15`}`}>
        <div
          className={`rounded-2xl w-full h-1/1 ${style} ${
            IsSmallMobile ? `p-1` : `p-3`
          }`}
        >
            {children}
        </div>
      </main>
    );

}
