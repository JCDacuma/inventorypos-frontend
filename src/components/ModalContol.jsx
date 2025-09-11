import { useState } from "react";
//Animation
import { motion } from "framer-motion";

//Batch Contol Modal
export default function BatchControl({ children, Count }) {
  return (
    <>
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed w-full flex justify-center items-end px-2  h-screen pointer-events-none  z-30"
      >
        <div className=" relative w-80 h-20 flex justify-center items-center mb-3 gap-3 bg-[#FCF2FF] p-5 rounded-2xl pointer-events-auto border-[0.1rem] border-gray-400 shadow-md shadow-gray-500">
          <div className="absolute bg-[#E9B3FF] text-white w-7 h-6 ml-72 mb-18 rounded-2xl flex justify-center items-center">
            {Count}
          </div>
          {children}
        </div>
      </motion.div>
    </>
  );
}
