import { useState } from "react";
import { BsFileEarmarkPdf, BsFileEarmarkExcel } from "react-icons/bs";

export default function ExportButton() {
  return (
    <div className="flex justify-center items-center gap-3">
      <button className="bg-violet-400 text-white flex text-sm py-2 px-4 rounded-3xl">
        <BsFileEarmarkPdf className={"h-5 w-5 "} />
        Export PDF
      </button>
      <button className=" bg-violet-400 text-white flex text-sm  py-2 px-4 rounded-3xl">
        <BsFileEarmarkExcel className={"h-5 w-5"} />
        Export Excel
      </button>
    </div>
  );
}
