import { useState } from "react";
import { Search, X, Funnel } from "lucide-react";
import { DefaultDropDown } from "@/components/ui/dropdown.jsx";
import { useMediaQuery } from "react-responsive";

export default function Searchbar({ hasFilter = false, searchLayout = "" }) {
  const isDesktop = useMediaQuery({ minWidth: 668 });

  const filterSizing = hasFilter
    ? `xl:w-[60%] 2xl:w-[30%] ${searchLayout}`
    : ` 2xl:w-[25%] ${searchLayout}`;

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div
      className={`flex items-center w-full sm:w-[100%]  md:w-[100%]  ${filterSizing} gap-2`}
    >
      {/* Category Filter */}
      {hasFilter ? (
        <div>
          <DefaultDropDown
            placeholder="Filter"
            selectedValue={""}
            CharacterShow={10}
            selectedDisplay={isDesktop ? true : false}
            //Layout
            icons={Funnel}
            showDropicon={false}
          />
        </div>
      ) : null}

      {/* Search Box */}
      <div className="relative flex w-full sm:w-70 md:w-80 lg:w-90 2xl:w-[100%] ">
        <Search className="absolute -translate-y-1/2 left-3 top-1/2 text-violet-400" />

        {query && (
          <X
            className="absolute -translate-y-1/2 cursor-pointer right-3 top-1/2 text-violet-400 hover:text-violet-600"
            onClick={() => setQuery("")}
          />
        )}

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search here..."
          className="w-full py-[1rem] pl-10 pr-10 text-sm transition bg-white border rounded-full shadow-sm outline-none border-violet-300 placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
        />
      </div>
    </div>
  );
}
