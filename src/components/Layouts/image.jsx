import React from "react";

export function Image({ src, alt = "Image", size = "3.5rem" }) {
  const fallback = "https://via.placeholder.com/80x80.png?text=No+Image";

  return (
    <div
      className="flex items-center  justify-center rounded overflow-hidden border bg-gray-100"
      style={{ width: size, height: size }}
    >
      <img
        src={src || fallback}
        alt={alt}
        className="object-cover w-full h-full"
        onError={(e) => (e.currentTarget.src = fallback)}
      />
    </div>
  );
}
