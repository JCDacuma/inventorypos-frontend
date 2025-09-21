import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Undo2, Truck, Search } from "lucide-react";

export default function SearchAndControl({ setOpenSupplier }) {
  const isDesktop = useMediaQuery({ minWidth: 968 });

  return (
    <div className="flex items-center justify-between gap-4 px-1 py-2 bg-white rounded-sm sm:px-5 md:shadow-md shadow-gray-100 lg:py-4">
      <div className="flex items-center justify-between w-full gap-2 px-1 py-2 shadow-sm sm:px-3 rounded-xl">
        {/* Back button */}
        <Link to={"/product-orders"}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05, color: "#3c2350" }}
            className="flex items-center gap-1 ml-1 font-medium transition-colors text-violet-600 hover:text-violet-700"
          >
            <Undo2 size={24} className="stoke-2" />
            <span className="hidden sm:flex">Back</span>
          </motion.button>
        </Link>

        <div className="flex items-center justify-end w-full gap-2 sm:gap-1">
          {/*------- Supplier Info (Desktop only) --------------*/}
          <button
            onClick={() => setOpenSupplier(true)}
            className={`${
              isDesktop ? "flex" : "hidden"
            } items-center justify-center w-11 h-10 rounded-full 
                            bg-gradient-to-r from-violet-500 to-purple-600 
                            text-white shadow-md
                            hover:from-violet-600 hover:to-purple-700 hover:shadow-lg hover:scale-110
                            active:scale-95 active:from-violet-700 active:to-purple-800 active:shadow-md
                            focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2
                            transition-all duration-200 ease-in-out`}
          >
            <Truck size={20} className="stroke-[2.5] drop-shadow-sm" />
          </button>

          {/* Search Bar*/}
          <div className="relative flex w-full sm:w-1/2 lg:w-2/5 2xl:w-1/4">
            <Search className="absolute -translate-y-1/2 left-3 top-1/2 text-violet-300" />
            <input
              placeholder="Search here..."
              className="w-full rounded-2xl pl-10 pr-3 border border-gray-300 bg-white py-2.5 text-sm shadow-sm outline-none
                          placeholder:text-slate-400
                          focus:border-violet-600 focus:ring-2 focus:ring-violet-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
