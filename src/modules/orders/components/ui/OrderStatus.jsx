import React from "react";
import ChipStatus from "@/components/ui/ChipStatus.jsx";

// Order Management Status
export function OrderManagementStatus({ status }) {
  return (
    <ChipStatus
      status={status}
      variants={{
        Pending: {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          dot: "bg-yellow-500",
        },
        Ordered: {
          bg: "bg-blue-100",
          text: "text-blue-700",
          dot: "bg-blue-500",
        },
        "In Transit": {
          bg: "bg-indigo-100",
          text: "text-indigo-700",
          dot: "bg-indigo-500",
        },
        "Partially Received": {
          bg: "bg-orange-100",
          text: "text-orange-700",
          dot: "bg-orange-500",
        },
        Received: {
          bg: "bg-green-100",
          text: "text-green-700",
          dot: "bg-green-500",
        },
        Cancelled: {
          bg: "bg-red-100",
          text: "text-red-700",
          dot: "bg-red-500",
        },
        Returned: {
          bg: "bg-gray-100",
          text: "text-gray-700",
          dot: "bg-gray-500",
        },
      }}
    />
  );
}

// Order History Status
export function OrderHistoryStatus({ status }) {
  return (
    <ChipStatus
      status={status}
      variants={{
        Received: {
          bg: "bg-green-100",
          text: "text-green-700",
          dot: "bg-green-600",
        },
        Cancelled: {
          bg: "bg-red-100",
          text: "text-red-700",
          dot: "bg-red-600",
        },
        Returned: {
          bg: "bg-cyan-100",
          text: "text-cyan-700",
          dot: "bg-cyan-500",
        },
      }}
    />
  );
}
