import React from "react";
import ChipStatus from "@/components/ui/ChipStatus.jsx";

export function SupplierStatus({ status }) {
  return (
    <ChipStatus
      status={status}
      variants={{
        Active: {
          bg: "bg-green-100",
          text: "text-green-700",
          dot: "bg-green-600",
        },
        Inactive: {
          bg: "bg-orange-100",
          text: "text-orange-700",
          dot: "bg-orange-500",
        },
      }}
    />
  );
}
