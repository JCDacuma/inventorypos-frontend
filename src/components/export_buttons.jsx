import { useState } from "react";
import { BsFileEarmarkPdf, BsFileEarmarkExcel } from "react-icons/bs";

//Animation
import { motion } from "framer-motion";
export default function ExportButton() {
  return (
    <div className="flex justify-center items-center gap-3 ">
      <motion.button
        whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
        whileHover={{ scale: 1.05, backgroundColor: "#3c2350" }}
        className="bg-violet-400 text-white flex text-sm py-2 px-4 rounded-3xl cursor-pointer"
      >
        <BsFileEarmarkPdf className={"h-5 w-5 "} />
        Export PDF
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
        whileHover={{ scale: 1.05, backgroundColor: "#3c2350" }}
        className=" bg-violet-400 text-white flex text-sm  py-2 px-4 rounded-3xl cursor-pointer"
      >
        <BsFileEarmarkExcel className={"h-5 w-5"} />
        Export Excel
      </motion.button>
    </div>
  );
}
