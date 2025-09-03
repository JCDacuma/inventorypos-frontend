import Searchbar from "./Searchbar";
import { useMediaQuery } from "react-responsive";
import { ChevronsRight } from "lucide-react";

export default function DesktopTable({ columns = [], data = [] }) {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <>
      {isDesktop ? (
        <div className="  flex-column h-1/1 m-0 md:block  rounded-2xl pb-27  bg-white shadow-md p-5 ">
          <header className="  mb-6  flex flex-row gap-3 sm:flex-row sm:items-end sm:justify-end ">
            {/* export buttons here */}
            <Searchbar />
          </header>

          <div className="h-1/1 overflow-auto z-29">
            <table className="w-full table-auto text-sm ">
              <thead className="border-collapse sticky top-0 bg-violet-400  text-white z-10">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-4 py-3 text-center font-semibold "
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.length > 0 ? (
                  data.map((row, i) => (
                    <tr key={i} className="odd:bg-white even:bg-violet-100">
                      {columns.map((col) => (
                        <td key={col.key} className="px-4 py-4 text-center">
                          {row[col.key]}
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
