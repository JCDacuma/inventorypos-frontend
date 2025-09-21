import { Search, Funnel } from "lucide-react";
import { useMediaQuery } from "react-responsive";
export default function Searchbar() {
  const isMobile = useMediaQuery({ maxWidth: 667 });
  const BigDesktop = useMediaQuery({ minWidth: 1468 });
  const SmallDesktop = useMediaQuery({ maxWidth: 868 });
  return (
    <div
      className={` relative flex ${
        isMobile
          ? `w-1/1` /* Mobile 667 device and below */
          : BigDesktop
          ? `w-1/5` /* BigDesktop 1468 device and above*/
          : SmallDesktop
          ? `w-1/1` /* Small Desktop 868 and below but not below 667 */
          : `w-1/3` /* 868 and above but not above 1468  */
      } `}
    >
      {<Search className="absolute mt-[0.7rem] ml-2 text-violet-200" />}
      <input
        placeholder="   Search here..."
        className="py-3 text-sm bg-white border shadow-sm outline-none  w-1/1 rounded-2xl pl-9 border-slate-300 ring-0 placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
      />
    </div>
  );
}
