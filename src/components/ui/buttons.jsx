import { useState } from "react";
import { Link } from "react-router-dom";
//Animation
import { motion } from "framer-motion";

import { ListEnd } from "lucide-react";

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
        <ListEnd className="w-4 h-4" />
        <span>Export</span>
      </motion.button>
    </div>
  );
}

// Action table buttons
export function Action({ buttons = [], disabled = false }) {
  return (
    <div className="flex items-center justify-center gap-4">
      {buttons.map((btn, index) => {
        const isDisabled = disabled || btn.disabled;

        const buttonContent = (
          <div key={index} className="relative group">
            <motion.button
              onClick={!isDisabled ? btn.onClick : undefined}
              animate={{ scale: [1, 1.07, 1] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              disabled={isDisabled}
              className={`z-10 relative bg-gray-200 p-2 shadow-lg rounded-[0.3rem] 
                cursor-pointer hover:bg-gray-300
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200`}
            >
              {btn.icon && (
                <btn.icon
                  className={`text-violet-500 ${btn.iconSize || "w-5 h-5"} 
                    stroke-[0.15rem] group-hover:text-violet-800`}
                />
              )}
            </motion.button>

            {/* Tooltip (only show if not disabled) */}
            {btn.tooltip && !isDisabled && (
              <div className="absolute z-[100] px-2 py-1 mt-2 text-xs text-white transition-all duration-200 -translate-x-1/2 -translate-y-1 bg-gray-800 rounded-md shadow-md opacity-0 pointer-events-none top-full left-1/2 group-hover:opacity-100 group-hover:translate-y-0">
                {btn.tooltip}
                <div className="absolute w-2 h-2 rotate-45 -translate-x-1/2 bg-gray-800 left-1/2 -top-1"></div>
              </div>
            )}
          </div>
        );

        return btn.to && !isDisabled ? (
          <Link to={btn.to} key={index}>
            {buttonContent}
          </Link>
        ) : (
          buttonContent
        );
      })}
    </div>
  );
}
