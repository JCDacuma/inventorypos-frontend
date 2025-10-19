import { useState, useDeferredValue, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftFromLine,
  PlusCircle,
  Tag,
  FileText,
  SquarePen,
  PencilRuler,
  Trash,
} from "lucide-react";
import { Modal } from "@/components/Layouts/modal.jsx"; // Adjust this import to your actual Modal path
import { Input } from "@/components/ui/Input.jsx"; // Adjust this import to your actual Input path
import {
  registerUnit,
  updateUnit,
  DeleteUnit,
} from "@/modules/product/api/unitApi.jsx";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { EmptyStateDefault } from "@/components/ui/emptyState.jsx";
import { HandleInputChange } from "@/utils/InputValueChange.jsx";

export default function UnitModal({ isOpen, onClosed, FetchUnit, refetch }) {
  const [inputUnit, setInputUnit] = useState({
    unitname: "",
    symbol: "",
    description: "",
  });
  const [onSubmit, setOnsubmit] = useState(false); //submit
  const [openAdd, setOpenAdd] = useState(false); //open add unit state
  const [selectedId, setSelectedId] = useState(null); // selected id to be edit

  const unit = useDeferredValue(FetchUnit);
  //resetfields
  const HandleReset = () => {
    setInputUnit({
      unitname: "",
      symbol: "",
      description: "",
    });
  };

  //close modal
  const HandleClose = () => {
    onClosed();
    setOpenAdd(false);
    setSelectedId(null);
    if (onSubmit) return;
    HandleReset();
  };

  //Refetching the data
  const Refetch = async () => {
    setSelectedId(null);
    setOpenAdd(false);
    await refetch();
  };

  const inputs = [
    {
      name: "unitname",
      placeholder: "Enter unitname",
      icon: Tag,
      value: inputUnit.unitname,
    },
    {
      name: "symbol",
      placeholder: "Enter Unit Symbol ex: kg, L",
      icon: PencilRuler,
      value: inputUnit.symbol,
    },
    {
      name: "description",
      placeholder: "Enter Unit Description",
      icon: FileText,
      value: inputUnit.description,
    },
  ];

  //selecting to edit
  const HandleSelectEdit = useCallback((unit) => {
    setSelectedId(unit);
    setInputUnit({
      unitname: unit.unitname,
      symbol: unit.symbol,
      description: unit.description,
      unitstatus: unit.unitstatus,
    });
  }, []);

  const isFormValid =
    (inputUnit?.unitname?.trim()?.length ?? 0) > 0 &&
    (inputUnit?.symbol?.trim()?.length ?? 0) > 0;

  // Register new unit
  const HandleRegister = async () => {
    if (onSubmit) return;
    setOnsubmit(true);

    const { unitname, symbol, description } = inputUnit;

    if (!unitname.trim() || !symbol.trim()) {
      SweetAlert.error("Missing Fields", "Unit name and symbol are required.");
      setOnsubmit(false);
      return;
    }

    const request = {
      unitname: unitname.trim(),
      symbol: symbol.trim(),
      description: description.trim(),
      unitstatus: "Active",
    };

    try {
      await registerUnit(request, Refetch, HandleReset);
    } finally {
      setOnsubmit(false);
    }
  };

  // Edit unit
  const HandleEdit = async () => {
    if (onSubmit) return;
    setOnsubmit(true);

    const { unitname, symbol, description } = inputUnit;

    // Validate required fields
    if (!unitname.trim() || !symbol.trim()) {
      SweetAlert.error("Missing Info", "Unit name and symbol are required.");
      setOnsubmit(false);
      return;
    }

    // Check for no changes
    if (
      unitname.trim() === selectedId.unitname &&
      symbol.trim() === selectedId.symbol &&
      description.trim() === selectedId.description
    ) {
      SweetAlert.error(
        "No Changes",
        "Update at least one field before saving."
      );
      setOnsubmit(false);
      return;
    }

    const request = {
      id: selectedId.id,
      unitname: unitname.trim(),
      symbol: symbol.trim(),
    };

    if (description && description.trim() !== "")
      request.description = description.trim();

    try {
      await updateUnit(request, Refetch, HandleReset);
    } finally {
      setOnsubmit(false);
    }
  };

  //Deletion
  const HandleRemove = async (id, name) => {
    if (!id || !name) return;

    const confirmDelete = await SweetAlert.Confirm(
      "Unit Deletion",
      `Do you confirm to delete unit ${name}?`
    );

    if (!confirmDelete.isConfirmed) return;

    const request = {
      id: id,
      unitname: name,
    };

    await DeleteUnit(request, Refetch);
  };

  return (
    <Modal
      ModalTitle="Product Unit"
      isOpen={isOpen}
      onClosed={() => HandleClose()}
      margin={"mt-10 2xl:mb-10"}
    >
      <div className="overflow-auto h-[calc(100vh-200px)] 2xl:h-[calc(100vh-400px)]">
        {/* show all Unit */}
        {!openAdd && selectedId === null && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-800">Units</h4>
              <button
                onClick={() => {
                  setOpenAdd(true);
                  HandleReset();
                  setSelectedId(null);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded-lg shadow cursor-pointer bg-violet-600 hover:bg-violet-700"
              >
                <PlusCircle className="w-4 h-4" />
                Add Unit
              </button>
            </div>

            <div className="flex flex-col gap-4 ">
              {unit.length > 0 ? (
                unit.map((unt) => (
                  <div
                    key={unt.id}
                    className="flex items-center justify-between w-full p-5 transition bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md"
                  >
                    <div className="flex flex-col">
                      <h5 className="mb-1 text-base font-semibold text-gray-800">
                        {unt.unitname}
                      </h5>
                      <p className="text-sm text-gray-600">{unt.symbol}</p>
                    </div>
                    <div className="mt-1 text-sm text-gray-600 sm:mt-0">
                      <button
                        type="button"
                        onClick={() => HandleSelectEdit(unt)}
                        className="p-2 mt-1 transition duration-200 rounded-full cursor-pointer text-violet-600 hover:bg-violet-100 active:bg-violet-200"
                        title="Edit Contact"
                      >
                        <SquarePen size={22} className="stroke-2" />
                      </button>
                      <button
                        type="button"
                        onClick={() => HandleRemove(unt.id, unt.unitname)}
                        className="p-2 text-orange-800 transition duration-200 rounded-full cursor-pointer hover:bg-orange-100 active:bg-violet-200"
                        title="Edit Contact"
                      >
                        <Trash size={22} className="stroke-2" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyStateDefault
                  title={"No Unit Found"}
                  message={
                    "It looks like there are no units available at the moment. Try adding a new one or refreshing the page."
                  }
                />
              )}
            </div>
          </div>
        )}

        {/* Add new Unit */}
        {openAdd && selectedId === null ? (
          <div className="flex flex-col justify-between h-full p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-center py-3 border-b-2 border-violet-500 bg-violet-50">
              <h4 className="text-xl font-bold tracking-wide uppercase text-violet-700">
                Register Unit
              </h4>
            </div>
            <div className="flex flex-col w-full h-full gap-4">
              {inputs.map((input) => (
                <div key={input.name}>
                  <Input
                    disabled={onSubmit}
                    placeholder={input.placeholder}
                    onChange={(e) =>
                      HandleInputChange(e, input.name, setInputUnit)
                    }
                    icons={input.icon}
                    value={input.value}
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              {/* Cancel */}
              <motion.button
                disabled={onSubmit}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                onClick={() => {
                  setOpenAdd(false);
                  HandleReset();
                  setSelectedId(null);
                }}
                className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-gray-600 transition border cursor-pointer sm:px-5 rounded-xl hover:bg-gray-100"
              >
                <ArrowLeftFromLine className="w-5 h-5" />
                Cancel
              </motion.button>

              {/* Submit */}
              <motion.button
                onClick={() => HandleRegister()}
                whileHover={{ scale: isFormValid ? 1.03 : 1 }}
                whileTap={{ scale: isFormValid ? 0.97 : 1 }}
                transition={{ duration: 0.15 }}
                disabled={!isFormValid}
                className={`flex cursor-pointer items-center gap-2 px-2 sm:px-5 py-2 text-xs font-semibold text-white rounded-xl shadow-md transition
              ${
                isFormValid
                  ? "bg-violet-600 hover:bg-violet-700 hover:shadow-lg"
                  : "bg-violet-300 cursor-not-allowed"
              }
            `}
              >
                {onSubmit ? (
                  <svg
                    className="w-5 h-5 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : (
                  <PlusCircle className="w-5 h-5" />
                )}
                {onSubmit ? "Submiting..." : "Add Unit"}
              </motion.button>
            </div>
          </div>
        ) : null}

        {/* editunit */}
        {!openAdd && selectedId !== null ? (
          <div className="flex flex-col justify-between h-full p-6 space-y-6">
            <div className="flex items-center justify-center py-3 border-b-2 border-violet-500 bg-violet-50">
              <h4 className="text-xl font-bold tracking-wide uppercase text-violet-700">
                Edit Unit
              </h4>
            </div>
            <div className="flex flex-col items-baseline w-full h-full gap-4 justify-baseline">
              {inputs.map((input) => (
                <div key={input.name} className="w-full ">
                  <Input
                    disabled={onSubmit}
                    placeholder={input.placeholder}
                    onChange={(e) =>
                      HandleInputChange(e, input.name, setInputUnit)
                    }
                    icons={input.icon}
                    value={input.value}
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              {/* Cancel */}
              <motion.button
                disabled={onSubmit}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                onClick={() => {
                  setOpenAdd(false);
                  HandleReset();
                  setSelectedId(null);
                }}
                className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-gray-600 transition border cursor-pointer sm:px-5 rounded-xl hover:bg-gray-100"
              >
                <ArrowLeftFromLine className="w-5 h-5" />
                Cancel
              </motion.button>

              {/* Submit */}
              <motion.button
                onClick={() => HandleEdit()}
                whileHover={{ scale: isFormValid ? 1.03 : 1 }}
                whileTap={{ scale: isFormValid ? 0.97 : 1 }}
                transition={{ duration: 0.15 }}
                disabled={!isFormValid}
                className={`flex items-center cursor-pointer gap-2 px-2 sm:px-5 py-2 text-xs font-semibold text-white rounded-xl shadow-md transition
              ${
                isFormValid
                  ? "bg-violet-600 hover:bg-violet-700 hover:shadow-lg"
                  : "bg-violet-300 cursor-not-allowed"
              }
            `}
              >
                {onSubmit ? (
                  <svg
                    className="w-5 h-5 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : (
                  <PlusCircle className="w-5 h-5" />
                )}

                {onSubmit ? "Editing..." : "Edit Unit"}
              </motion.button>
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
