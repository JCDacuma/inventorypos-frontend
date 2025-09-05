import { useState } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar.jsx";
import { useMediaQuery } from "react-responsive";
import Input from "../components/Input";
import api from "../js/axiosInstance.js";
import Status from "../components/Status.jsx";

export default function RegisterAccount() {
  const currentWebPage = "Account Registration";

  const [MobileSideBar, setMobileSideBar] = useState(null);

  const HandleMobileSideBar = (state) => {
    setMobileSideBar(state);
  };

  const IsSmallMobile = useMediaQuery({ maxWidth: 768 });

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await api.post("/register", formData);
      console.log("Registered successfully:", response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed!");
    }
  };


  return (
    <div className="w-1/1 h-screen flex">
      <Navbar
        page={currentWebPage}
        setSideBarMobile={HandleMobileSideBar}
        mobileSideBarState={MobileSideBar}
      />
      <Sidebar SideBarMobileState={MobileSideBar} />
      {/*Dito lagay yung page layout*/}
      <main
        className={`flex-1 px-0  w-100   ${IsSmallMobile ? `mt-15` : `mt-15`}`}
      >
        <div
          className={`rounded-2xl w-full h-1/1 ${IsSmallMobile ? `p-1` : `p-3`
            }`}
        >

          <Status />
          <Status type="error" />
          <Status type="warning" />
          <Status type="success" />


          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex flex-col">
              <label className="mb-1 text-sm font-medium text-slate-700 ms-2">First Name</label>
              <Input type="text" placeholder="Enter first name"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="mb-1 text-sm font-medium text-slate-700 ms-2">Last Name</label>
              <Input type="text" placeholder="Enter last name"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex flex-col">
              <label className="mb-1 text-sm font-medium text-slate-700 ms-2">Email</label>
              <Input type="email" placeholder="Enter last name"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="mb-1 text-sm font-medium text-slate-700 ms-2">Password</label>
              <Input type="password" placeholder="Enter last name"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex flex-col justify-center">
              <button
                onClick={handleRegister}
                className="bg-emerald-600 w-50 text-white py-2 px-4 
             rounded-md hover:bg-emerald-700 transition mt-6"
              >
                Register
              </button>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
