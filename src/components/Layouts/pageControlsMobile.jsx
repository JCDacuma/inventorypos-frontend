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
    <Modal ModalTitle="Page contols" onClosed={onClosed} isOpen={isOpen}>
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
