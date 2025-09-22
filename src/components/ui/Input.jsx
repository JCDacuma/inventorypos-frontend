import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laptop } from "lucide-react";
export function Input({
  placeholder = "type here...",
  value,
  onChange,
  icons = <Laptop />,
  bgColor = "#fff",
}) {
  const [focused, setFocused] = useState(false);

  return (
    <AnimatePresence>
      {
        <div className="relative w-full pt-3 ">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="w-full px-4 py-4 text-sm text-gray-800 placeholder-transparent transition-all duration-200 ease-in-out bg-white border shadow-md rounded-2xl border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-400 focus:outline-none focus:shadow-lg"
          />

          <motion.label
            initial={false}
            animate={
              focused || value
                ? {
                    top: "0rem",
                    fontSize: "0.75rem",
                    color: "#7c3aed",
                    backgroundColor: bgColor,
                  }
                : { top: "1.6rem", fontSize: "0.875rem", color: "#9ca3af" }
            }
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute flex items-center justify-center gap-1 px-1 font-semibold pointer-events-none left-3 "
          >
            {icons} {placeholder}
          </motion.label>
        </div>
      }
    </AnimatePresence>
  );
}
