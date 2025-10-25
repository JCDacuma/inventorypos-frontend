import Searchbar from "./Searchbar";
import { useMediaQuery } from "react-responsive";
import { ChevronsRight } from "lucide-react";
import { useState, useEffect } from "react";
export default function MobileTable({
  columns = [],
  data = [],
  setSelectedId,
  selectedID,
}) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  //Id selection
  const HandleSelect = (id) => {
    setSelectedId((Selected) =>
      Selected.includes(id)
        ? selectedID.filter((curr) => curr !== id)
        : [...Selected, id]
    );
  };

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col gap-2 py-3 ">
          <div className="flex flex-col h-full gap-2 ">
            {data === null ? (
              <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200">
                <p className="text-center text-slate-500">Finding data...</p>
              </div>
            ) : data === false ? (
              <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200">
                <p className="text-center text-slate-500">
                  There is no data found
                </p>
              </div>
            ) : Array.isArray(data) && data.length > 0 ? (
              data.map((row, i) => {
                const hasSelectColumn = columns.some(
                  (col) => col.key === "Select"
                );

                return (
                  <div
                    className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200"
                    key={i}
                  >
                    {/* ✅ Show checkbox only if "Select" column exists */}
                    {hasSelectColumn && (
                      <label className="relative flex items-center justify-end w-full h-6 cursor-pointer z-4">
                        <input
                          type="checkbox"
                          className="w-6 h-6 transition-all border rounded shadow appearance-none cursor-pointer peer hover:shadow-md border-slate-300 checked:bg-purple-600 checked:border-purple-600"
                          checked={selectedID.includes(row.id)}
                          onChange={() => HandleSelect(row.id)}
                          id={`check-${row.id}`}
                        />
                        <span className="absolute text-white transform -translate-y-1/2 opacity-0 right-1 peer-checked:opacity-100 top-1/2 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            />
                          </svg>
                        </span>
                      </label>
                    )}

                    {columns
                      .filter((col) => col.key !== "Select")
                      .map((col) => {
                        const cellValue = row[col.key];
                        const isReactElement =
                          typeof cellValue === "object" && cellValue !== null;

                        return (
                          <div
                            className="flex items-center justify-between gap-2 py-1 flex-inline"
                            key={col.key}
                          >
                            <h2 className="text-base font-semibold text-slate-900 me-2">
                              {col.label}
                            </h2>

                            {isReactElement ? (
                              <div>{cellValue}</div>
                            ) : (
                              <p className="mt-1 text-sm text-slate-700">
                                {cellValue}
                              </p>
                            )}
                          </div>
                        );
                      })}
                  </div>
                );
              })
            ) : (
              <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-200">
                <p className="text-center text-slate-500">No data found</p>
              </div>
            )}
          </div>

          {/* Pagination buttons (unchanged) */}
          <div className="flex items-center justify-center gap-3 ">
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
      ) : (
        ""
      )}
    </>
  );
}
