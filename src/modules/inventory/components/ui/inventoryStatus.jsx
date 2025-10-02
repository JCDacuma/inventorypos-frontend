import React from "react";
import ChipStatus from "@/components/ui/ChipStatus.jsx";

// Inventory Status
export function InventoryStatus({ status }) {
  return (
    <ChipStatus
      status={status}
      variants={{
        "In Stock": {
          bg: "bg-green-100",
          text: "text-green-700",
          dot: "bg-green-600",
        },
        "Low Stock": {
          bg: "bg-amber-100",
          text: "text-amber-700",
          dot: "bg-amber-500",
        },
        "Out of Stock": {
          bg: "bg-red-100",
          text: "text-red-700",
          dot: "bg-red-600",
        },
      }}
    />
  );
}

// Batch Stock Status
export function BatchStockStatus({ status }) {
  return (
    <ChipStatus
      status={status}
      variants={{
        Active: {
          bg: "bg-green-100",
          text: "text-green-700",
          dot: "bg-green-600",
        },
        Expired: {
          bg: "bg-cyan-100",
          text: "text-cyan-700",
          dot: "bg-cyan-500",
        },
        "Low Stock": {
          bg: "bg-amber-100",
          text: "text-amber-700",
          dot: "bg-amber-500",
        },
        "Out of Stock": {
          bg: "bg-red-100",
          text: "text-red-700",
          dot: "bg-red-600",
        },
      }}
    />
  );
}
