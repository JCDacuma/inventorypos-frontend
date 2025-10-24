import api from "@/api/axiosInstance.js";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { ProductValidation } from "@/modules/product/utils/productValidation.jsx";

export async function FetchProduct(setProduct) {
  try {
    const response = await api.get("product");

    if (!response || !response.data) {
      throw new Error("Invalid server response");
    }

    const products = response.data.map((item) => ({
      id: item.id,
      product_code: item.product_code,
      product_image: item.product_image_url,
      productname: item.productname,
      category_id: item.category_id,
      category_name: item.product_category,
      unit_id: item.unit_id,
      supplierCount: item.active_supplier_count,
      markup_price: item.markup_price,
      raw_price: item.raw_price,
      selling_price: item.selling_price,
      taxable: item.taxable,
      product_status: item.product_status,
      reorder_level: item.reorder_level,
      description: item.description,
    }));

    setProduct(products);
  } catch (err) {
    console.log("Error Catching categories:", err);
  }
}

export async function ProductSubmit(request, reset) {
  if (!request || !ProductValidation(request)) return;

  const form = new FormData();
  form.append("productcode", request.generatedCode);
  form.append("productimage", request.productImage);
  form.append("productname", request.productname?.trim());
  form.append("category", request.category);
  form.append("rawprice", request.rawPrice);
  form.append("markupprice", request.markUpPrice);
  form.append("sellingprice", request.sellingPrice);
  form.append("istaxable", request.isTaxable ? "1" : "0");
  form.append("status", request.status || "Active");
  form.append("productunit", request.productunit);
  form.append("reorderlevel", request.reorderLevel);
  form.append("description", request.description?.trim());

  //  loading alert
  SweetAlert.loading(
    "Submitting Product...",
    "Please wait while we submit new product."
  );

  try {
    const response = await api.post("product", form, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 30000,
    });

    SweetAlert.close();

    SweetAlert.success(
      "Successfully Registered",
      "Product has been successfully added to the database."
    );
    reset();
    return response.data;
  } catch (err) {
    SweetAlert.close();
    console.error("Product submission failed:", err);

    if (err.response && err.response.status === 422) {
      const validationErrors = err.response.data.errors;

      const combinedMessages = Object.values(validationErrors)
        .flat()
        .join("\n• ");

      SweetAlert.error("Input Error", `${combinedMessages}`);
      return null;
    }

    const errorMessage =
      err?.response?.data?.message ||
      (err?.message?.includes("Network")
        ? "Network error. Please check your connection."
        : "An unexpected error occurred while adding the product. Please try again later.");

    SweetAlert.error("Adding Product Failed", errorMessage);

    return null;
  }
}

//product update/edit
export async function updateProduct(request, AfterAction) {
  if (!request || !ProductValidation(request)) return;

  const form = new FormData();
  form.append("_method", "PUT");

  if (request.productname) form.append("productname", request.productname);
  if (request.category) form.append("category", request.category);
  if (request.productunit) form.append("unit", request.productunit);
  if (request.rawPrice !== undefined && request.rawPrice !== null)
    form.append("rawprice", request.rawPrice);
  if (request.markUpPrice !== undefined && request.markUpPrice !== null)
    form.append("markupprice", request.markUpPrice);
  if (request.sellingPrice !== undefined && request.sellingPrice !== null)
    form.append("sellingprice", request.sellingPrice);
  if (typeof request.isTaxable !== "undefined")
    form.append("istaxable", request.isTaxable ? "1" : "0");
  if (request.status) form.append("status", request.status);
  if (request.reorderLevel !== undefined && request.reorderLevel !== null)
    form.append("reorderlevel", request.reorderLevel);
  if (request.description) form.append("description", request.description);

  if (request.productimage instanceof File) {
    form.append("productimage", request.productimage);
  }

  //  loading alert
  SweetAlert.loading(
    "Updating Product...",
    "Please wait while we save your changes."
  );

  try {
    const response = await api.post(`product/${request.id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 30000,
    });

    SweetAlert.close();

    if (response.data.success) {
      SweetAlert.success(
        "Product Updated",
        `${response.data.data.productname} has been successfully updated!`
      ).then(() => {
        if (typeof AfterAction === "function") AfterAction();
      });
    }
  } catch (err) {
    SweetAlert.close();
    console.error("Error from backend:", err.response?.data || err.message);

    //  Timeout or aborted request
    if (err.code === "ECONNABORTED") {
      SweetAlert.warning(
        "Request Timeout",
        "The update took too long to process. Please try again later."
      );
      return;
    }

    //  Validation errors (422)
    if (err.response?.status === 422) {
      const validationErrors = err.response.data.errors;
      const combinedMessages = Object.values(validationErrors)
        .flat()
        .join("\n• ");

      SweetAlert.error(
        "Validation Error",
        `Please fix the following issues:\n• ${combinedMessages}`
      );
      return;
    }

    //  Server or network errors
    const errorMessage =
      err?.response?.data?.message ||
      (err?.message?.includes("Network")
        ? "Network error. Please check your internet connection."
        : "An unexpected error occurred while updating the product.");

    SweetAlert.error("Update Failed", errorMessage);
  }
}

//fetch product to be edit
export async function FetchProductById(id, setProduct) {
  if (!id) return;
  try {
    const response = await api.post(`product-get/${id}`);
    const data = response.data.product;
    setProduct(data);
  } catch (err) {
    console.error("Failed to fetch product:", err);
    setProduct(false);
  }
}

// ---------------------- Bulk Edit -------------------------
export async function BulkEditProduct(ids = [], request = {}, handleRefetch) {
  if (!Array.isArray(ids) || ids.length === 0) return;
  if (!request || !ProductValidation(request)) return;

  const payload = ids.map((productId) => ({
    id: productId,
    ...request,
  }));

  SweetAlert.loading(
    "Updating Products...",
    "Please wait while products are being updated."
  );

  try {
    await api.patch(
      "product-batchupdate",
      { request: payload },
      { timeout: 30000 }
    );

    SweetAlert.close();
    SweetAlert.success(
      "Products Updated",
      "All selected products have been successfully updated."
    );

    if (typeof handleRefetch === "function") {
      await handleRefetch();
    }
  } catch (error) {
    SweetAlert.close();
    console.error("BulkEditProduct error:", error);

    SweetAlert.error(
      "Update Failed",
      "Something went wrong while updating products. Please try again."
    );
  }
}
