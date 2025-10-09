import { validationField } from "@/utils/validation.jsx";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import api from "@/api/axiosInstance.js";

export async function SubmitSupplier(supplier, setSupplier, supplierExist) {
  if (!validationField.suppliername.test(supplier.suppliername)) {
    SweetAlert.error(
      "Invalid Supplier Name",
      "Please provide a valid and unique supplier name."
    );
    return;
  }

  if (supplierExist) {
    SweetAlert.error(
      "Supplier Already Exists",
      "A supplier with this name is already registered. Please use a different name or update the existing supplier."
    );
    return;
  }

  if (!validationField.address.test(supplier.supplierAdress)) {
    SweetAlert.error(
      "Invalid Supplier Address",
      "Please enter a valid supplier address before proceeding."
    );
    return;
  }

  if (!validationField.shippingFee.test(supplier.shipping_fee)) {
    SweetAlert.error(
      "Invalid Shipping Fee",
      "Please enter a valid shipping fee amount before proceeding."
    );
    return;
  }

  if (!validationField.boolean.test(supplier.vat_registered)) {
    SweetAlert.error(
      "VAT Registration Required",
      "Please specify whether the supplier is VAT registered."
    );
    return;
  }

  if (!validationField.SelectedId.test(supplier.supplier_contact_id)) {
    SweetAlert.error(
      "No Contact Selected",
      "Please select an existing contact for the supplier or add a new contact before proceeding."
    );
    return;
  }

  if (!validationField.name.test(supplier.status)) {
    SweetAlert.error(
      "Status Required",
      "Please select whether the supplier status is Active or Inactive."
    );
    return;
  }

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
