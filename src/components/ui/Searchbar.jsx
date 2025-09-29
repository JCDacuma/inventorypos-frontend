import { useState } from "react";
import { Search, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function Searchbar() {
  return (
    <div className="relative flex w-full sm:w-[90%] md:w-[50%] lg:w-[35%] 2xl:w-[25%]">
      {/* Search icon (left) */}
      <Search className="absolute -translate-y-1/2 left-3 top-1/2 text-violet-400" />

      {/* Clear icon (right) */}
      <X className="absolute -translate-y-1/2 cursor-pointer right-3 top-1/2 text-violet-400" />

      <input
        placeholder="Search here..."
        className="w-full py-3 pl-10 pr-10 text-sm bg-white border rounded-full shadow-sm outline-none sm:py-4 border-slate-300 placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
      />
    </div>
  );
}
