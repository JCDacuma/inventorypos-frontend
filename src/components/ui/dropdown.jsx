import { useState, useEffect } from "react";

export function DefaultDropDown({
  items = [],
  SetSelected = () => {},
  placeholder = "Select an option",
  maxHeight = "200px",
  selectedValue = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

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

  return (
    <div className="relative w-full">
      {/* Dropdown Button */}
      <div
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onClick={toggleDropdown}
      >
        <div className="flex items-center justify-between">
          <span className={selectedItem ? "text-gray-900" : "text-gray-500"}>
            {selectedItem || placeholder}
          </span>
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
