import React from "react";
import ChipStatus from "@/components/ui/ChipStatus.jsx";

export function ActionStatus({ status }) {
  return (
    <ChipStatus
      status={status}
      variants={{
        Active: {
          bg: "bg-green-100",
          text: "text-green-700",
          dot: "bg-green-600",
        },
        Deactivated: {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          dot: "bg-yellow-600",
        },
      }}
    />
  );
}
