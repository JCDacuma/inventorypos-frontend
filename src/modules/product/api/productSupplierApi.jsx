import api from "@/api/axiosInstance.js";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { ProductValidation } from "@/modules/product/utils/productValidation.jsx";

export async function productSupplierFetch(id, setValue) {
  if (!id) return;
  try {
    const response = await api.get(`product/${id}/supplier`);
    const data = response.data.suppliers.map((supplier) => ({
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
    console.error("There is error", err);
  }
}

export async function AssignSupplier(requestId, setValue) {}
