import React from "react";
import { validationField } from "@/modules/account/utils/validation.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layouts/Layout.jsx";
import { Input } from "@/components/ui/Input.jsx";
import { DefaultDropDown } from "@/components/ui/dropdown.jsx";
import UserRole from "@/modules/account/components/Layouts/UserRoleModal.jsx";
import { motion } from "framer-motion";
import { SweetAlert } from "@/utils/sweetalert";

//api
import { RoleAPIFetch } from "@/modules/account/api/roleAPI.jsx";
import {
  CheckEmailExist,
  CheckUsernameExist,
  AccountSubmit,
} from "@/modules/account/api/accountAPI.jsx";

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

  //api
  const [Roles, setRoles] = useState([]); // fetched data roles
  const [emailExist, setEmailExist] = useState(null); //api flag for email , boolean
  const [usernameExist, setUserNameExist] = useState(null); //api flag for username , boolean
  const [validInputs, setValidInputs] = useState({
    firstname: true,
    lastname: true,
    username: true,
    email: true,
    phone: true,
    password: true,
    confirmPassword: true,
    role_id: true,
  }); //api flag for inputs, array object

  //Handle ResetInput
  const resetInput = () => {
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmail("");
    setPhoneNum(null);
    setPassword("");
    setConfirmPassword("");
    setSlctdRoles({});
  };

  //fetching --------
  useEffect(() => {
    const exist = setTimeout(() => {
      CheckEmailExist(email, setEmailExist);
    }, 400);

    return () => clearTimeout(exist);
  }, [email]);

  useEffect(() => {
    const existTimer = setTimeout(() => {
      CheckUsernameExist(userName, setUserNameExist);
    }, 400);

    return () => clearTimeout(existTimer);
  }, [userName]);

  //fetching api role
  useEffect(() => {
    RoleAPIFetch(setRoles);
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

  // Real-time validator for any field
  const handleValidationChange = (field, value) => {
    setValidInputs((prev) => {
      const updated = { ...prev };

      switch (field) {
        case "firstname":
        case "lastname":
          updated[field] = validationField.name.test(value);
          break;
        case "username":
          updated[field] = validationField.username.test(value);
          break;
        case "email":
          updated[field] = validationField.email.test(value);
          break;
        case "phone":
          updated[field] = validationField.phone.test(value);
          break;
        case "password":
          updated[field] = validationField.password.test(value);
          // also revalidate confirmPassword if it has value
          if (confirmPassword !== "") {
            updated.confirmPassword = value === confirmPassword;
          }
          break;
        case "confirmPassword":
          updated[field] = password === value;
          break;
        case "role_id":
          updated[field] = validationField.roleSelected.test(value);
          break;
        default:
          break;
      }

      return updated;
    });
  };

  //Handle Account Submition
  const [isSubmitting, setIsSubmitting] = useState(false); //Button submition state

  const HandleSubmit = async () => {
    const User = {
      firstname: firsName,
      lastname: lastName,
      username: userName,
      email: email,
      role_id: selectedRoles.id,
      phonenumber: phoneNum,
      password: password,
      confirmPass: confirmPassword,
      account_status: "Active",
    };

    if (isSubmitting) return;
    setIsSubmitting(true);

    await AccountSubmit(User, resetInput, emailExist, usernameExist);
    setIsSubmitting(false);
  };

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
                  placeholder="Enter FirstName"
                  value={firsName}
                  onChange={(val) => {
                    setFirstName(val);
                    handleValidationChange("firstname", val);
                  }}
                  icons={UserRound}
                  validated={validInputs.firstname}
                />
              </div>
              <div>
                <Input
                  placeholder="Enter LastName"
                  value={lastName}
                  onChange={(val) => {
                    setLastName(val);
                    handleValidationChange("lastname", val);
                  }}
                  icons={UserRound}
                  validated={validInputs.lastname}
                />
              </div>
              <div>
                <Input
                  placeholder="Enter UserName"
                  value={userName}
                  onChange={(val) => {
                    setUserName(val);
                    handleValidationChange("username", val);
                  }}
                  icons={ShieldUser}
                  validated={validInputs.username && !usernameExist}
                />
                {userName && usernameExist && (
                  <span className="ml-3 text-sm text-red-900">
                    username is taken already
                  </span>
                )}
              </div>
              <div>
                <Input
                  placeholder="Enter Email"
                  value={email}
                  onChange={(val) => {
                    setEmail(val);
                    handleValidationChange("email", val);
                  }}
                  icons={Mail}
                  validated={validInputs.email && !emailExist}
                />
                {email && emailExist && (
                  <span className="ml-3 text-sm text-red-900">
                    email is taken already
                  </span>
                )}
              </div>
            </div>
            <div className="relative flex flex-col w-full h-full gap-3 py-5 lg:gap-5 lg:pl-5 xl:pr-10 2xl:pr-50 ">
              <div className="mt-2">
                {
                  <DefaultDropDown
                    placeholder={"Select Role"}
                    items={RoleName}
                    selectedValue={selectedRoles.roleName}
                    SetSelected={RolesSelect}
                    icons={BriefcaseBusiness}
                    BtnIcons={Plus}
                    OnClick={() => setAddModalRoles(true)}
                  />
                }
              </div>
              <div>
                <Input
                  placeholder="Phone Number"
                  type="text"
                  value={phoneNum}
                  onChange={(val) => {
                    setPhoneNum(val);
                    handleValidationChange("phone", val);
                  }}
                  icons={Phone}
                  validated={validInputs.phone}
                />
              </div>
              <div>
                <Input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(val) => {
                    setPassword(val);
                    handleValidationChange("password", val);
                  }}
                  icons={KeySquare}
                  haveBtn={true}
                  buttonIcon={showPassword ? EyeClosed : Eye}
                  validated={validInputs.password}
                  OnClick={() => setShowPass((p) => !p)}
                />
              </div>
              <div>
                <Input
                  placeholder="Confirm Password"
                  type={showConfrimPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(val) => {
                    setConfirmPassword(val);
                    handleValidationChange("confirmPassword", val);
                  }}
                  icons={KeySquare}
                  haveBtn={true}
                  buttonIcon={showConfrimPass ? EyeClosed : Eye}
                  validated={validInputs.confirmPassword}
                  OnClick={() => setShowConfirmPass((p) => !p)}
                />
              </div>
            </div>
          </div>
          <motion.button
            onClick={HandleSubmit}
            disabled={isSubmitting}
            whileHover={
              !isSubmitting ? { scale: 1.01, backgroundColor: "#562FA8" } : {}
            }
            whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className={`py-3 font-bold text-white rounded-2xl w-full md:w-[50%] xl:w-[40%] 2xl:w-[30%] ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-violet-500"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Register Account"}
          </motion.button>
        </div>

        <UserRole
          onClosed={() => setAddModalRoles(false)}
          isOpen={openAddModalRoles}
          Roles={Roles}
          RoleAPIFetch={() => RoleAPIFetch(setRoles)}
        />
      </div>
    </Layout>
  );
}
