import { Modal } from "@/components/Layouts/modal.jsx";
import { useState, useMemo } from "react";
import { DefaultDropDown } from "@/components/ui/dropdown.jsx";
import { RadioGroup } from "@/components/ui/radioGroup.jsx";
import {} from "lucide-react";

export function BatchEditModal({ id = [], contact = [], isOpen, onClosed }) {
  const statusItems = ["Active", "Inactive"];
  const isVatRegistered = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const [vatRegistered, setVatRegistered] = useState(null);
  const contactName = useMemo(() => {
    if (!contact) return;
    return contact.map((cont) => `${cont.firstname} ${cont.lastname}`);
  }, [contact]);

  return (
    <Modal
      isOpen={isOpen}
      onClosed={onClosed}
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
            <DefaultDropDown items={contactName} />
          </div>
          <div className="flex flex-col justify-start">
            <label>Status (optional)</label>
            <DefaultDropDown items={statusItems} />
          </div>
          <div className="flex flex-col justify-start">
            <label>Is Vat Registered (optional)</label>
            <RadioGroup
              options={isVatRegistered}
              value={vatRegistered}
              onChange={(e) => setVatRegistered(e)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full px-10 py-5">
          <button className="items-center justify-center w-full px-4 py-3 font-semibold text-white bg-violet-500 rounded-2xl">
            Update Selected
          </button>
        </div>
      </div>
    </Modal>
  );
}
