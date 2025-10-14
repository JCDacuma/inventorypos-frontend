import { validationField } from "@/utils/validation.jsx";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import api from "@/api/axiosInstance.js";

export async function FetchSupplier(Supplier) {
  try {
    const response = await api.get("/supplier");
    const supplierData = response.data.map((res) => ({
      id: res.id,
      supplierName: res.suppliername,
      supplier_address: res.supplier_address,
      shipping_fee: res.shipping_fee,
      vat_registered: res.vat_registered,
      supplier_contact_id: res.supplier_contact_id,
      status: res.status,
      name_contact: res.name_contact,
    }));
    Supplier(supplierData);
  } catch (err) {
    console.log(`There is error: ${err}`);
  }
}

const HandleValidation = (supplier, supplierExist) => {
  for (const key in supplier) {
    const value = supplier[key];

    switch (key) {
      case "suppliername":
        if (!validationField.suppliername.test(value)) {
          SweetAlert.error(
            "Invalid Supplier Name",
            "Please provide a valid and unique supplier name."
          );
          return false;
        }

        if (supplierExist) {
          SweetAlert.error(
            "Supplier Already Exists",
            "A supplier with this name is already registered."
          );
          return false;
        }
        break;

      case "supplier_address":
        if (!validationField.address.test(value)) {
          SweetAlert.error(
            "Invalid Supplier Address",
            "Please enter a valid supplier address before proceeding."
          );
          return false;
        }
        break;

      case "shipping_fee":
        if (!validationField.shippingFee.test(value)) {
          SweetAlert.error(
            "Invalid Shipping Fee",
            "Please enter a valid shipping fee amount before proceeding."
          );
          return false;
        }
        break;

      case "vat_registered":
        if (!validationField.boolean.test(value)) {
          SweetAlert.error(
            "VAT Registration Required",
            "Please specify whether the supplier is VAT registered."
          );
          return false;
        }
        break;

      case "supplier_contact_id":
        if (!validationField.SelectedId.test(value)) {
          SweetAlert.error(
            "No Contact Selected",
            "Please select an existing contact for the supplier or add a new contact before proceeding."
          );
          return false;
        }
        break;

      case "status":
        if (!validationField.name.test(value)) {
          SweetAlert.error(
            "Status Required",
            "Please select whether the supplier status is Active or Inactive."
          );
          return false;
        }
        break;

      default:
        // Ignore other fields
        break;
    }
  }

  return true;
};

export async function SubmitSupplier(supplier, setSupplier, supplierExist) {
  if (!HandleValidation(supplier, supplierExist)) return;
  try {
    await api.post("/supplier", supplier);
    SweetAlert.success(
      "Registration Complete!",
      "The new supplier has been successfully added."
    );
    //Reset Supplier
    setSupplier({
      suppliername: "",
      supplierAdress: "",
      shippingFee: "",
      isVatRegistered: null,
      SelectedContact: null,
      status: "",
    });
  } catch (err) {
    console.log(`There is error: ${err}`);
    SweetAlert.error("Failed to submit", "There is error in connection");
  }
}

//update submitted
export async function SubmitEditSupplier(supplier, refetch) {
  if (!supplier) return;

  const allowedKeys = [
    "suppliername",
    "supplier_address",
    "shipping_fee",
    "vat_registered",
    "supplier_contact_id",
    "status",
  ];

  const request = Object.keys(supplier).reduce((acc, key) => {
    if (
      allowedKeys.includes(key) &&
      supplier[key] !== undefined &&
      supplier[key] !== null
    ) {
      acc[key] = supplier[key];
    }
    return acc;
  }, {});

  console.log("Request being sent:", request);

  if (!HandleValidation(request, supplier.supplierExist)) return;

  try {
    await api.put(`supplier/${supplier.id}`, request);

    if (typeof refetch === "function") {
      await refetch();
    }

    SweetAlert.success(
      "Successfully updated",
      `${
        request.suppliername || supplier.suppliername
      } has been updated successfully`
    );
  } catch (err) {
    console.log(`There is an error:`, err);
    SweetAlert.error(
      "Unable to update",
      `There is a problem in the network or server`
    );
  }
}

//bulk edit
export async function SubmitBulkEdit(id, request, reset) {
  if (!HandleValidation(request)) return;
  if (id.length === 0) return;
  const supplier = id.map((id) => ({ id, ...request }));

  try {
    await api.patch("/supplier/bulk-update", { request: supplier });
    SweetAlert.success(
      "Bulk Update Successful",
      "All selected suppliers have been updated."
    );
    reset();
  } catch (err) {
    console.log(`There is error: ${err}`);
    SweetAlert.error(
      "Bulk Update Failed",
      "Something went wrong while updating the suppliers."
    );
  }
}

export async function FetchSupplierById(
  id,
  setSupllier,
  setFound,
  HandleAssignInput
) {
  if (!id) return;

  try {
    const supplier = await api.post(`supplier/get-supplier?id=${id}`);
    setFound(true);
    HandleAssignInput(supplier.data);
    setSupllier(supplier.data);
    console.log("fteched");
  } catch (err) {
    console.log(`There is error: ${err}`);
    setFound(false);
  }
}

export async function CheckSupplier(value, setExistSupplier) {
  try {
    const exist = await api.post(
      `supplier/check-supliername?suppliername=${value}`
    );
    setExistSupplier(exist.data.exists);
  } catch (err) {
    console.log(`There is error ${err}`);
  }
}
