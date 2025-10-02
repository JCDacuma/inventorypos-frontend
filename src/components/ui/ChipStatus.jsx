//  Generic Chip Status Component
import React from "react";

export default function ChipStatus({ status, variants = {} }) {
  const variant = variants[status] || null;

  if (!variant) return null;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${variant.bg} ${variant.text}`}
    >
      <span
        className={`w-[0.45rem] h-[0.45rem] mr-2 rounded-full ${variant.dot}`}
      ></span>
      {status}
    </span>
  );
}
