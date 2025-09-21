import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { ArrowBigRight, ShoppingBasket } from "lucide-react";

export default function SupplierSectionMobile({
  //Data and functionality
  supplier,
  selectedSupplier,
  setSelectedSupplier,
  order,
  totalItem,
  setOrderDate,
  setArrivalDate,
  orderDate,
  arrivalDate,
  openSummaryModal,
}) {
  const isDesktop = useMediaQuery({ minWidth: 968 });

  return (
    <div
      className={` ${
        isDesktop ? `hidden` : `flex`
      } flex-col justify-center gap-4 shadow-md shadow-gray-200 p-4  rounded-xl bg-white  `}
    >
      {/* Supplier Dropdown */}
      <div className="flex flex-col w-full">
        <label className="mb-1 text-sm font-medium text-violet-700">
          Supplier
        </label>
        <div className="flex items-center justify-center w-full gap-1 ">
          <select
            className="w-full px-3 py-2 text-sm border rounded-lg border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
            disabled={order.length > 0}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedSupplier(value === "" ? null : Number(value));
            }}
            value={selectedSupplier.id || ""}
          >
            <option value="">Choose Supplier</option>
            {supplier.map(
              (sup) =>
                sup.status !== "Inactive" && (
                  <option key={sup.id} value={sup.id}>
                    {sup.suppliername}
                  </option>
                )
            )}
          </select>

          {/*------------- Order Summary Button (Mobile only) ----------------*/}
          <div className="relative ">
            <button
              onClick={() => openSummaryModal(true)}
              className={`bg-violet-400 ${
                isDesktop ? "hidden" : "flex"
              } items-center justify-center w-13 h-10 rounded-full 
                          bg-violet-530 text-white shadow-md
                          hover:bg-violet-600 hover:shadow-lg hover:scale-110
                          active:scale-95 active:shadow-sm
                          transition-all duration-200 ease-in-out`}
            >
              <ShoppingBasket size={18} />
            </button>
            {order.length > 0 ? (
              <div className="absolute bg-red-900 text-white text-[0.55rem] text-center items-center rounded-4xl px-2 py-1 w-auto ml-7 bottom-7 ">
                <p>{totalItem}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="flex items-center justify-between gap-3">
        {/* Order Date */}
        <div className="flex flex-col w-1/2">
          <label className="mb-1 text-sm font-medium text-violet-700">
            Order Date
          </label>
          <input
            type="date"
            className="px-2 py-2 text-sm border rounded-lg border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
            onChange={(e) => setOrderDate(e.target.value)}
            value={orderDate}
          />
        </div>

        <ArrowBigRight
          className="hidden mt-6 text-violet-500 shrink-0 sm:flex"
          size={24}
        />

        {/* Expected Arrival */}
        <div className="flex flex-col w-1/2">
          <label className="mb-1 text-sm font-medium text-violet-700">
            Expected Arrival
          </label>
          <input
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            type="date"
            className="px-2 py-2 text-sm border rounded-lg border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
        </div>
      </div>
    </div>
  );
}
