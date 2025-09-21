import { useState, useEffect } from "react";
import { Modal } from "@/components/Layouts/modal";
import { DefaultDropDown } from "@/components/ui/dropdown.jsx";
import { SweetAlert } from "@/utils/sweetalert";
import { ArrowBigRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SupplierModal({
  //Modal State
  isOpen,
  onClosed,
  //Data and functionality
  supplier,
  SubmitSupplier,
  selectedSupplier,
  order,
  setOrderDate,
  setArrivalDate,
  orderDate,
  arrivalDate,
}) {
  const [localOrderDate, setLocalOrderDates] = useState("");
  const [localArrivalDate, setLocalArrivalDate] = useState("");
  const [selectedLocalSupplier, setLocalselectedSuppliers] = useState(null);
  const [selectedSupplierName, setSelectedSupplierName] = useState("");

  // Sync parent -> local (only when parent changes externally)
  useEffect(() => {
    if (orderDate !== localOrderDate) setLocalOrderDates(orderDate || "");
    if (arrivalDate !== localArrivalDate)
      setLocalArrivalDate(arrivalDate || "");
  }, [orderDate, arrivalDate]);

  // ✅ Fixed: Properly check if selectedSupplier exists and has an id
  useEffect(() => {
    if (selectedSupplier && selectedSupplier.id) {
      setLocalselectedSuppliers(selectedSupplier.id);
      setSelectedSupplierName(selectedSupplier.suppliername || "");
    } else {
      setLocalselectedSuppliers(null);
      setSelectedSupplierName("");
    }
  }, [selectedSupplier]);

  // Extract supplier names safely
  const supplierNames = supplier?.map((sup) => sup.suppliername) || [];

  // Handle supplier selection
  const HandleSupplierSelection = (supplierName) => {
    setSelectedSupplierName(supplierName);

    // Find the supplier object by name
    const supplierSelected = supplier?.find(
      (sup) => sup.suppliername === supplierName
    );

    if (supplierSelected) {
      setLocalselectedSuppliers(supplierSelected.id);
    } else {
      setLocalselectedSuppliers(null);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClosed={onClosed}
      ModalTitle="Supplier Info"
      margin="mb-20"
    >
      <div className="flex flex-col justify-center gap-4 px-8 py-10 bg-white shadow-md shadow-gray-200 rounded-xl">
        {/* Supplier Dropdown */}
        <div className="flex flex-col w-full mb-5">
          <label className="mb-1 text-sm font-medium text-violet-700">
            Supplier
          </label>
          <div className="flex flex-col items-center justify-center w-full gap-1">
            <DefaultDropDown
              items={supplierNames}
              SetSelected={HandleSupplierSelection}
              selectedValue={selectedSupplierName} // Show current selection
              placeholder="Select a supplier..."
            />
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
              value={localOrderDate}
              onChange={(e) => setLocalOrderDates(e.target.value)}
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
              value={localArrivalDate}
              onChange={(e) => setLocalArrivalDate(e.target.value)}
              type="date"
              className="px-2 py-2 text-sm border rounded-lg border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>
        </div>

        <div className="w-[100%] flex justify-center mt-2">
          <motion.button
            onClick={() =>
              SubmitSupplier(
                localOrderDate,
                localArrivalDate,
                selectedLocalSupplier
              )
            }
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
