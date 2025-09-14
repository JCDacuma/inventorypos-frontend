import { useState } from "react";
import { Link } from "react-router-dom";
//Animation
import { motion } from "framer-motion";

import { BsFileEarmarkPdf, BsFileEarmarkExcel } from "react-icons/bs";

//Export buttons
export function ExportButton() {
  return (
    <div className="flex justify-center items-center gap-3 ">
      <motion.button
        whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
        whileHover={{ scale: 1.05, backgroundColor: "#3c2350" }}
        className="bg-violet-400 text-white flex text-sm py-2 px-4 rounded-3xl cursor-pointer items-center justify-center"
      >
        <BsFileEarmarkPdf className={"h-4 w-4 mr-1"} />
        Export PDF
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
        whileHover={{ scale: 1.05, backgroundColor: "#3c2350" }}
        className=" bg-violet-400 text-white flex text-sm  py-2 px-4 rounded-3xl cursor-pointer  items-center justify-center"
      >
        <BsFileEarmarkExcel className={"h-4 w-4 mr-1"} />
        Export Excel
      </motion.button>
    </div>
  );
}

//Action table buttons
export function Action({ buttons = [] }) {
  return (
    <div className="flex justify-center items-center gap-4 ">
      {buttons.map((btn, index) => {
        const buttonLayout = (
          <motion.button
            key={index}
            onClick={btn.onClick}
            animate={{ scale: [1, 1.07, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="group bg-gray-200 p-2 shadow-lg rounded-[0.3rem] cursor-pointer hover:bg-gray-400"
          >
            {btn.icon && (
              <btn.icon
                className={`text-violet-500 ${btn.iconSize} stroke-[0.15rem] group-hover:text-violet-800 cursor-pointer`}
              />
            )}
          </motion.button>
        );

        return btn.to ? (
          <Link key={index} to={btn.to}>
            {buttonLayout}
          </Link>
        ) : (
          buttonLayout
        );
      })}
    </div>
  );
}
