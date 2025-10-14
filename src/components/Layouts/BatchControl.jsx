import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function BatchControl({
  Buttons = [],
  Count,
  openBatchContol,
  clearId,
}) {
  const isSmallMobile = useMediaQuery({ maxWidth: 375 });

  return (
    <AnimatePresence>
      {openBatchContol && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-30 flex items-end justify-center px-2 pointer-events-none"
        >
          {/* Floating Action Card */}
          <div className="relative flex flex-wrap justify-center items-center gap-3 w-80 bg-[#FCF2FF] border border-gray-300 rounded-2xl shadow-lg shadow-gray-400 mb-14 pointer-events-auto p-3">
            {/* Count bubble */}
            <div className="absolute bottom-11 left-0 bg-[#E9B3FF] text-white w-7 h-7 rounded-full flex justify-center items-center text-sm font-semibold shadow">
              {Count}
            </div>

            {/* ClearButton */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={clearId}
              className="absolute p-1 bg-white border border-gray-300 rounded-full shadow-sm cursor-pointer group -top-2 -right-2 hover:bg-gray-100"
              aria-label="Clear"
            >
              <X className="w-3.5 h-3.5 text-gray-600" />

              {/* Tooltip */}
              <span className="absolute px-2 py-1 mt-1 text-xs text-white transition-opacity duration-200 translate-x-1/2 bg-gray-800 rounded-md opacity-0 pointer-events-none top-full right-1/2 whitespace-nowrap group-hover:opacity-100">
                Clear Selection
              </span>
            </motion.button>

            {/* Main Action Buttons */}
            {Buttons.map((btn, index) => {
              const Icon = btn.icon;
              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={btn.function}
                  className={`${btn.color} ${
                    btn.padding || "py-2 px-4"
                  } cursor-pointer flex items-center gap-2 text-white rounded-2xl shadow-md shadow-gray-500 transition`}
                >
                  <span className="text-sm">{btn.btnLabel}</span>
                  {Icon && (
                    <Icon
                      className={`${
                        isSmallMobile ? "w-4 h-4" : "w-5 h-5"
                      } text-white`}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
