import { useState } from "react";
import { EmptyStateDefault } from "@/components/ui/emptyState.jsx";
import { motion } from "framer-motion";
import { FolderSearch, CirclePlus, Unlink, DiamondPlus } from "lucide-react";

export function LayoutProductSupplier({
  openAssign,
  setAssign,
  assignedSupplier,
  HandleLinkUnlink,
  supplier,
  productname,
}) {
  const notFound = assignedSupplier === false;
  const noSupplier = supplier === false;
  const headerTitle = openAssign ? "Supplier List" : "Assigned Suppliers";
  const headerBtnTitle = openAssign ? "Current" : "Assign";

  const modalNavFunction = openAssign
    ? () => setAssign(false)
    : () => setAssign(true);

  return (
    <main className="flex flex-col h-auto gap-4 px-2 py-4 ">
      <div className="flex items-center justify-between px-2 text-violet-600">
        <h4 className="font-bold">{headerTitle}</h4>
        <button
          onClick={() => modalNavFunction()}
          type="button"
          className="px-5 py-2.5 gap-2 flex items-center justify-center text-xs sm:text-sm font-medium text-white bg-violet-600 rounded-xl shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-200"
        >
          <span>{headerBtnTitle}</span>
          <CirclePlus size={18} />
        </button>
      </div>

      {!openAssign ? (
        // ================= Currently Assigned Suppliers =================
        assignedSupplier ? (
          <section className="flex flex-col gap-3 h-[calc(100vh-300px)]  2xl:h-[calc(100vh-400px)] overflow-auto">
            <div className="space-y-3">
              {assignedSupplier.map((assigned) => (
                <div
                  key={assigned.id}
                  className="flex items-center justify-between px-6 py-6 transition-all duration-200 bg-white border border-gray-200 shadow-lg rounded-2xl hover:bg-violet-50"
                >
                  <div className="flex flex-col">
                    <strong className="text-base font-medium text-violet-800">
                      {assigned.suppliername}
                    </strong>
                    <span className="flex flex-col text-sm text-violet-500 sm:flex-row sm:items-center sm:gap-1">
                      <span>{assigned.address}</span>
                      <span className="hidden sm:flex"> / </span>
                      <span className="font-semibold">
                        Shipping Fee: {assigned.shipping_fee}
                      </span>
                    </span>
                    <span className="text-sm text-violet-300">
                      Contact: {assigned.contact}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      HandleLinkUnlink(
                        assigned.id,
                        "Unnasign",
                        assigned.suppliername
                      )
                    }
                    className="p-2 transition-all cursor-pointer duration-200 bg-orange-100 rounded-full shadow-sm hover:bg-orange-600 hover:text-white"
                    title="Remove Supplier"
                  >
                    <Unlink size={22} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        ) : (
          // ================= Empty / Loading State =================
          <EmptyStateDefault
            title={notFound ? "No supplier found" : "Finding supplier..."}
            message={
              notFound
                ? "There are no suppliers assigned to this product."
                : "Please wait while we find the supplier."
            }
            icon={notFound ? "FolderX" : "FolderSearch"}
          />
        )
      ) : null}

      {openAssign ? (
        // ================= All Supplier List =================
        <section className="flex flex-col gap-3 h-[calc(100vh-300px)]  2xl:h-[calc(100vh-400px)] overflow-auto">
          <div className="space-y-3">
            {supplier?.length ? (
              supplier.map((supplier) => (
                <div
                  key={supplier.id}
                  className="flex items-center justify-between px-6 py-6 transition-all duration-200 bg-white border border-gray-200 shadow-lg rounded-2xl hover:bg-violet-50"
                >
                  <div className="flex flex-col">
                    <strong className="text-base font-medium text-violet-800">
                      {supplier.suppliername}
                    </strong>
                    <div className="flex flex-col text-sm text-violet-500 sm:flex-row sm:items-center sm:gap-1">
                      <span>{supplier.address}</span>
                      <span className="hidden sm:flex"> / </span>
                      <span className="text-sm text-violet-500">
                        Shipping Fee: {supplier.shipping_fee}
                      </span>
                    </div>

                    <span className="text-sm text-violet-300">
                      Contact: {supplier.contact}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      HandleLinkUnlink(
                        supplier.id,
                        "Assign",
                        supplier.supplierName
                      )
                    }
                    className="p-2 transition-all cursor-pointer duration-200 rounded-full shadow-sm bg-violet-100 hover:bg-violet-600 hover:text-white"
                    title="Assign Supplier"
                  >
                    <DiamondPlus size={22} />
                  </button>
                </div>
              ))
            ) : (
              <EmptyStateDefault
                title={
                  noSupplier
                    ? "No supplier Available"
                    : "Finding Available Supplier..."
                }
                message={
                  noSupplier
                    ? "Please try to refresh or try again later"
                    : "please wait while we get supplier for you"
                }
                icon="FolderX"
              />
            )}
          </div>
        </section>
      ) : null}
    </main>
  );
}
