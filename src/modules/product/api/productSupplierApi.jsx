import api from "@/api/axiosInstance.js";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { ProductValidation } from "@/modules/product/utils/productValidation.jsx";

export async function UnnasignedSupplierFetch(id, setValue) {
  if (!id) return;
  try {
    const response = await api.get(`get/${id}/unnasigned-supplier`);
    const apiData = response.data.supplier.map((supplier) => ({
      id: supplier.id,
      suppliername: supplier.suppliername,
      shipping_fee: supplier.shipping_fee,
      tax: supplier.vat_registered,
      status: supplier.status,
      address: supplier.supplier_address,
      contact: supplier.name_contact,
    }));

    if (typeof setValue === "function") {
      if (apiData.length <= 0) {
        setValue(false);
      } else {
        setValue(apiData);
      }
    }
  } catch (err) {
    console.error(`There is error`, err);
  }
}

export async function BulkProductAssignedSupplier(request, setValue) {
  if (!request) return;

  try {
    const response = await api.post("products/suppliers/bulk", request);

    const suppliers = response?.data?.supplier || [];

    const responseData = suppliers.map((supplier) => ({
      id: supplier.id,
      suppliername: supplier.suppliername,
      shipping_fee: supplier.shipping_fee,
      tax: supplier.vat_registered,
      status: supplier.status,
      address: supplier.supplier_address,
      contact: supplier.name_contact,
    }));

    //  Set false if no suppliers found
    if (typeof setValue === "function") {
      setValue(responseData.length > 0 ? responseData : false);
    }

    return responseData;
  } catch (err) {
    console.error("Error in BulkProductAssignedSupplier:", err);

    //  On error, also set to false (consistent behavior)
    if (typeof setValue === "function") {
      setValue(false);
    }

    return [];
  }
}

export async function productSupplierFetch(id, setValue) {
  if (!id) return;
  try {
    const response = await api.get(`product/${id}/supplier`);
    const data = response.data.suppliers.map((supplier) => ({
      id: supplier.id,
      suppliername: supplier.suppliername,
      shipping_fee: supplier.shipping_fee,
      tax: supplier.supplierVatStatus,
      status: supplier.supplier_contact,
      address: supplier.supplier_address,
      contact: supplier.supplier_contact,
    }));
    if (typeof setValue === "function") {
      if (data.length <= 0) {
        setValue(false);
      } else {
        setValue(data);
      }
    }
  } catch (err) {
    setValue(false);
    console.error("There is error", err);
  }
}

export async function handleProductSupplierAssignment(request, refetch) {
  //  validation
  if (!request || !["Assign", "Unnasign"].includes(request.actionType)) {
    console.warn("Invalid request data:", request);
    return;
  }

  const { supplierId, productId, actionType } = request;

  const payload = {
    supplier_id: supplierId,
    product_id: productId,
  };

  //  User feedback
  SweetAlert.loading(
    `${actionType === "Assign" ? "Assigning" : "Unassigning"} Supplier`,
    `Please wait while we ${
      actionType === "Assign" ? "assign" : "unassign"
    } the supplier...`
  );

  try {
    const endpoint =
      actionType === "Assign" ? "supplier-assign" : "supplier-unnasign";

    await api.post(endpoint, payload); //send request

    SweetAlert.close();
    SweetAlert.success(
      "Success",
      `Supplier ${
        actionType === "Assign" ? "assigned" : "unassigned"
      } successfully!`
    );

    if (typeof refetch === "function") await refetch();
  } catch (err) {
    SweetAlert.close();
    console.error("Supplier assignment error:", err);
    SweetAlert.error(
      "Error",
      `Failed to ${
        actionType === "Assign" ? "assign" : "unassign"
      } supplier. Please try again.`
    );
  }
}

export async function BulkUpdate(requestId) {}
