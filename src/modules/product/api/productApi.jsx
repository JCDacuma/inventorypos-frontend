import api from "@/api/axiosInstance.js";
import React from "react";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { validationField } from "@/utils/validation.jsx";

export async function FetchProduct() {}

function ProductValidation(product) {
  for (const key in product) {
    const value = product[key];

    switch (key) {
      case "productImage":
        if (!value) {
          SweetAlert.error("Invalid Input", "Please upload an image file.");
          return false;
        }

        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        const maxSize = 2 * 1024 * 1024;

        if (!allowedTypes.includes(value.type)) {
          SweetAlert.error(
            "Invalid File Type",
            "Only JPG, JPEG, or PNG files are allowed."
          );
          return false;
        }

        if (value.size > maxSize) {
          SweetAlert.error("File Too Large", "Image must not exceed 2MB.");
          return false;
        }
        break;

      case "productname":
        if (!validationField.productname.test(value)) {
          SweetAlert.error(
            "Invalid Product Name",
            "Product name must be 2–150 characters long and may only contain letters, numbers, spaces, dashes (-), underscores (_), or dots (.)"
          );
          return false;
        }
        break;

      case "category":
        if (!validationField.SelectedId.test(value)) {
          SweetAlert.error(
            "Invalid Category",
            "Please select a valid category."
          );
          return false;
        }
        break;

      case "rawPrice":
        if (!validationField.price.test(value)) {
          SweetAlert.error(
            "Invalid Raw Price",
            "Please enter a valid amount using numbers only (e.g., 100 or 99.99). The raw price cannot be empty or contain symbols."
          );
          return false;
        }
        break;

      case "markUpPrice":
        if (!validationField.markupprice.test(value)) {
          SweetAlert.error(
            "Invalid Mark-Up Percentage",
            "Please enter a valid percentage (e.g., 10 or 5.5). Only positive numbers and up to two decimal places are allowed."
          );
          return false;
        }
        break;

      case "sellingPrice":
        if (!validationField.price.test(value)) {
          SweetAlert.error(
            "Invalid Selling Price",
            "Please enter a valid numeric price (e.g., 150 or 149.99)."
          );
          return false;
        }
        if (parseFloat(value) < parseFloat(product.rawPrice || 0)) {
          SweetAlert.error(
            "Selling Price Too Low",
            "The selling price must be greater than or equal to the raw price to avoid losses."
          );
          return false;
        }
        break;

      case "isTaxable":
        if (!validationField.boolean.test(value)) {
          SweetAlert.error(
            "Invalid Value",
            "Taxable field must be true or false."
          );
          return false;
        }
        break;

      case "status":
        if (!validationField.name.test(value)) {
          SweetAlert.error("Invalid Status", "Please enter a valid status.");
          return false;
        }
        break;

      case "unit":
        if (!validationField.productname.test(value)) {
          SweetAlert.error("Invalid Unit", "Unit name format is invalid.");
          return false;
        }
        break;

      case "reorderLevel":
        if (!validationField.quantity.test(value)) {
          SweetAlert.error(
            "Invalid Quantity",
            "Reorder level must be a whole number greater than 0."
          );
          return false;
        }
        break;

      case "description":
        if (!validationField.description.test(value)) {
          SweetAlert.error(
            "Invalid Description",
            "Please enter a valid description."
          );
          return false;
        }
        break;
    }
  }

  return true;
}

export async function ProductSubmit(request, reset) {
  if (!request || !ProductValidation(request)) return;

  const form = new FormData();

  form.append("productimage", request.productImage);
  form.append("productname", request.productname?.trim());
  form.append("category", request.category);
  form.append("rawprice", request.rawPrice);
  form.append("markupprice", request.markUpPrice);
  form.append("sellingprice", request.sellingPrice);
  form.append("istaxable", request.isTaxable ? "1" : "0");
  form.append("status", request.status || "Active");
  form.append("unit", request.unit?.trim());
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
