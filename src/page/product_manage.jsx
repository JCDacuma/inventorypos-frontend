import { useState } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar.jsx";
export default function ProductManagement() {
  const currentWebPage = "Product Management";

  const [MobileSideBar, setMobileSideBar] = useState(null);

  const HandleMobileSideBar = (state) => {
    setMobileSideBar(state);
  };

  return (
    <div>
      <div className="flex items-center  min-h-screen bg-gray-100">
        <Navbar
          page={currentWebPage}
          setSideBarMobile={HandleMobileSideBar}
          mobileSideBarState={MobileSideBar}
        />
        <Sidebar SideBarMobileState={MobileSideBar} />
        {/*Dito lagay yung page layout*/}
        <div className="flex w-1/1  justify-center">
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center m-6 ">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              📊 ProductManagement Page
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
