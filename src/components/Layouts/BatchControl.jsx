import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";

export default function BatchControl({ Buttons = [], Count, openBatchContol }) {
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
          {/* Card */}
          <div className="relative w-80 h-20 flex justify-center items-center mb-3 2xl:mb-5 gap-3 bg-[#FCF2FF] p-5 rounded-2xl border border-gray-400 shadow-md shadow-gray-500 pointer-events-auto">
            {/* Count bubble */}
            <div className="absolute top-[-10px] right-[-10px] bg-[#E9B3FF] text-white w-7 h-7 rounded-full flex justify-center items-center text-sm font-semibold shadow">
              {Count}
            </div>

            {/* Buttons */}
            {Buttons.map((btn, index) => {
              const Icon = btn.icon;
              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className={`${btn.color} ${
                    btn.padding || "py-2 px-4"
                  } flex items-center gap-2 text-white rounded-2xl shadow-md shadow-gray-500 cursor-pointer`}
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
