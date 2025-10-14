import api from "@/api/axiosInstance.js";
import React from "react";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { validationField } from "@/utils/validation.jsx";

export async function CategoryFetch(setCategory) {
  try {
    const response = await api.get("/category");

    if (!response || !response.data) {
      throw new Error("Invalid server response");
    }

    const formattedCategories = response.data.map((item) => ({
      id: item.id,
      categoryName: item.category_name,
      categoryDescription: item.description,
    }));

    setCategory(formattedCategories);
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
}

function CategoryValidation(category) {
  for (const key in category) {
    const value = String(category[key] ?? "").trim();

    switch (key) {
      case "categoryName":
        if (!validationField.name.test(value)) {
          SweetAlert.error(
            "Invalid Category Name",
            "Please enter a valid category name. It must be at least 2 characters long and may only contain letters, spaces, apostrophes, or hyphens."
          );
          return false;
        }
        break;

      case "categoryDescription":
        if (value.length > 0 && !validationField.description.test(value)) {
          SweetAlert.error(
            "Invalid Description",
            "Please provide a valid description (3–150 characters). Only letters, numbers, spaces, and basic punctuation are allowed."
          );
          return false;
        }
        break;

      default:
        break;
    }
  }
  return true;
}

//  Add Category
export async function CategoryAdd(category, Refetch, HandleReset) {
  if (!category || !CategoryValidation(category)) return;

  const payload = {
    categoryName: category.categoryName.trim(),
    categoryDescription: category.categoryDescription.trim(),
  };

  try {
    const response = await api.post("category", payload);

    SweetAlert.success(
      "Category Added",
      `The category "${category.categoryName}" has been successfully created.`
    );

    if (typeof Refetch === "function") await Refetch();
    if (typeof HandleReset === "function") HandleReset();

    return response.data;
  } catch (err) {
    console.error("Error adding category:", err);
    const errorMessage =
      err?.response?.data?.message ||
      "An unexpected error occurred while adding the category. Please try again.";

    SweetAlert.error("Add Category Failed", errorMessage);
  }
}

// Edit Category
export async function CategoryEdit(category, Refetch, HandleReset) {
  if (!category || !CategoryValidation(category)) return;

  const payload = {
    categoryName: category.categoryName.trim(),
  };

  if (
    category.categoryDescription &&
    category.categoryDescription.trim() !== ""
  ) {
    payload.categoryDescription = category.categoryDescription.trim();
  }

  try {
    const response = await api.put(`category/${category.id}`, payload);

    SweetAlert.success(
      "Category Updated",
      "The category has been successfully updated."
    );

    if (typeof Refetch === "function") await Refetch();
    if (typeof HandleReset === "function") HandleReset();

    return response.data;
  } catch (err) {
    console.error("Error updating category:", err);
    const errorMessage =
      err?.response?.data?.message ||
      "Failed to update the category. Please try again.";

    SweetAlert.error("Update Failed", errorMessage);
  }
}
