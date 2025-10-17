import api from "@/api/axiosInstance.js";
import React from "react";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { validationField } from "@/utils/validation.jsx";
import { ProductValidation } from "@/modules/product/utils/productValidation.jsx";

export async function FetchProduct(setProduct) {
  try {
    const response = await api.get("product");

    if (!response || !response.data) {
      throw new Error("Invalid server response");
    }

    const product = response.data.map((item) => ({
      id: item.id,
      product_code: item.product_code,
      product_image: item.product_image_url,
      productname: item.productname,
      category_id: item.category_id,
      category_name: item.product_category,
      unit_id: item.unit_id,
      markup_price: item.markup_price,
      raw_price: item.raw_price,
      selling_price: item.selling_price,
      taxable: item.taxable,
      product_status: item.product_status,
      reorder_level: item.reorder_level,
      description: item.description,
    }));

    setProduct(product);
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

  try {
    const response = await api.post("product", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    SweetAlert.success(
      "Successfully Registered",
      "Product has been successfully added to the database."
    );
    reset();
    return response.data;
  } catch (err) {
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

export async function Edit() {}
