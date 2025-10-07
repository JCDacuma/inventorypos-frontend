import { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

//icons
import { Joystick, Undo2 } from "lucide-react";
import { motion } from "framer-motion";
import { ExportButton } from "@/components/ui/buttons.jsx";

//For Button Layout Responsiveness for table
export default function ButtonLayout({
  Buttons = [],
  hasExport = false,
  hasNavBack = false,
  BackNavigationLink = "",
  isOpenMobile = false,
  OpenMobileControl,
}) {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isSmallDesktop = useMediaQuery({ minWidth: 1200 });

  const BtnPositioning =
    Buttons.length > 2 || hasNavBack
      ? isSmallDesktop
        ? "justify-start"
        : "justify-end"
      : "justify-end lg:justify-start";

  return (
    <div className={`flex items-center w-full gap-2 pr-1 `}>
      {hasNavBack ? (
        <Link to={BackNavigationLink} className="cursor-pointer">
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center gap-2 px-4 py-2 font-semibold transition-all duration-200 shadow-sm rounded-xl text-violet-600 bg-violet-50 hover:bg-violet-100 hover:shadow-md"
          >
            <Undo2 className="w-5 h-5" />
            <span>Back</span>
          </motion.button>
        </Link>
      ) : (
        ""
      )}

      {isDesktop ? (
        <div className={`flex items-center ${BtnPositioning} gap-3 w-1/1  `}>
          <div className={`flex items-center justify-center gap-3 `}>
            {Buttons.map((btn, index) => {
              const btnControl = (
                <motion.button
                  onClick={btn.onClick}
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.09, ease: "easeInOut" }}
                  className="flex items-center gap-[0.1rem] px-3 py-2 text-sm font-medium text-white 
          transition-all duration-300 ease-in-out rounded-full shadow-md  
          bg-gradient-to-r from-violet-500 to-violet-600 
          hover:from-violet-600 hover:to-violet-900 active:from-violet-700 active:to-violet-800 
          focus:outline-none focus:ring-2 focus:ring-violet-300
          will-change-transform [backface-visibility:hidden] [transform:translateZ(0)] cursor-pointer"
                >
                  <btn.iconControl className={"h-5 w-5 mr-1"} />
                  {btn.BtnLabel}
                </motion.button>
              );

              return btn.to ? (
                <Link key={btn.to || index} to={btn.to}>
                  {btnControl}
                </Link>
              ) : (
                <div key={index}>{btnControl}</div>
              );
            })}

            {hasExport ? <ExportButton /> : ""}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-end w-full ">
          <motion.button
            onClick={OpenMobileControl}
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed flex items-center justify-center w-10 h-10 text-white rounded-full shadow-lg top-3 right-17 sm:right-17 z-150 bg-gradient-to-r from-violet-300 to-violet-500 hover:from-violet-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            <Joystick className="w-5 h-5" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
