import { useState } from "react";
import Modal from "@/components/Layouts/modal";
import { SweetAlert } from "@/utils/sweetalert";
import { ArrowBigRight } from "lucide-react";
import { motion } from "framer-motion";
export default function SupplierModal({
  isOpen,
  onClosed,
  supplier,
  setSelectedSup,
  selectedSupplier,
  order,
  totalItem,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClosed={onClosed}
      ModalTitle="Supplier Info"
      margin="mb-20"
    >
      {/* -------- Supplier Info (Mobile Only) --------- */}
      <div
        className={` flex flex-col justify-center gap-4 shadow-md shadow-gray-200 px-8 py-10 rounded-xl bg-white  `}
      >
        {/* Supplier Dropdown */}
        <div className="flex flex-col w-full mb-5">
          <label className="mb-1 text-sm font-medium text-violet-700">
            Supplier
          </label>
          <div className="flex items-center justify-center w-full gap-1 ">
            <div className="flex w-full gap-1 ">
              <select
                className="w-full px-3 py-2 text-sm border rounded-lg border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                disabled={order.length > 0}
                onChange={(e) => {
                  if (e.target.value !== "placeholder") {
                    setSelectedSup(e.target.value);
                  }
                }}
                value={selectedSupplier.id || "placeholder"}
              >
                <option value="placeholder" disabled>
                  Choose Supplier
                </option>
                {supplier.map((sup) =>
                  sup.status !== "Inactive" ? (
                    <option key={sup.id} value={sup.id}>
                      {sup.suppliername}
                    </option>
                  ) : null
                )}
              </select>
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
              type="date"
              className="px-2 py-2 text-sm border rounded-lg border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>
        </div>
        <div className="w-[100%] flex justify-center mt-2">
          <motion.button
            onClick={onClosed}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.9 }}
            className="
                w-[68%] p-2 rounded-xl font-bold
                text-white bg-violet-600 
                transition-all duration-300 ease-in-out
                hover:bg-violet-700 
                shadow-md hover:shadow-lg
                focus:outline-none 
                focus:ring-4 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-white
                hover:ring-2 hover:ring-violet-400 hover:ring-offset-2 hover:ring-offset-white
              cursor-pointer"
          >
            Okay
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
