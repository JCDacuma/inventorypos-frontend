import React from "react";
import api from "@/api/axiosInstance.js";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layouts/Layout.jsx";
import { Input } from "@/components/ui/Input.jsx";
import { RadioGroup } from "@/components/ui/radioGroup.jsx";
import { DefaultDropDown } from "@/components/ui/dropdown.jsx";
import UserRole from "@/modules/account/components/Layouts/UserRoleModal.jsx";
import { motion } from "framer-motion";

import {
  UserRound,
  BriefcaseBusiness,
  KeySquare,
  ShieldUser,
  Mail,
  Phone,
  Plus,
  Eye,
  EyeClosed,
} from "lucide-react";
//icon
export default function RegisterUser() {
  const [firsName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRoles, setSlctdRoles] = useState({});

  const [openAddModalRoles, setAddModalRoles] = useState(false);
  const [Roles, setRoles] = useState([]);

  //Fetch role
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/roles");
        const assignedDataRole = res.data.map((data) => ({
          id: data.id,
          roleName: data.role_name,
          canEditPrice: data.can_edit_price,
          canEditItemInfo: data.can_edit_item_info,
          canEditStocks: data.can_edit_stocks,
          canOrderSupplies: data.can_order_supplies,
          canDelete: data.can_delete,
          isAdmin: data.is_admin,
        }));
        setRoles(assignedDataRole);
        console.log(res.data);
      } catch (err) {
        console.log("error fetching data", err);
      }
    };

    fetchRoles();
  }, []);

  //Select roles
  const RolesSelect = (value) => {
    const roleSelected = Roles.find((rol) => rol.roleName === value);

    if (roleSelected === undefined || roleSelected === null) {
      return;
    } else {
      setSlctdRoles(roleSelected);
    }
  };

  //DisplayRoles in select
  const RoleName = Roles.map((rol) => rol.roleName);

  //Password
  const [showPassword, setShowPass] = useState(false);
  const [showConfrimPass, setShowConfirmPass] = useState(false);

  return (
    <Layout currentWebPage="Register Account">
      <div className="w-full h-full px-1 pt-20 pb-2 bg-white md:pt-15 ">
        <div className="flex flex-col items-center w-full h-full gap-2 px-3 py-4 overflow-auto sm:py-10 sm:px-10 ">
          <div className="flex flex-col items-center justify-start w-full h-20 gap-5 sm:gap-0 sm:justify-center sm:flex-row ">
            <div className="flex justify-center w-full ">
              <div className="flex items-center justify-center w-64 px-6 py-4 text-lg font-bold transition-all duration-300 ease-in-out border shadow-md cursor-pointer text-violet-700 bg-gradient-to-r from-violet-50 to-white border-violet-200 rounded-2xl hover:shadow-lg hover:scale-105 2xl:text-xl">
                <label className="tracking-wide">Register User</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-0 lg:gap-5 sm:mt-2 lg:flex-row">
            <div className="relative flex flex-col w-full h-full gap-3 py-5 lg:gap-5 lg:pr-5 xl:pl-10 2xl:pl-50">
              <div>
                <Input
                  placeholder={"Enter FirstName"}
                  onChange={setFirstName}
                  icons={UserRound}
                  value={firsName}
                />
              </div>
              <div>
                <Input
                  placeholder={"Enter LastName"}
                  onChange={setLastName}
                  icons={UserRound}
                  value={lastName}
                />
              </div>
              <div>
                <Input
                  placeholder={"Enter UserName"}
                  onChange={setUserName}
                  icons={ShieldUser}
                  value={userName}
                />
              </div>
              <div>
                <Input
                  placeholder={"Enter Email"}
                  value={email}
                  onChange={setEmail}
                  icons={Mail}
                />
              </div>
            </div>
            <div className="relative flex flex-col w-full h-full gap-3 py-5 lg:gap-5 lg:pl-5 xl:pr-10 2xl:pr-50 ">
              <div className="mt-2">
                {
                  <DefaultDropDown
                    placeholder={"Select Role"}
                    items={RoleName}
                    selectedValue={selectedRoles.roleId}
                    onChange={RolesSelect}
                    icons={BriefcaseBusiness}
                    BtnIcons={Plus}
                    OnClick={() => setAddModalRoles(true)}
                  />
                }
              </div>
              <div>
                <Input
                  placeholder={"Phone Number"}
                  value={phoneNum}
                  onChange={setPhoneNum}
                  icons={Phone}
                />
              </div>
              <div>
                <Input
                  placeholder={"Password"}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={setPassword}
                  icons={KeySquare}
                  haveBtn={true}
                  buttonIcon={showPassword ? EyeClosed : Eye}
                  OnClick={() =>
                    setShowPass((confirm) => (confirm ? false : true))
                  }
                />
              </div>
              <div>
                <Input
                  placeholder={"Confrim Password"}
                  type={showConfrimPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  icons={KeySquare}
                  haveBtn={true}
                  buttonIcon={showConfrimPass ? EyeClosed : Eye}
                  OnClick={() =>
                    setShowConfirmPass((confirm) => (confirm ? false : true))
                  }
                />
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.01, backgroundColor: "#562FA8" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className=" py-3 font-bold text-white cursor-pointer select-none bg-violet-500 rounded-2xl w-full md:w-[50%] xl:w-[40%] 2xl:w-[30%]"
          >
            Register Account
          </motion.button>
        </div>
      </div>

      <UserRole
        onClosed={() => setAddModalRoles(false)}
        isOpen={openAddModalRoles}
        Roles={Roles}
      />
    </Layout>
  );
}
