import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClosed, children, ModalTitle = "" }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-wrapper"
          className="fixed inset-0 z-10 flex items-center justify-center w-full px-0 mt-15 "
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
            className="relative bg-white rounded-2xl shadow-xl w-[95%] max-w-xl z-20 "
          >
            {/* Header */}
            <div className="flex items-center justify-between w-full px-4 py-3 border-b shadow-sm rounded-t-2xl bg-gradient-to-r from-violet-300 to-violet-400 border-violet-200">
              <h2 className="pb-2 text-xl font-bold tracking-wide border-b-2 text-violet-700 border-violet-300">
                {ModalTitle}
              </h2>

              <button
                onClick={onClosed}
                className="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors duration-200 rounded-full hover:bg-violet-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
