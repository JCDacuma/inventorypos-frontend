import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Page Layout component
import {
  Layout,
  MainWrapper,
  ButtonLayout,
  ControlLayout,
} from "../../../components/Layouts/Layout";
import { Input } from "@/components/ui/Input.jsx";
import { useMediaQuery } from "react-responsive";

//Animation
import { motion } from "framer-motion";

//icons
import {
  User,
  UserRoundSearch,
  Truck,
  MapPinned,
  TruckElectric,
  HandCoins,
  ThumbsUp,
  Phone,
  Mail,
  PackageOpen,
  Check,
  Undo2,
} from "lucide-react";

export default function RegisterSupplier() {
  const isMobile = useMediaQuery({ maxWidth: 568 });

  const [supplierName, setSupplierName] = useState("");
  const [supplierAdress, setsupplierAdress] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setemail] = useState("");
  const [isVatRegistered, setIsVatRegistered] = useState(null);

  return (
    <Layout currentWebPage={"Register Supplier"}>
      <form className="w-full h-auto px-2 overflow-auto bg-white mt-15 py-0s 2xl:px-10 ">
        {/* Back button */}
        <Link to={"/suppliers"}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05, color: "#3c2350" }}
            className="flex items-center justify-center mt-10 ml-3 font-semibold cursor-pointer text-violet-500 sm:ml-10 "
          >
            <Undo2 /> Back
          </motion.button>
        </Link>
        <div className="flex flex-col items-center justify-center w-full h-auto gap-5 mb-10 2xl:mb-20 ">
          <div className="flex flex-col items-center justify-center w-full h-full px-0 pt-2 pb-6 rounded-lg lg:py-10 md:flex-row 2xl:px-20">
            {/* First Column */}
            <div className="flex flex-col items-center justify-center w-full h-full gap-5 text-violet-500 md:w-1/2 ">
              <p className="flex gap-1 text-lg font-bold">
                <Truck className="stroke-3" /> Supplier Info
              </p>

              <div className="flex flex-col w-full h-full gap-5 px-5 lg:px-15 2xl:18 text-violet-500 md:w-full 2xl:gap-5">
                <div className="flex flex-col">
                  <label className="font-semibold">Supplier Name</label>
                  <Input
                    value={supplierName}
                    onChange={setSupplierName}
                    placeholder={"Enter supplier"}
                    icons={TruckElectric}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Supplier Address</label>
                  <Input
                    value={supplierAdress}
                    onChange={setsupplierAdress}
                    placeholder={"Enter Supplier Address"}
                    icons={MapPinned}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Supplier Default Shipping fee</label>
                  <Input
                    value={shippingFee}
                    onChange={setShippingFee}
                    placeholder={"Enter Shipping Fee"}
                    icons={PackageOpen}
                  />
                </div>
                <div
                  className={`flex ${
                    isMobile ? "flex-col gap-4" : "flex-row gap-6"
                  } w-full font-medium text-[1rem]`}
                >
                  {/* ---------------- Vat Registered ---------------- */}
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <HandCoins className="text-violet-600" />
                      Vat Registered
                    </label>

                    <div className="flex items-center justify-between w-full gap-1 px-16 py-3 mt-2 transition-all duration-200 border shadow-sm sm:px-5 border-violet-300 rounded-xl focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-400">
                      {/* Yes Option */}
                      <label className="flex items-center gap-2 cursor-pointer hover:opacity-90">
                        <div className="relative">
                          <input
                            type="radio"
                            name="vat-registered"
                            checked={isVatRegistered === true}
                            onChange={() => setIsVatRegistered(true)}
                            className="sr-only"
                          />
                          <div
                            className={`
              w-6 h-6 rounded-md border-2 border-violet-500 flex items-center justify-center
              transition-colors duration-200
              ${isVatRegistered ? "bg-violet-600" : "bg-white"}
            `}
                          >
                            {isVatRegistered && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </div>
                        <span
                          className={`transition-colors duration-200 ${
                            isVatRegistered
                              ? "text-violet-600 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          Yes
                        </span>
                      </label>

                      {/* No Option */}
                      <label className="flex items-center gap-2 cursor-pointer hover:opacity-90">
                        <div className="relative">
                          <input
                            type="radio"
                            name="vat-registered"
                            checked={isVatRegistered === false}
                            onChange={() => setIsVatRegistered(false)}
                            className="sr-only"
                          />
                          <div
                            className={`
              w-6 h-6 rounded-md border-2 border-violet-500 flex items-center justify-center
              transition-colors duration-200
              ${isVatRegistered === false ? "bg-violet-600" : "bg-white"}
            `}
                          >
                            {isVatRegistered === false && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </div>
                        <span
                          className={`transition-colors duration-200 ${
                            isVatRegistered === false
                              ? "text-violet-600 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          No
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* ---------------- Status Select ---------------- */}
                  <div className="flex flex-col w-full">
                    <label className="flex items-center font-semibold text-gray-800 gap-2text-sm">
                      <ThumbsUp className="text-violet-600" />
                      Status
                    </label>
                    <select className="w-full px-3 py-[0.85rem] mt-2 text-sm text-gray-700 transition-all duration-200 border shadow-sm border-violet-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-500 hover:border-violet-400">
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col items-center justify-center w-full h-full gap-4 mt-10 text-violet-500 md:w-1/2 md:mt-0 ">
              <p className="flex gap-1 text-lg font-bold">
                <UserRoundSearch className="stroke-3" />
                Contact Info{" "}
              </p>

              <div className="flex flex-col w-full h-full gap-5 px-5 lg:px-15 2xl:18 text-violet-500 md:w-full 2xl:gap-4">
                <div className="flex flex-col">
                  <label>First Name</label>
                  <Input
                    value={firstName}
                    onChange={setfirstName}
                    placeholder={"Enter First Name"}
                    icons={User}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Last Name</label>
                  <Input
                    value={lastName}
                    onChange={setlastName}
                    placeholder={"Enter Last Name"}
                    icons={User}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Phone Number</label>
                  <Input
                    value={phoneNumber}
                    onChange={setphoneNumber}
                    placeholder={"Enter Phone Number"}
                    icons={Phone}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Email Address</label>
                  <Input
                    value={email}
                    onChange={setemail}
                    placeholder={"Enter Email Address"}
                    icons={Mail}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center items-center mt-4 sm:mt-8 2xl:mt-12 w-[90%] sm:w-[50%] lg:w-[30%]">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              type="submit"
              className="w-full h-12 font-semibold tracking-wide text-white transition-all duration-200 ease-in-out rounded-lg shadow-md cursor-pointer 2xl:h-14 bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              Register Supplier
            </motion.button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
