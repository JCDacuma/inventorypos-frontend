import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Page Layout component
import {
  Layout,
  MainWrapper,
  ButtonLayout,
  ControlLayout,
} from "../Layouts/Layout";
import { useMediaQuery } from "react-responsive";

//Animation
import { motion, AnimatePresence } from "framer-motion";

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
  Check,
  Undo2,
} from "lucide-react";

export default function RegisterSupplier() {
  const isMobile = useMediaQuery({ maxWidth: 568 });
  const isSmallDesktop = useMediaQuery({ maxWidth: 768 });
  const isSmallScreen = useMediaQuery({ maxWidth: 1024 });
  const isLargeScreen = useMediaQuery({ maxWidth: 1536 });

  const [isVatRegistered, setIsVatRegistered] = useState(null);

  return (
    <Layout currentWebPage={"Register Supplier"}>
      <form className="w-full h-auto py-0s px-2 2xl:px-10  overflow-auto mt-20">
        {/* Back button */}
        <Link to={"/suppliers"}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05, color: "#3c2350" }}
            className="flex text-violet-500  justify-center items-center font-semibold gap-1 cursor-pointer mt-1 ml-3 sm:mt-5 sm:ml-10 "
          >
            <Undo2 /> Back
          </motion.button>
        </Link>
        <div className=" flex flex-col justify-center items-center gap-5 w-full h-auto py-5 mb-0 2xl:mb-20 ">
          <div className="w-full  h-full  flex flex-col md:flex-row justify-center items-center px-0 2xl:px-20">
            {/* First Column */}
            <div className="flex flex-col gap-5 text-[#82439C]/79 justify-center items-center h-full w-full md:w-1/2 pt-2  ">
              <p className="font-bold text-lg flex gap-1">
                <Truck className="stroke-3" /> Supplier Info
              </p>

              <div className="flex flex-col px-5 lg:px-15 2xl:18 gap-5 text-[#82439C]/79 h-full w-full md:w-full 2xl:gap-12">
                <div className="flex flex-col">
                  <label className="font-bold flex gap-1">
                    <Truck /> Supplier Name
                  </label>
                  <input
                    placeholder="Enter Supplier Name"
                    className="p-2 border border-gray-500 shadow-md shadow-gray-300 rounded-[0.7rem] mt-1 placeholder-[#82439C]/69 placeholder:font-semibold  focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-bold flex gap-1">
                    <MapPinned /> Supplier Address
                  </label>
                  <input
                    placeholder="Enter Supplier Address"
                    className="p-2 border border-gray-500 shadow-md shadow-gray-300 rounded-[0.7rem] mt-1 placeholder-[#82439C]/69 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-bold flex gap-1">
                    <TruckElectric /> Default Shipping Fee
                  </label>
                  <input
                    placeholder="Enter Shipping Fee"
                    className="p-2 border border-gray-500 shadow-md shadow-gray-300 rounded-[0.7rem] mt-1 placeholder-[#82439C]/69 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div
                  className={`flex justify-start items-start ${
                    isMobile ? "flex-col gap-1" : "flex-row gap-5"
                  } font-semibold text-[1.05rem]`}
                >
                  {/* ---------------- vat registered ---------------- */}
                  <div className="flex flex-col justify-start items-start w-full">
                    <label className="font-bold flex gap-1">
                      {" "}
                      <HandCoins /> Vat Registered
                    </label>
                    <div
                      className="flex items-center justify-evenly px-5 w-full border border-gray-400 rounded-[0.6rem] pt-2 gap-6 mt-1 
             focus-within:border-[#82439C] focus-within:ring-1 focus-within:ring-violet-500 "
                    >
                      <label className="flex items-center gap-2 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={isVatRegistered}
                            onChange={() => setIsVatRegistered(true)}
                            className="w-6 h-6 appearance-none border-2 border-[#82439C] rounded-md checked:bg-[#82439C] checked:border-[#82439C] shadow-md cursor-pointer focus:outline-none"
                          />
                          {isVatRegistered && (
                            <Check className="absolute top-0 left-0 w-6 h-6 text-white p-1" />
                          )}
                        </div>
                        <span className="text-gray-700 font-medium mb-[0.4rem]">
                          Yes
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={
                              !isVatRegistered && isVatRegistered != null
                            }
                            onChange={() => setIsVatRegistered(false)}
                            className="w-6 h-6 appearance-none border-2 border-[#82439C] rounded-md checked:bg-[#82439C] checked:border-[#82439C] shadow-md cursor-pointer focus:outline-none"
                          />
                          {!isVatRegistered && isVatRegistered != null && (
                            <Check className="absolute top-0 left-0 w-6 h-6 text-white p-1" />
                          )}
                        </div>
                        <span className="text-gray-700 font-medium mb-[0.4rem]">
                          No
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* ---------------- Status select ---------------- */}
                  <div className="flex flex-col gap-1 w-full">
                    <label className="font-bold flex gap-1">
                      {" "}
                      <ThumbsUp />
                      Status
                    </label>
                    <select className="border border-gray-400 w-full px-2 py-[0.54rem] rounded-[0.6rem] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                      <option>Select Status</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col gap-5   text-[#82439C]/79 justify-center items-center h-full w-full md:w-1/2  pt-2 mt-10 md:mt-0 ">
              <p className="font-bold text-lg flex gap-1">
                <UserRoundSearch className="stroke-3" />
                Contact Info{" "}
              </p>

              <div className="flex flex-col px-5 lg:px-15 2xl:18  gap-5 text-[#82439C]/79 h-full w-full md:w-full 2xl:gap-12">
                <div className="flex flex-col">
                  <label className="font-bold flex gap-1">
                    {" "}
                    <User /> First Name
                  </label>
                  <input
                    placeholder="Enter Supplier Name"
                    className="p-2 border border-gray-500 shadow-md shadow-gray-300 rounded-[0.7rem] mt-1 placeholder-[#82439C]/69 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-bold flex gap-1">
                    <User /> Last Name
                  </label>
                  <input
                    placeholder="Enter Supplier Address"
                    className="p-2 border border-gray-500 shadow-md shadow-gray-300 rounded-[0.7rem] mt-1 placeholder-[#82439C]/69 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-bold flex gap-1">
                    <Phone /> Phone number
                  </label>
                  <input
                    placeholder="Enter Shipping Fee"
                    className="p-2 border border-gray-500 shadow-md shadow-gray-300 rounded-[0.7rem] mt-1 placeholder-[#82439C]/69 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-bold flex gap-1">
                    <Mail />
                    Email Address
                  </label>
                  <input
                    placeholder="Enter Shipping Fee"
                    className="p-2 border border-gray-500 shadow-md shadow-gray-300 rounded-[0.7rem] mt-1 placeholder-[#82439C]/69 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-center items-center mt-5 2xl:mt-12 w-[90%] sm:w-[50%] lg:w-[30%] 2xl:w-[23%]">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "#654c88",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              type="submit"
              className="bg-[#82439C] font-bold text-white w-1/1 h-11 rounded-md shadow-md cursor-pointer shadow-gray-400"
            >
              Register Supplier
            </motion.button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
