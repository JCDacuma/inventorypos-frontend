import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "@/components/Layouts/modal.jsx";
import ButtonLayout from "@/components/Layouts/pageControlButtons.jsx";
import { ExportButton } from "@/components/ui/buttons.jsx";
import { Undo2 } from "lucide-react";
import { motion } from "framer-motion";
export default function NavControl({
  isOpen,
  onClosed,
  hasNavBack = false,
  BackNavigationLink = "/",
  Buttons = [],
  hasExport = false,
}) {
  return (
    <Modal
      ModalTitle="Page contols"
      onClosed={onClosed}
      isOpen={isOpen}
      margin={"mt-0"}
    >
      <div className="h-[calc(100vh-500px)] min-h-[200px] max-h-[350px] overflow-auto flex flex-col justify-center items-center ">
        <div
          className={`flex items-start justify-start w-full ${
            hasNavBack ? `h-1/4` : `h-0`
          }`}
        >
          {hasNavBack ? (
            <Link to={BackNavigationLink} className="inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-1 mt-4 ml-2 transition-all duration-200 bg-white border rounded-lg shadow-sm font-sm text-violet-600 border-violet-200 hover:bg-violet-50 hover:border-violet-300"
              >
                <Undo2 className="w-4 h-4" />
                <span>Previous Page</span>
              </motion.button>
            </Link>
          ) : (
            ""
          )}
        </div>

        <div
          className={
            "flex items-center justify-center gap-3 w-1/1 h-full py-4  px-1 sm:px-0"
          }
        >
          <div
            className={`flex items-end justify-center gap-3  flex-wrap bg-white shadow-lg shadow-gray-400 py-5 px-2 border border-gray-200 rounded-xl`}
          >
            {Buttons.map((btn, index) => {
              const btnControl = (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.09, ease: "easeInOut" }}
                  className="flex items-center justify-center gap-1 px-2 py-2 text-sm font-medium text-white 
             transition-all duration-300 ease-in-out rounded-full shadow-md  
             bg-gradient-to-r from-violet-500 to-violet-600 
             hover:from-violet-600 hover:to-violet-900 active:from-violet-700 active:to-violet-800 
             focus:outline-none focus:ring-2 focus:ring-violet-300
             will-change-transform [backface-visibility:hidden] [transform:translateZ(0)] cursor-pointer"
                >
                  <btn.iconControl className="w-4 h-4" />
                  <span>{btn.BtnLabel}</span>
                </motion.button>
              );

              return btn.to ? (
                <Link to={btn.to} key={index}>
                  {btnControl}
                </Link>
              ) : (
                btnControl
              );
            })}
            {hasExport ? (
              <>
                <ExportButton />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
