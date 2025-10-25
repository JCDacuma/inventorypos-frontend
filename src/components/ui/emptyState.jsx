import React from "react";
import * as LucideIcons from "lucide-react";

/**
 * Reusable Empty State Component
 *
 * @param {string} title - Main title text
 * @param {string} message - Optional message text
 * @param {string} icon - Lucide icon name (e.g., "PackageX", "FolderOpen")
 */
export function EmptyStateDefault({ title, message, icon = "PackageX" }) {
  const IconComponent = LucideIcons[icon] || LucideIcons.PackageX;

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center border shadow-sm bg-violet-50 rounded-2xl border-violet-100">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-violet-100 text-violet-600">
        <IconComponent size={32} strokeWidth={1.75} />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-violet-700">{title}</h3>
      {message && <p className="max-w-sm text-sm text-violet-500">{message}</p>}
    </div>
  );
}
