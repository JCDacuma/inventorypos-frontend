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
  if (!validationField.suppliername.test(supplier.suppliername)) {
    SweetAlert.error(
      "Invalid Supplier Name",
      "Please provide a valid and unique supplier name."
    );
    return false;
  }

  if (supplierExist) {
    SweetAlert.error(
      "Supplier Already Exists",
      "A supplier with this name is already registered. Please use a different name or update the existing supplier."
    );
    return false;
  }

  if (!validationField.address.test(supplier.supplier_address)) {
    SweetAlert.error(
      "Invalid Supplier Address",
      "Please enter a valid supplier address before proceeding."
    );
    return false;
  }

  if (!validationField.shippingFee.test(supplier.shipping_fee)) {
    SweetAlert.error(
      "Invalid Shipping Fee",
      "Please enter a valid shipping fee amount before proceeding."
    );
    return false;
  }

  if (!validationField.boolean.test(supplier.vat_registered)) {
    SweetAlert.error(
      "VAT Registration Required",
      "Please specify whether the supplier is VAT registered."
    );
    return false;
  }

  if (!validationField.SelectedId.test(supplier.supplier_contact_id)) {
    SweetAlert.error(
      "No Contact Selected",
      "Please select an existing contact for the supplier or add a new contact before proceeding."
    );
    return false;
  }

  if (!validationField.name.test(supplier.status)) {
    SweetAlert.error(
      "Status Required",
      "Please select whether the supplier status is Active or Inactive."
    );
    return false;
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

export async function SubmitEditSupplier(supplier, refetch) {
  if (!supplier) return;
  const request = {
    suppliername: supplier.suppliername,
    supplier_address: supplier.supplier_address,
    shipping_fee: supplier.shipping_fee,
    vat_registered: supplier.vat_registered,
    supplier_contact_id: supplier.supplier_contact_id,
    status: supplier.status,
  };

  if (!HandleValidation(request, supplier.supplierExist)) return;

  try {
    await api.put(`supplier/${supplier.id}`, request);
    if (typeof refetch === "function") {
      await refetch();
    }
    SweetAlert.success(
      `Successfull updated`,
      `${request.suppliername} has been updated successfully`
    );
  } catch (err) {
    console.log(`There is error: ${err}`);
    SweetAlert.error(
      "Unable to update",
      `There is a problem in network or server`
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
