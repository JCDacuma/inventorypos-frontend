import { useState } from "react";
import { Link } from "react-router-dom";
//Animation
import { motion } from "framer-motion";

import { BsFileEarmarkPdf, BsFileEarmarkExcel } from "react-icons/bs";

//Export buttons
export function ExportButton() {
  return (
    <div className="flex items-center justify-center gap-3 ">
      <motion.button
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.09, ease: "easeInOut" }}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white 
             transition-all duration-300 ease-in-out rounded-full shadow-md  
             bg-gradient-to-r from-violet-500 to-violet-600 
             hover:from-violet-600 hover:to-violet-900 active:from-violet-700 active:to-violet-800 
             focus:outline-none focus:ring-2 focus:ring-violet-300
             will-change-transform [backface-visibility:hidden] [transform:translateZ(0)] cursor-pointer"
      >
        <BsFileEarmarkPdf className="w-4 h-4" />
        <span>Export PDF</span>
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.09, ease: "easeInOut" }}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white 
             transition-all duration-300 ease-in-out rounded-full shadow-md  
             bg-gradient-to-r from-violet-500 to-violet-600 
             hover:from-violet-600 hover:to-violet-900 active:from-violet-700 active:to-violet-800 
             focus:outline-none focus:ring-2 focus:ring-violet-300
             will-change-transform [backface-visibility:hidden] [transform:translateZ(0)] cursor-pointer"
      >
        <BsFileEarmarkExcel className="w-4 h-4" />
        <span>Export Excel</span>
      </motion.button>
    </div>
  );
}

//Action table buttons
export function Action({ buttons = [] }) {
  return (
    <div className="flex items-center justify-center gap-4 ">
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
