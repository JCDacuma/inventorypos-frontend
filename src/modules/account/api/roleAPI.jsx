import api from "@/api/axiosInstance.js";
import React from "react";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { validationField } from "@/utils/validation.jsx";

// Fetched role ---------------------------------------
export async function RoleAPIFetch(setRoles) {
  try {
    const res = await api.get("/roles");
    const assignedDataRole = res.data.map((data) => ({
      id: data.id,
      roleName: data.role_name,
      canEditPrice: data.can_edit_price,
      canEditItemInfo: data.can_edit_item_info,
      canEditStocks: data.can_edit_stocks,
      canOrderSupplies: data.can_order_supplies,
      canDelete: data.can_delete,
      isAdmin: data.is_admin,
      Status: data.status,
    }));

    setRoles(assignedDataRole);
  } catch (err) {
    console.log("error fetching data", err);
  }
}

// Submit new role -------------------------
export async function SubmitNewRole(
  form,
  booleanFields,
  ExistRole,
  ResetInputRole,
  onClosed,
  RoleAPIFetch
) {
  //submit validated data to database
  const SubmitData = async () => {
    try {
      await api.post("/roles", form);
      await RoleAPIFetch();
      SweetAlert.success(
        "Role Added Successfully",
        "The new role has been created and saved to the system."
      );

      ResetInputRole();
      onClosed();
    } catch (err) {
      SweetAlert.error("Failed to submit");
    }
  };

  //Validate role
  const validateSubmit = async () => {
    const isValidBooleanFields = booleanFields.every(
      (field) => typeof field === "boolean"
    );

    if (
      validationField.rolename.test(form.role_name) &&
      isValidBooleanFields &&
      !ExistRole
    ) {
      await SubmitData(); //submit data functionality
    } else {
      if (!validationField.rolename.test(form.role_name)) {
        SweetAlert.error("Invalid role name", "please input valid role name");
      } else if (ExistRole) {
        SweetAlert.error(
          "Role name Exist",
          "Roles name is already exist please input another role name"
        );
      } else if (!isValidBooleanFields) {
        SweetAlert.error(
          "Invalid role permission",
          "Please set all role permission"
        );
      }
    }
  };

  return validateSubmit();
}

// Role Deletion -----------------------------------
export async function DeleteRole(id, Roles, RoleAPIFetch) {
  const roleDeleting = Roles.find((rol) => rol.id === id);
  SweetAlert.Confirm(
    "Are you sure?",
    `Are you sure you want to delete ${roleDeleting.roleName}`
  ).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await api.patch(`/roles/${id}`, { status: "Deleted" });
        SweetAlert.success(
          "Deleted Successfully",
          `role ${roleDeleting.roleName} has been deleted`
        );
        RoleAPIFetch();
      } catch (err) {
        console.log(`error: ${err}`);
      }
    }
  });
}

export async function EditRole(
  permissionFields,
  openRoleEdit,
  Editing,
  ResetInputRole,
  RoleAPIFetch
) {
  const isValidBoolean = permissionFields.every(
    (rol) => typeof rol.value === "boolean"
  );

  if (!isValidBoolean) {
    SweetAlert.error(
      "Invalid role permission",
      "Please set all role permissions before updating."
    );
    return;
  }

  const result = await SweetAlert.Confirm(
    `Role Update`,
    `Are you sure you want to update ${openRoleEdit.roleName}?`
  );

  if (!result.isConfirmed) return;

  try {
    await api.patch(`/roles/${openRoleEdit.id}`, Editing);
    SweetAlert.success(
      "Updated Successfully",
      `${openRoleEdit.roleName} role has been updated.`
    );

    ResetInputRole();
    await RoleAPIFetch();
  } catch (err) {
    console.error(`error: ${err}`);
    SweetAlert.error(
      "Update Failed",
      "An error occurred while editing the role."
    );
  }
}

// Check Rolename Availability -----------------------------------
export async function CheckRoleName(value, setisExistRole) {
  if (!value) return setisExistRole(null);

  try {
    const response = await api.post(`roles/check-rolename?rolename=${value}`);
    setisExistRole(response.data.exists);
  } catch (err) {
    console.log(`There is error: ${err}`);
  }
}
