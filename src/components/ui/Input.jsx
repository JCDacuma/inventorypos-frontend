import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laptop } from "lucide-react";
export function Input({
  placeholder = "type here...",
  type = "text",
  value,
  onChange,
  icons = null,
  bgColor = "#fff",

  haveBtn = false,
  buttonIcon = null,
}) {
  const [focused, setFocused] = useState(false);

  const InputIcon = icons;
  const ButtonIcon = buttonIcon;

  //Handle file
  const HandleChange = (e) => {
    if (type === "file") {
      const file = e.target.files?.[0];
      onChange(file);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <AnimatePresence>
      {
        <div className="relative flex w-full gap-0 pt-3 ">
          <div className="w-full">
            <input
              type={type}
              value={value}
              onChange={HandleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={placeholder}
              className={`w-full px-4 select-none py-[1rem] text-sm text-gray-800 placeholder-transparent transition-all duration-200 ease-in-out bg-white border shadow-md ${
                haveBtn ? `rounded-l-2xl` : `rounded-2xl`
              }  border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-400 focus:outline-none focus:shadow-lg`}
            />

            <motion.label
              initial={false}
              animate={
                focused || value || type === "file"
                  ? {
                      top: "0rem",
                      fontSize: "0.75rem",
                      color: "#7c3aed",
                      backgroundColor: bgColor,
                    }
                  : { top: "1.7rem", fontSize: "0.875rem", color: "#9ca3af" }
              }
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute flex items-center justify-center gap-[0.4rem] px-1 font-semibold pointer-events-none rounded-xl left-3 "
            >
              {InputIcon && <InputIcon className="w-5 h-5 text-violet-600" />}{" "}
              {placeholder}
            </motion.label>
          </div>
          {haveBtn ? (
            <button className="flex items-center justify-center w-12 border border-violet-400 text-violet-500 rounded-r-2xl">
              {ButtonIcon && <ButtonIcon className="text-violet-600" />}
            </button>
          ) : null}
        </div>
      }
    </AnimatePresence>
  );
}

// --------------- Radio input component -----------------------------

export function RadioGroup({ name, options = [], value, onChange }) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 shadow-md rounded-2xl shadow-gray-300 ">
      <div className="flex justify-between w-full gap-4 p-3 border border-violet-400 rounded-xl">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg w-full justify-center transition select-none
              ${
                value === option.value
                  ? "bg-violet-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="hidden"
            />
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${
                  value === option.value
                    ? "border-white bg-violet-600"
                    : "border-gray-400"
                }`}
            >
              {value === option.value && (
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              )}
            </div>
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
