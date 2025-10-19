import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HorizontalSlider } from "@/utils/slider.jsx";
import { useMediaQuery } from "react-responsive";

export function DefaultDropDown({
  items = [],
  SetSelected = () => {},
  placeholder = "Select an option",
  maxHeight = "200px",
  selectedValue = "",
  CharacterShow = 30,
  icons = null,
  showDropicon = true,
  selectedDisplay = true,
  BtnIcons = null,
  OnClick = () => {},
  validated = true,
  disabled = false,
  name = "",
}) {
  const isMobile = useMediaQuery({ maxWidth: 468 });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const dropDown = useRef(null);

  const Icons = icons;
  const ButtonIcons = BtnIcons;

  // Sync external selected value with internal state
  useEffect(() => {
    setSelectedItem(selectedValue || "");
  }, [selectedValue]);

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleItemSelect = (item) => {
    if (disabled) return;
    setSelectedItem(item);
    setIsOpen(false);
    SetSelected(item);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDown.current && !dropDown.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative w-full ${
        disabled ? "opacity-60 select-none cursor-not-allowed" : ""
      }`}
      ref={dropDown}
      data-name={name}
    >
      {/* Dropdown Trigger */}
      <div className="flex w-full">
        <div
          onClick={toggleDropdown}
          className={`flex w-full items-center hover:border-violet-700 justify-between px-4 py-[0.7rem] lg:py-[0.85rem] bg-white select-none shadow-sm transition-colors duration-200
            ${validated ? "border border-violet-200" : "border border-red-700"}
            ${BtnIcons ? "rounded-l-2xl" : "rounded-2xl"}
            ${
              disabled
                ? "bg-gray-100 cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
            }`}
        >
          {/* Left (icon + text) */}
          <div className="flex items-center gap-2 truncate">
            {icons && Icons && <Icons className="text-violet-500" size={20} />}
            {selectedDisplay && (
              <span
                className={`truncate ${
                  selectedItem ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {selectedItem
                  ? selectedItem.length > CharacterShow
                    ? selectedItem.slice(0, CharacterShow) + "…"
                    : selectedItem
                  : placeholder}
              </span>
            )}
          </div>

          {/* Dropdown arrow */}
          {showDropicon && (
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>

        {/* Right-side button (optional) */}
        {ButtonIcons && (
          <motion.div
            whileHover={
              disabled
                ? {}
                : {
                    backgroundColor: "#6736C2",
                    color: "#fff",
                    scale: 1.04,
                  }
            }
            whileTap={disabled ? {} : { scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={(e) => {
              if (!disabled) OnClick(e);
            }}
            className={`flex items-center justify-center w-12 border border-l-0 rounded-r-2xl
              ${
                disabled
                  ? "bg-gray-200 border-gray-300 cursor-not-allowed"
                  : "cursor-pointer border-violet-300 text-violet-500"
              }`}
          >
            <ButtonIcons />
          </motion.div>
        )}
      </div>

      {/* Floating Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute left-0 top-full z-30 mt-2 w-full min-w-[220px] max-h-50 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
          <HorizontalSlider
            className="py-1 overflow-y-auto"
            style={{ maxHeight: isMobile ? "180px" : maxHeight }}
          >
            {items.length > 0 ? (
              items.map((item, index) => (
                <div
                  key={index}
                  title={item}
                  onClick={() => handleItemSelect(item)}
                  className={`px-4 py-2 text-sm truncate select-none transition-colors duration-150
                    ${
                      selectedItem === item
                        ? "bg-violet-100 text-violet-900"
                        : "text-gray-700 hover:bg-violet-50 hover:text-violet-900 cursor-pointer"
                    }`}
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No items available
              </div>
            )}
          </HorizontalSlider>
        </div>
      )}
    </div>
  );
}
