import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  validated = true,
  disabled = false,
  file,
}) {
  const [focused, setFocused] = useState(false);
  const [fileName, setFileName] = useState("");
  const InputIcon = icons;
  const ButtonIcon = buttonIcon;

  const HandleChange = (e) => {
    if (disabled) return;

    if (type === "file") {
      const file = e.target.files?.[0];
      if (file) {
        setFileName(file.name);
        onChange(file);
      } else {
        setFileName("");
        onChange(null);
      }
    } else {
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    if (type === "file" && !file) {
      setFileName("");
    }
  }, [file, type]);

  return (
    <AnimatePresence>
      <div
        className={`relative flex w-full gap-0 pt-3  ${
          disabled ? "opacity-60 cursor-not-allowed select-none" : ""
        }`}
      >
        <div className={`w-full `}>
          <input
            type={type}
            ref={Ref}
            {
              ...(type === "file"
                ? { onChange: HandleChange } // uncontrolled for file
                : { value: value || "", onChange: HandleChange }) // controlled for others
            }
            onFocus={() => !disabled && setFocused(true)}
            onBlur={() => !disabled && setFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full px-4 py-[1rem] lg:py-[1.05rem] ${
              type === "file" ? "text-transparent" : ""
            } text-sm text-gray-800 placeholder-transparent transition-all duration-200 ease-in-out bg-white border shadow-md select-none
    ${haveBtn ? "rounded-l-2xl" : "rounded-2xl"}
    ${
      validated || value === null || value === undefined || value === ""
        ? "border-violet-300"
        : "border-red-700"
    }
    ${
      disabled
        ? "bg-gray-100 cursor-not-allowed focus:ring-0 focus:border-gray-300"
        : "focus:border-violet-500 focus:ring-2 focus:ring-violet-400 focus:outline-none focus:shadow-lg"
    }
  `}
          />
          {/* Custom display for file name or placeholder */}
          {type === "file" && (
            <span
              className={`absolute top-10 left-4 -translate-y-1/2 text-sm ${
                fileName ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {fileName || placeholder}
            </span>
          )}

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
            className="absolute flex items-center justify-center gap-[0.4rem] px-1 font-semibold pointer-events-none rounded-xl left-3"
          >
            {InputIcon && <InputIcon className="w-5 h-5 text-violet-600" />}{" "}
            {placeholder}
          </motion.label>
        </div>

        {haveBtn ? (
          <motion.button
            whileHover={
              disabled
                ? {}
                : {
                    backgroundColor: "#6736C2",
                    color: "#fff",
                    scale: 1.04,
                  }
            }
            whileTap={disabled ? {} : { scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`flex items-center justify-center w-12 border text-violet-500 rounded-r-2xl
              ${
                disabled
                  ? "bg-gray-200 border-gray-300 cursor-not-allowed"
                  : "cursor-pointer border-violet-400"
              }
            `}
            onClick={(e) => {
              if (!disabled && OnClick) OnClick(e);
            }}
            disabled={disabled}
          >
            {ButtonIcon && (
              <ButtonIcon
                className={`w-5 h-5 transition-colors duration-200 ${
                  disabled ? "text-gray-400" : "group-hover:text-white"
                }`}
              />
            )}
          </motion.button>
        ) : null}
      </div>
    </AnimatePresence>
  );
}
