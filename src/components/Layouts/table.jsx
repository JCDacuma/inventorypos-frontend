import { useMediaQuery } from "react-responsive";
import { ChevronsRight } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { HorizontalSlider } from "@/utils/slider.jsx";
import { EmptyStateDefault } from "@/components/ui/emptyState.jsx";
export default function Table({
  columns = [],
  data = [],
  setSelectedId,
  selectedID,
}) {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const [isAllChecked, setAllChecked] = useState(false);

  //Select all checkbox state--------------------------
  const HandleAllSelect = () => {
    isAllChecked ? setAllChecked(false) : setAllChecked(true);
  };
  //Pass all id if select all checked------------------
  useEffect(() => {
    const hasSelectColumn = columns.some((col) => col.key === "Select");
    if (!hasSelectColumn) return;
    isAllChecked ? setSelectedId(data.map((row) => row.id)) : setSelectedId([]);
  }, [isAllChecked]);

  //Disable select all------------------
  useEffect(() => {
    const hasSelectColumn = columns.some((col) => col.key === "Select");
    if (!hasSelectColumn) return;
    if (selectedID.length === 0) {
      setAllChecked(false);
    }
  }, [selectedID]);

  //ManualCheckBox State -----------------------------
  const HandleSelectItem = (id) => {
    setSelectedId((prev) =>
      prev.includes(id) ? prev.filter((data) => data !== id) : [...prev, id]
    );
    if (selectedID.length <= 0) {
      setAllChecked(false);
    }
  };

  return (
    <>
      {isDesktop ? (
        <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg z-35">
          <HorizontalSlider
            className={
              "w-full max-h-[calc(100vh-140px)] min-h-[calc(100vh-300px)] overflow-x-auto overflow-y-auto cursor-grab active:cursor-grabbing rounded-lg"
            }
          >
            <table
              className={` select-none border-collapse table-auto text-sm w-full rounded-lg`}
            >
              {/* Table Header */}
              <thead className="sticky top-0 z-20 text-white bg-violet-400">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="flex-shrink-0 px-4 py-3 font-semibold text-center bg-violet-400 whitespace-nowrap"
                    >
                      {col.key === "Select" ? (
                        <div className="inline-flex items-center">
                          <label className="relative flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-5 h-5 transition-all border rounded shadow appearance-none cursor-pointer peer hover:shadow-md border-slate-300 checked:bg-purple-600 checked:border-purple-600"
                              id="check7"
                              checked={isAllChecked}
                              onChange={HandleAllSelect}
                            />
                            <span className="absolute text-white transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2">
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
                        </div>
                      ) : (
                        col.label
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {data === null ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-6 text-center text-slate-500"
                    >
                      Finding data...
                    </td>
                  </tr>
                ) : data === false ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-6 text-center text-slate-500"
                    >
                      There is no data found
                    </td>
                  </tr>
                ) : Array.isArray(data) && data.length > 0 ? (
                  data.map((row, i) => (
                    <tr key={i} className="odd:bg-white even:bg-violet-100 ">
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className="px-4 py-4 text-center whitespace-nowrap"
                        >
                          {/* If it's the Select column, render a checkbox */}
                          {col.key === "Select" ? (
                            <div className="inline-flex items-center">
                              <label className="relative flex items-center cursor-pointer z-4">
                                <input
                                  type="checkbox"
                                  className="w-5 h-5 transition-all border rounded shadow appearance-none cursor-pointer peer hover:shadow-md border-slate-300 checked:bg-purple-600 checked:border-purple-600"
                                  id="check7"
                                  checked={selectedID.includes(row.id)}
                                  onChange={() => HandleSelectItem(row.id)}
                                />
                                <span className="absolute text-white transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2">
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
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              {row[col.key]}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-6 text-center text-slate-500"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </HorizontalSlider>
          <div className="flex items-center justify-end w-full gap-3 py-5 pr-10 ">
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
              <div className="flex cursor-pointer justify-center items-center w-5 h-5 rounded-[0.3rem] bg-violet-400 p-3 text-white ">
                <p>7</p>
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
