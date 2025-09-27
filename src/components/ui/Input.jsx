import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Input({
  placeholder = "type here...",
  type = "text",
  value,
  Ref,
  onChange,
  icons = null,
  bgColor = "#fff",

  haveBtn = false,
  buttonIcon = null,
  OnClick,
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
              ref={Ref}
              onChange={HandleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={placeholder}
              className={`w-full px-4 select-none py-[1rem]  lg:py-[1.05rem] text-sm text-gray-800 placeholder-transparent transition-all duration-200 ease-in-out bg-white border shadow-md ${
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
                  : { top: "1.75rem", fontSize: "0.875rem", color: "#9ca3af" }
              }
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute flex items-center justify-center gap-[0.4rem] px-1 font-semibold pointer-events-none rounded-xl left-3 "
            >
              {InputIcon && <InputIcon className="w-5 h-5 text-violet-600" />}{" "}
              {placeholder}
            </motion.label>
          </div>
          {haveBtn ? (
            <motion.button
              whileHover={{
                backgroundColor: "#6736C2",
                color: "#fff",
                scale: 1.04,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex items-center justify-center w-12 border cursor-pointer border-violet-400 text-violet-500 rounded-r-2xl"
              onClick={OnClick}
            >
              {ButtonIcon && (
                <ButtonIcon className="w-5 h-5 transition-colors duration-200 group-hover:text-white" />
              )}
            </motion.button>
          ) : null}
        </div>
      }
    </AnimatePresence>
  );
}
