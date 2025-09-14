import { useState, useEffect } from "react";

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
import {} from "lucide-react";

export default function RegisterSupplier() {
  const isMobile = useMediaQuery({ maxWidth: 568 });
  const isSmallDesktop = useMediaQuery({ maxWidth: 768 });
  const isSmallScreen = useMediaQuery({ maxWidth: 1024 });
  const isLargeScreen = useMediaQuery({ maxWidth: 1536 });

  return (
    <Layout currentWebPage={"Register Supplier"}>
      <div className="w-full h-auto py-0 px-2 overflow-auto ">
        <div className="shadow-md shadow-gray w-full h-auto md:h-screen flex justify-center items-center rounded-2xl  mt-15 pt-0 sm:mt-0 sm:pt-10 ">
          <div className=" flex flex-col gap-5 w-full   h-auto py-5">
            <div className="w-full  h-full  flex flex-col md:flex-row justify-center items-center ">
              {/* First Column */}
              <div className="flex flex-col gap-5 text-[#82439C]/79 justify-center items-center h-full w-full md:w-1/2 pt-2 border-1">
                <p className="font-bold">Supplier Info</p>

                <div className="flex flex-col px-5 lg:px-15 2xl:18 gap-5 text-[#82439C]/79 h-full w-full md:w-full border-1">
                  <div className="flex flex-col">
                    <label className="font-bold">Supplier Name</label>
                    <input
                      placeholder="Enter Supplier Name"
                      className="p-2 border border-gray-500 shadow-md shadow-gray-300 rounded-[0.7rem] mt-1 placeholder-[#82439C]/69 placeholder:font-semibold"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold">Supplier Address</label>
                    <input
                      placeholder="Enter Supplier Address"
                      className="p-2 border border-gray-500 shadow-md shadow-gray-300 rounded-[0.7rem] mt-1 placeholder-[#82439C]/69 placeholder:font-semibold"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold">Default Shipping Fee</label>
                    <input
                      placeholder="Enter Shipping Fee"
                      className="p-2 border border-gray-500 shadow-md shadow-gray-300 rounded-[0.7rem] mt-1 placeholder-[#82439C]/69 placeholder:font-semibold"
                    />
                  </div>
                  <div
                    className={`flex justify-start items-start ${
                      isMobile ? "flex-col gap-1" : "flex-row gap-5"
                    } font-semibold text-[1.05rem]`}
                  >
                    {/* ---------------- vat registered ---------------- */}
                    <div className="flex flex-col justify-start items-start w-full">
                      <label className="mr-5">Vat Registered</label>
                      <div className="flex items-center justify-evenly px-5 w-full border-gray-400 border rounded-[0.6rem] py-2 gap-2 mt-1">
                        <div className="flex justify-center items-center">
                          <input
                            type="checkbox"
                            className="w-6 h-5 border border-gray-500 shadow-md shadow-gray-300 rounded-[1rem] mt-1"
                          />
                          <label className="ml-1">Yes</label>
                        </div>
                        <div className="flex justify-center items-center">
                          <input
                            type="checkbox"
                            className="w-6 h-5 border border-gray-500 shadow-md shadow-gray-300 rounded-[1rem] mt-1"
                          />
                          <label className="ml-1">No</label>
                        </div>
                      </div>
                    </div>

                    {/* ---------------- Status select ---------------- */}
                    <div className="flex flex-col gap-1 w-full">
                      <label>Status</label>
                      <select className="border border-gray-400 w-full px-2 py-[0.54rem] rounded-[0.6rem]">
                        <option>Select Status</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Column */}
              <div className="flex flex-col gap-5 text-[#82439C]/79 justify-center items-center h-full w-full md:w-1/2 border-1 pt-2">
                <p className="font-bold">Supplier Info</p>

                <div className="flex flex-col px-5 lg:px-15 2xl:18  gap-5 text-[#82439C]/79 h-full w-full md:w-full border-1">
                  <div className="flex flex-col">
                    <label className="font-bold">Supplier Name</label>
                    <input
                      placeholder="Enter Supplier Name"
                      className="p-2 border border-gray-500 shadow-md shadow-gray-300 rounded-[0.7rem] mt-1 placeholder-[#82439C]/69 placeholder:font-semibold"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold">Supplier Address</label>
                    <input
                      placeholder="Enter Supplier Address"
                      className="p-2 border border-gray-500 shadow-md shadow-gray-300 rounded-[0.7rem] mt-1 placeholder-[#82439C]/69 placeholder:font-semibold"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold">Default Shipping Fee</label>
                    <input
                      placeholder="Enter Shipping Fee"
                      className="p-2 border border-gray-500 shadow-md shadow-gray-300 rounded-[0.7rem] mt-1 placeholder-[#82439C]/69 placeholder:font-semibold"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold">Email</label>
                    <input
                      placeholder="Enter Shipping Fee"
                      className="p-2 border border-gray-500 shadow-md shadow-gray-300 rounded-[0.7rem] mt-1 placeholder-[#82439C]/69 placeholder:font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className="flex justify-center items-center">
              <button className="bg-[#82439C] font-bold text-white w-60 h-10 rounded-md shadow-md">
                Register Supplier
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
