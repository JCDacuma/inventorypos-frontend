import React from "react";
import ChipStatus from "@/components/ui/ChipStatus.jsx";

// Product Status
export function ProductStatus({ status }) {
  return (
    <ChipStatus
      status={status}
      variants={{
        Active: {
          bg: "bg-green-100",
          text: "text-green-700",
          dot: "bg-green-600",
        },
        Inactive: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-600" },
      }}
    />
  );
}

// Promo Status
export function PromoStatus({ status }) {
  return (
    <ChipStatus
      status={status}
      variants={{
        Active: {
          bg: "bg-green-100",
          text: "text-green-700",
          dot: "bg-green-600",
        },
        Upcoming: {
          bg: "bg-cyan-100",
          text: "text-cyan-700",
          dot: "bg-cyan-600",
        },
        Ended: {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          dot: "bg-yellow-600",
        },
        Inactive: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-600" },
      }}
    />
  );
}
