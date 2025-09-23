import { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

//icons
import { Settings2, Undo2 } from "lucide-react";
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
  const isDesktop = useMediaQuery({ minWidth: 968 });
  const isSmallDesktop = useMediaQuery({ minWidth: 768 });
  const isXSmallMobile = useMediaQuery({ maxWidth: 500 });
  return (
    <div
      className={`flex items-center justify-between pr-1 ${
        isXSmallMobile ? `w-1/5` : isSmallDesktop ? `w-1/1` : `w-1/1`
      }`}
    >
      {hasNavBack ? (
        <Link to={BackNavigationLink} className="cursor-pointer">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05, color: "#3c2350" }}
            className={`items-center justify-center  gap-1  font-semibold ${
              isXSmallMobile ? `hidden` : `flex`
            } text-violet-500`}
          >
            <Undo2 /> Back
          </motion.button>
        </Link>
      ) : (
        ""
      )}

      {isDesktop ? (
        <div className={"flex items-center justify-end gap-3 w-1/1  "}>
          <div className={`flex items-end justify-center gap-3 `}>
            {Buttons.map((btn, index) => {
              const btnControl = (
                <motion.button
                  onClick={btn.onClick}
                  key={index}
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
                  <btn.iconControl className={"h-5 w-5 mr-1"} />
                  {btn.BtnLabel}
                </motion.button>
              );

              return btn.to ? (
                <Link to={btn.to}>{btnControl}</Link>
              ) : (
                btnControl
              );
            })}
            {hasExport ? <ExportButton /> : ""}
          </div>
        </div>
      ) : (
        <div className={"flex justify-end items-center w-full"}>
          <button
            onClick={OpenMobileControl}
            className={`bg-violet-400 text-white flex text-xs font-semibold py-[0.9rem] px-4 justify-center items-center gap-1 rounded-2xl`}
          >
            <Settings2 className={"h-4 w-4"} />{" "}
            {isSmallDesktop ? `Controls` : ``}
          </button>
        </div>
      )}
    </div>
  );
}
