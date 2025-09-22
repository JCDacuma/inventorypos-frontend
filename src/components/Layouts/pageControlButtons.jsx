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
}) {
  const isDesktop = useMediaQuery({ minWidth: 968 });
  const isSmallDesktop = useMediaQuery({ minWidth: 768 });
  const isXSmallMobile = useMediaQuery({ maxWidth: 500 });
  return (
    <div
      className={`flex gap-3 justify-end pr-1 ${
        isXSmallMobile ? `w-1/5` : isSmallDesktop ? `w-1/1` : `w-1/1`
      }`}
    >
      {isDesktop ? (
        <div className={"flex items-center justify-between gap-3 w-1/1 "}>
          {hasNavBack ? (
            <Link to={BackNavigationLink} className="cursor-pointer">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05, color: "#3c2350" }}
                className="items-center justify-center hidden gap-1 mb-2 font-semibold sm:flex text-violet-500"
              >
                <Undo2 /> Back
              </motion.button>
            </Link>
          ) : (
            ""
          )}
          <div className={`flex items-end justify-center gap-3 `}>
            {Buttons.map((btn, index) => {
              const btnControl = (
                <motion.button
                  onClick={btn.onClick}
                  key={index}
                  whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
                  whileHover={{ scale: 1.05, backgroundColor: "#3c2350" }}
                  className="flex px-4 py-2 text-sm text-white cursor-pointer bg-violet-400 rounded-3xl"
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
        <div className={"flex justify-center items-center"}>
          <button
            className={`bg-violet-400 text-white flex text-sm py-3 px-4 rounded-lg`}
          >
            <Settings2 className={"h-4 w-4 "} />{" "}
            {isSmallDesktop ? `Controls` : ``}
          </button>
        </div>
      )}
    </div>
  );
}
