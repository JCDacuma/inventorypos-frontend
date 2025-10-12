import { Modal } from "@/components/Layouts/modal.jsx";
import { useState, useMemo, useCallback, useDeferredValue } from "react";
import { DefaultDropDown } from "@/components/ui/dropdown.jsx";
import { RadioGroup } from "@/components/ui/radioGroup.jsx";
import { SubmitBulkEdit } from "@/modules/supplier/api/SupplierApi.jsx";

export function BatchEditModal({ id = [], contact = [], isOpen, onClosed }) {
  const [editedSupplier, setEditedSupplier] = useState({
    selectedContact: null,
    vatRegistered: null,
    status: "",
  });

  const [onSubmit, setOnsubmit] = useState(false);

  const statusItems = ["Active", "Inactive"];

  const isVatRegistered = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const closeModal = () => {
    if (onSubmit) return;
    onClosed();
  };

  const deferredValue = useDeferredValue(contact);
  const contactName = useMemo(() => {
    if (!deferredValue) return;
    return contact.map((cont) => `${cont.firstname} ${cont.lastname}`);
  }, [deferredValue]);

  const HandleChange = useCallback((value, field) => {
    setEditedSupplier((editVal) => ({ ...editVal, [field]: value }));
  }, []);

  const HandleConvertContactId = useCallback(
    (value, field) => {
      const contactFound = contact.find(
        (con) => `${con.firstname} ${con.lastname}` === value
      );
      if (!contactFound) return;
      HandleChange(contactFound.id, field);
    },
    [deferredValue, HandleChange]
  );

  const HandleSubmit = async () => {
    if (onSubmit) return;
    setOnsubmit(true);
    const request = {};
    if (editedSupplier.selectedContact !== null)
      request.supplier_contact_id = editedSupplier.selectedContact;
    if (editedSupplier.vatRegistered !== null)
      request.vat_registered = editedSupplier.vatRegistered;
    if (editedSupplier.status !== "") request.status = editedSupplier.status;

    try {
      if (Object.keys(request).length === 0) return;
      await SubmitBulkEdit(id, request);
    } finally {
      setOnsubmit(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClosed={closeModal}
      ModalTitle={"Batch Edit"}
      margin="mt-13"
    >
      <div className="h-[calc(100vh-200px)] 2xl:h-[calc(100vh-400px)]  w-full  flex flex-col justify-between overflow-auto">
        <div className="flex flex-col w-full h-full gap-4 px-12 py-5 font-semibold text-violet-400">
          <div className="flex flex-col justify-start w-full px-4 py-4 border-1 bg-violet-200 border-violet-700 rounded-2xl">
            <span>Item to be edit: {id.length}</span>
          </div>

          <div className="flex flex-col justify-start">
            <label>Contact (optional)</label>
            <DefaultDropDown
              items={contactName}
              disabled={onSubmit}
              SetSelected={(e) => HandleConvertContactId(e, "selectedContact")}
            />
          </div>
          <div className="flex flex-col justify-start">
            <label>Status (optional)</label>
            <DefaultDropDown
              items={statusItems}
              disabled={onSubmit}
              SetSelected={(e) => HandleChange(e, "status")}
            />
          </div>
          <div className="flex flex-col justify-start">
            <label>Is Vat Registered (optional)</label>
            <RadioGroup
              options={isVatRegistered}
              value={editedSupplier.vatRegistered}
              disabled={onSubmit}
              onChange={(e) => HandleChange(e, "vatRegistered")}
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full px-10 py-5">
          <button
            onClick={() => HandleSubmit()}
            className={`${
              onSubmit ? "bg-gray-400" : "bg-violet-500 cursor-pointer"
            } items-center flex justify-center gap-2 w-full px-4 py-3 font-semibold text-white  rounded-2xl`}
          >
            {onSubmit && (
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
            )}
            {onSubmit ? "Updating selected..." : "Update Selected"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
