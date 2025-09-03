import Searchbar from "./Searchbar";
import { useMediaQuery } from "react-responsive";
import { ChevronsRight } from "lucide-react";

export default function MobileTable({ columns = [], data = [] }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col gap-2 h-1/1  ">
          <div className="h-1/1 flex px-2 flex-col overflow-auto gap-5">
            <header className="mb-1 flex mt-8 flex-col gap-3 sm:flex-row sm:items-end sm:justify-end">
              {/* export buttons here */}
              <Searchbar />
            </header>
            {data.length > 0 ? (
              data.map((row, i) => (
                <div
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  key={i}
                >
                  {columns.map((col) => (
                    <div
                      className="flex items-center flex-inline"
                      key={col.key}
                    >
                      <h2 className="text-base font-semibold text-slate-900 me-2">
                        {col.label}:
                      </h2>
                      <p className="mt-1 text-sm text-slate-700">
                        {" "}
                        {row[col.key]}
                      </p>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-center text-slate-500">No data found</p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center mb-2 h-10 w-full rounded-b-lg ">
            <div className="flex items-center   justify-center gap-3">
              <button className="flex text-violet-500 ">
                <ChevronsRight className="rotate-180 cursor-pointer" />
                <span className="cursor-pointer">Prev</span>
              </button>
              <div className="flex gap-1 cursor-pointer">
                <div className="flex justify-center items-center w-5 h-5 rounded-[0.3rem] bg-violet-400 p-3 text-white ">
                  <p>1</p>
                </div>
                <div className="flex cursor-pointer justify-center items-center w-5 h-5 rounded-[0.3rem] bg-violet-400 p-3 text-white ">
                  <p>2</p>
                </div>
                <div className="flex cursor-pointer justify-center items-center w-5 h-5 rounded-[0.3rem] bg-violet-400 p-3 text-white ">
                  <p>3</p>
                </div>
                <div className="flex cursor-pointer justify-center items-center w-5 h-5 rounded-[0.3rem] bg-violet-700 p-3 text-white ">
                  <p>4</p>
                </div>
                <div className="flex cursor-pointer justify-center items-center w-5 h-5 rounded-[0.3rem] bg-violet-400 p-3 text-white ">
                  <p>5</p>
                </div>
                <div className="flex cursor-pointer justify-center items-center w-5 h-5 rounded-[0.3rem] bg-violet-400 p-3 text-white ">
                  <p>6</p>
                </div>
              </div>

              <button className="flex cursor-pointer text-violet-500 ">
                <span className="cursor-pointer">Next</span>
                <ChevronsRight className="cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
