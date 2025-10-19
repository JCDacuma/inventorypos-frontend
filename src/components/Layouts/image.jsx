import React from "react";

export function Image({ src, alt = "Image", size = "3.5rem" }) {
  const fallback = "public/No_Image_Available.jpg";

  return (
    <div
      className="flex items-center justify-center overflow-hidden bg-gray-100 border rounded"
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
