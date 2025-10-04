import React from "react";
import api from "@/api/axiosInstance.js";
import { useState, useEffect } from "react";
import { Modal } from "@/components/Layouts/modal.jsx";
import { UserRoundPen, ListRestart, BriefcaseBusiness } from "lucide-react";
import { RadioGroup } from "@/components/ui/radioGroup.jsx";
import { Input } from "@/components/ui/Input.jsx";
import { SweetAlert } from "@/utils/sweetalert.jsx";

export default function UserRole({ isOpen, onClosed, Roles = [] }) {
  const [openRoleEdit, setOpenRoleEdit] = useState(null); //CurrentRole
  const [openAdd, setOpenAdd] = useState(false);

  //For Adding Role
  const [roleName, setRoleName] = useState("");

  const [canEditPrice, setCanEditPrice] = useState(null);
  const [canEditItem, setCanEditItem] = useState(null);
  const [canEditStocks, setCanEditStocks] = useState(null);
  const [canDelete, setCanDelete] = useState(null);
  const [canOrderSupplies, setCanOrderSupplies] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const yesNoOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const HandleSelectRole = (value) => {
    const slctdRole = Roles.find((role) => role.roleId === value);
    if (!slctdRole) {
      error(`Error `, `Role with ID ${value} not found`);
      return;
    }
    setOpenRoleEdit(slctdRole);
  };

  const permissionFields = [
    {
      label: "Can Edit Price",
      value: canEditPrice,
      setter: setCanEditPrice,
      name: "canEditPrice",
    },
    {
      label: "Can Edit Item Info",
      value: canEditItem,
      setter: setCanEditItem,
      name: "canEditItem",
    },
    {
      label: "Can Edit Stocks",
      value: canEditStocks,
      setter: setCanEditStocks,
      name: "canEditStocks",
    },
    {
      label: "Can Delete Items",
      value: canDelete,
      setter: setCanDelete,
      name: "canDelete",
    },
    {
      label: "Can Order Supplies",
      value: canOrderSupplies,
      setter: setCanOrderSupplies,
      name: "canOrderSupplies",
    },
    {
      label: "Administrator Privileges",
      value: isAdmin,
      setter: setIsAdmin,
      name: "isAdmin",
    },
  ];

  //Handle Submit new Role
  const SubmitNewRole = async (e) => {
    e.preventDefault();

    const form = {
      role_name: roleName,
      can_edit_price: canEditPrice,
      can_edit_item_info: canEditItem,
      can_edit_stocks: canEditStocks,
      can_order_supplies: canOrderSupplies,
      can_delete: canDelete,
      is_admin: isAdmin,
    };

    try {
      const res = await api.post("/roles", form);
      console.log("Role created:", res.data);
      SweetAlert.success(
        "Added Roles",
        "New Roles has been successfully added"
      );
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to create role");
    }
  };

  //Edit Role
  const SetCurrentRole = () => {
    if (openRoleEdit) {
      setRoleName(openRoleEdit.roleName);
      setCanEditPrice(openRoleEdit.canEditPrice);
      setCanEditItem(openRoleEdit.canEditItemInfo);
      setCanEditStocks(openRoleEdit.canEditStocks);
      setCanDelete(openRoleEdit.canDelete);
      setCanOrderSupplies(openRoleEdit.canOrderSupplies);
      setIsAdmin(openRoleEdit.isAdmin);
    }
    return;
  };

  //Reset Input
  const ResetInputRole = () => {
    setRoleName("");
    setCanEditPrice(null);
    setCanEditItem(null);
    setCanEditStocks(null);
    setCanDelete(null);
    setCanOrderSupplies(null);
    setIsAdmin(null);
  };

  useEffect(() => {
    SetCurrentRole();
  }, [openRoleEdit]);

  const SubmitEditRole = () => {};

  return (
    <Modal ModalTitle="User Role" onClosed={onClosed} isOpen={isOpen}>
      <div className="w-full h-[calc(100vh-180px)] 2xl:h-[calc(100vh-300px)] py-4 px-2 md:px-4 rounded-lg bg-white">
        {
          /* -------------- User Role ------------ */
          openRoleEdit === null && !openAdd ? (
            <section className="flex flex-col w-full h-full overflow-auto">
              {/* Header */}
              <header className="flex items-center justify-between w-full pb-3 border-b">
                <h3 className="text-xl font-bold text-violet-600">User Role</h3>

                <button
                  onClick={() => setOpenAdd(true)}
                  className="px-4 py-2 font-medium text-white transition shadow-md cursor-pointer bg-violet-500 rounded-xl hover:bg-violet-600"
                >
                  Add Role
                </button>
              </header>

              {/* Role List */}
              <div className="flex-1 mt-1 space-y-2 overflow-y-auto">
                {Roles.length > 0 ? (
                  Roles.map((role) => (
                    <div
                      key={role.roleId}
                      className="flex items-center justify-between w-full p-3 transition border rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {role.roleName}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => HandleSelectRole(role.roleId)}
                          className="p-2 text-gray-500 transition rounded-lg cursor-pointer hover:text-violet-600 hover:bg-gray-200"
                          title="Edit"
                        >
                          <UserRoundPen className="w-5 h-5 stroke-3" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="mt-10 text-sm text-center text-gray-500">
                    No roles available.
                  </p>
                )}
              </div>
            </section>
          ) : null
        }

        {
          /*---------- Add Role ---------- */
          openRoleEdit === null && openAdd ? (
            <section className="flex flex-col w-full h-full overflow-auto ">
              {/* Header */}
              <header className="flex items-center justify-between w-full px-2 pb-3 border-b">
                <h3 className="text-xl font-bold text-violet-600">Add Role</h3>
                <button
                  onClick={() => {
                    setOpenAdd(false);
                    ResetInputRole();
                  }}
                  className="px-4 py-2 font-medium text-white transition shadow-md cursor-pointer bg-violet-500 rounded-xl hover:bg-violet-600"
                >
                  Show Role
                </button>
              </header>

              <form
                onSubmit={SubmitNewRole}
                className="flex flex-col items-center flex-1 w-full gap-4 mt-1 overflow-y-auto "
              >
                {/* Role name input */}
                <div className="w-full px-3">
                  <label className="text-sm font-medium text-gray-700">
                    Role Name
                  </label>
                  <Input
                    placeholder="Enter Role Name"
                    onChange={setRoleName}
                    icons={BriefcaseBusiness}
                    value={roleName}
                  />
                </div>

                {/* Permissions */}
                <div className="flex flex-col w-full gap-4 px-3">
                  {permissionFields.map((field, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-start justify-start w-full py-2 border-b"
                    >
                      <label className="text-sm font-medium text-gray-700">
                        {field.label}
                      </label>
                      <RadioGroup
                        options={yesNoOptions}
                        value={field.value}
                        onChange={field.setter}
                        name={field.name}
                      />
                    </div>
                  ))}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="px-4 cursor-pointer py-2 mt-4 font-semibold text-white transition bg-violet-500 rounded-xl shadow-md hover:bg-violet-600 w-[90%] sm:w-[60%]"
                >
                  Add Role
                </button>
              </form>
            </section>
          ) : null
        }

        {openRoleEdit !== null && !openAdd ? (
          /*---------- Edit Role ---------- */
          <section className="flex flex-col w-full h-full overflow-auto ">
            {/* Header */}
            <header className="flex items-center justify-between w-full px-2 pb-3 border-b">
              <h6 className="text-lg font-bold text-violet-600">
                Edit Role {openRoleEdit.roleName}
              </h6>
              <button
                onClick={() => {
                  setOpenRoleEdit(null);
                  ResetInputRole();
                }}
                className="flex-shrink-0 px-4 py-2 font-medium text-white transition shadow-md cursor-pointer bg-violet-500 rounded-xl hover:bg-violet-600"
              >
                Show All
              </button>
            </header>
            <form className="flex flex-col items-center flex-1 w-full gap-4 mt-1 overflow-y-auto ">
              {/* Permissions */}
              <div className="w-full px-3">
                <label className="text-sm font-medium text-gray-700">
                  Role Name
                </label>
                <Input
                  placeholder="Enter Role Name"
                  onChange={setRoleName}
                  icons={BriefcaseBusiness}
                  value={roleName}
                />
              </div>
              <div className="flex flex-col w-full gap-4 px-3">
                {permissionFields.map((field, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start justify-start w-full py-2 border-b"
                  >
                    <label className="text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <RadioGroup
                      options={yesNoOptions}
                      value={field.value}
                      onChange={field.setter}
                      name={field.name}
                    />
                  </div>
                ))}
              </div>
            </form>

            {/* Submit button */}
            <div className="flex w-full gap-1">
              <button
                onClick={SetCurrentRole}
                className="px-4 flex justify-center items-center cursor-pointer py-2 mt-4 font-semibold text-white transition bg-violet-500 rounded-xl shadow-md hover:bg-violet-600 w-[20%] sm:w-[20%]"
              >
                <ListRestart />
              </button>
              <button
                type="submit"
                className="w-full px-4 py-2 mt-4 font-semibold text-white transition shadow-md cursor-pointer bg-violet-500 rounded-xl hover:bg-violet-600"
              >
                Edit Role
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </Modal>
  );
}
