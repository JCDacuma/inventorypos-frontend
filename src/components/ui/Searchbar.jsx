import { Search, Funnel } from "lucide-react";
import { useMediaQuery } from "react-responsive";
export default function Searchbar() {
  const isMobile = useMediaQuery({ maxWidth: 667 });
  const BigDesktop = useMediaQuery({ minWidth: 1468 });
  const SmallDesktop = useMediaQuery({ maxWidth: 868 });
  return (
    <div
      className={` relative flex w-full sm:w-[90%] md:w-[50%] lg:w-[35%] 2xl:w-[25%]`}
    >
      {<Search className="absolute mt-[0.7rem] ml-2 text-violet-200" />}
      <input
        placeholder="   Search here..."
        className="py-3 text-sm bg-white border shadow-sm outline-none rounded-[100rem] w-1/1 pl-9 border-slate-300 ring-0 placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
      />
    </div>
  );
}
