import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
export function DefaultDropDown({
  items = [],

  SetSelected = () => {},
  placeholder = "Select an option",
  maxHeight = "200px",
  selectedValue = "",
  //Layout
  icons = null,
  BtnIcons = null,
  OnClick = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const dropDown = useRef(null);

  const Icons = icons;
  const ButtoIcons = BtnIcons;
  // Sync external selectedValue to internal state
  useEffect(() => {
    setSelectedItem(selectedValue || "");
  }, [selectedValue]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    SetSelected(item);
  };

  useEffect(() => {
    const HandleClickedOutside = (event) => {
      if (dropDown.current && !dropDown.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", HandleClickedOutside);

    return () =>
      document.removeEventListener("mousedown", HandleClickedOutside);
  }, []);

  return (
    <div className="relative w-full " ref={dropDown}>
      {/* Dropdown Button */}
      <div className="flex w-full">
        <div
          className={`w-full flex px-4 py-3 select-none text-left bg-white border border-violet-300 shadow-sm cursor-pointer  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            BtnIcons === null || BtnIcons === undefined
              ? `rounded-2xl`
              : `rounded-l-2xl`
          }`}
          onClick={toggleDropdown}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-[0.8rem]">
              {icons !== null && icons !== undefined
                ? Icons && <Icons className="text-violet-500" />
                : null}
              <span
                className={selectedItem ? "text-gray-900" : "text-gray-500"}
              >
                {selectedItem || placeholder}
              </span>
            </div>

            <svg
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
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
          </div>
        </div>
        {ButtoIcons ? (
          <motion.div
            whileHover={{
              backgroundColor: "#6736C2",
              color: "#fff",
              scale: 1.04,
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center font-bold border cursor-pointer rounded-r-xl w-15 text-violet-500"
            onClick={OnClick}
          >
            {ButtoIcons && <ButtoIcons />}
          </motion.div>
        ) : null}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1 overflow-y-auto" style={{ maxHeight }}>
            {items.length > 0 ? (
              items.map((item, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ${
                    selectedItem === item
                      ? "bg-blue-100 text-blue-900"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                  }`}
                  onClick={() => handleItemSelect(item)}
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No items available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
