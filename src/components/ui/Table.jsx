import { useMediaQuery } from "react-responsive";
import { ChevronsRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function DesktopTable({
  columns = [],
  data = [],
  setSelectedId,
}) {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isSmallDesktop = useMediaQuery({ maxWidth: 1168 });

  //Selected Id
  const [isChecked, setIsChecked] = useState([]);
  const [isAllChecked, setAllChecked] = useState(false);

  //Passing Id
  useEffect(() => {
    if (columns.some((col) => col.key === "Select")) {
      setSelectedId(isChecked);
    }
  }, [isChecked, setSelectedId]);

  //Select all checkbox state--------------------------
  const HandleAllSelect = () => {
    isAllChecked ? setAllChecked(false) : setAllChecked(true);
  };

  //Pass all id if select all checked------------------
  useEffect(() => {
    isAllChecked ? setIsChecked(data.map((row) => row.id)) : setIsChecked([]);
  }, [isAllChecked]);

  //Disabble select all------------------
  useEffect(() => {
    if (isChecked.length === 0) {
      setAllChecked(false);
    }
  }, [isChecked]);

  //ManualCheckBox State -----------------------------
  const HandleSelectItem = (id) => {
    setIsChecked((prev) =>
      prev.includes(id) ? prev.filter((data) => data !== id) : [...prev, id]
    );
    if (isChecked.length <= 0) {
      setAllChecked(false);
    }
  };

  return (
    <>
      {isDesktop ? (
        <div className="h-1/1">
          <div className="h-1/1 w-1/1 overflow-y-auto z-29 rounded-t-[0.3rem]">
            <table
              className={`border-collapse  ${
                isSmallDesktop ? `w-screen` : `w-1/1`
              } table-auto text-sm`}
            >
              {/* Table Header */}
              <thead className="sticky top-0 bg-violet-400 text-white z-20">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-4 py-3 text-center font-semibold bg-violet-400"
                    >
                      {col.key === "Select" ? (
                        <div className="inline-flex items-center">
                          <label className="flex items-center cursor-pointer relative">
                            <input
                              type="checkbox"
                              className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-purple-600 checked:border-purple-600"
                              id="check7"
                              checked={isAllChecked}
                              onChange={HandleAllSelect}
                            />
                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
                {data.length > 0 ? (
                  data.map((row, i) => (
                    <tr key={i} className="odd:bg-white even:bg-violet-100">
                      {columns.map((col) => (
                        <td key={col.key} className="px-4 py-4 text-center">
                          {/* If it's the Select column, render a checkbox */}
                          {col.key === "Select" ? (
                            <div className="inline-flex items-center">
                              <label className="flex items-center cursor-pointer relative z-4">
                                <input
                                  type="checkbox"
                                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-purple-600 checked:border-purple-600"
                                  id="check7"
                                  checked={isChecked.includes(row.id)}
                                  onChange={() => HandleSelectItem(row.id)}
                                />
                                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
                            row[col.key]
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
          </div>
          <div className="flex items-center justify-end pr-15 h-10 w-full rounded-b-lg ">
            <div className="flex items-center justify-center gap-3">
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
        </div>
      ) : (
        ""
      )}
    </>
  );
}
