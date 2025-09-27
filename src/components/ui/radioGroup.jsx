import React from "react";

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
