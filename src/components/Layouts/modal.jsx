import { motion, AnimatePresence, scale } from "framer-motion";

export default function Modal({
  isOpen,
  onClosed,
  children,
  ModalTitle = "",
  margin = "mt-15",
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-wrapper"
          className={`fixed inset-0 z-10 flex items-center justify-center w-full px-0 pointer-events-none `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClosed}
          />

          {/* Modal Card */}
          <motion.div
            key="modal-card"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{
              duration: 0.35,
              ease: [0.4, 0, 0.2, 1],
            }}
            className={`relative bg-white rounded-2xl shadow-xl w-[95%] max-w-xl z-20 ${margin} pointer-events-auto`}
          >
            {/* Header */}
            <div className="flex items-center justify-between w-full px-4 py-3 border-b shadow-sm rounded-t-2xl bg-gradient-to-r from-violet-300 to-violet-400 border-violet-200">
              <h2 className="pb-2 text-xl font-bold tracking-wide border-b-2 text-violet-700 border-violet-300">
                {ModalTitle}
              </h2>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClosed}
                className="flex items-center justify-center w-8 h-8 text-gray-600 transition-all duration-300 ease-in-out rounded-full shadow-sm cursor-pointer hover:bg-violet-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400 hover:shadow-md"
              >
                ✕
              </motion.button>
            </div>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
