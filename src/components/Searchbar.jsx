import { Search } from "lucide-react";

export default function Searchbar() {
  return (
    <div className="relative w-1/1 sm:w-60">
      {<Search className="absolute mt-2 ml-2 text-violet-200" />}
      <input
        placeholder="   Search here..."
        className=" w-full rounded-2xl border pl-9 border-slate-300 bg-white py-2.5 pr-10 text-sm shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
      />
    </div>
  );
}
