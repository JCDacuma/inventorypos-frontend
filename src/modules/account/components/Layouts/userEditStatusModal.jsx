import { useState, useEffect } from "react";
import { Modal } from "@/components/Layouts/modal.jsx";
import { Input } from "@/components/ui/Input.jsx";
import { DefaultDropDown } from "@/components/ui/dropdown.jsx";
import { BriefcaseBusiness, ListPlus } from "lucide-react";

//api
import { EditAccount } from "@/modules/account/api/accountAPI.jsx";

export function EditStatusModal({
  isOpen,
  onClosed,
  accountEditing,
  setModalAddRoleOpen,
  roles,
  fetchAccount,
}) {
  const [roleSelected, setRoleSelected] = useState(null);
  const [onSubmit, setOnSubmit] = useState(false);

  const disabled =
    onSubmit ||
    !roleSelected ||
    roleSelected.roleName === accountEditing?.rolename;

  //------- Select roles ----------------
  const roleOptions = roles.map((role) => role.roleName);
  const RolesSelect = (value) => {
    const roleSelected = roles.find((rol) => rol.roleName === value);

    if (roleSelected === undefined || roleSelected === null) {
      return;
    } else {
      setRoleSelected(roleSelected);
    }
  };

  const ChangeRole = async () => {
    const submitRole = {
      roleId: roleSelected.id,
    };

    if (onSubmit) return;
    setOnSubmit(true);
    await EditAccount(submitRole, accountEditing.id);
    setOnSubmit(false);
    onClosed();
    await fetchAccount();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClosed={onSubmit ? null : onClosed}
      ModalTitle="Edit Account"
    >
      <div className="w-full px-6 py-4 overflow-auto">
        {/* Header */}
        <header className="flex items-center justify-between pb-3 mb-6 border-b border-violet-200">
          <h5 className="text-xl font-semibold text-violet-700">
            Editing Account:
            <span className="ml-1 font-bold text-violet-800">
              {accountEditing?.firstName} {accountEditing?.lastname}
            </span>
          </h5>
        </header>

        {/* Content Section */}
        <section className="w-full space-y-8">
          {/* Role Section */}
          <div className="flex flex-col text-violet-800">
            <label className="mb-1 ml-1 text-sm font-medium text-violet-600">
              Current Role:
            </label>
            <div className="flex items-center justify-between px-4 py-2 mb-4 border rounded-lg border-violet-200 bg-violet-50">
              <span className="font-semibold">{accountEditing?.rolename}</span>
            </div>

            <label className="mb-1 ml-1 text-sm font-medium text-violet-600">
              Select New Role:
            </label>
            <DefaultDropDown
              placeholder="Choose a role"
              items={roleOptions}
              selectedValue={roleSelected?.roleName}
              SetSelected={RolesSelect}
              icons={BriefcaseBusiness}
              BtnIcons={ListPlus}
              disabled={onSubmit}
              OnClick={() => {
                onClosed();
                setModalAddRoleOpen();
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-violet-100">
            <button
              disabled={onSubmit}
              onClick={onClosed}
              className="px-4 py-2 text-sm font-medium transition-colors rounded-lg text-violet-700 bg-violet-100 hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={ChangeRole}
              disabled={disabled}
              className={`px-5 py-2 text-sm font-semibold text-white transition-colors rounded-lg shadow-md ${
                disabled ? `bg-gray-400` : ` bg-violet-600 hover:bg-violet-700`
              }  focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2`}
            >
              {onSubmit ? "Assigning..." : "Change Role"}
            </button>
          </div>
        </section>
      </div>
    </Modal>
  );
}
