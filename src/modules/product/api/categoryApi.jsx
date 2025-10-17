import api from "@/api/axiosInstance.js";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { validationField } from "@/utils/validation.jsx";
import { ProductValidation } from "@/modules/product/utils/productValidation.jsx";

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

// Add Category
export async function CategoryAdd(category, Refetch, HandleReset) {
  if (!category || !ProductValidation(category)) return;

  const payload = {
    categoryName: category.categoryName.trim(),
    category_status: "Active",
  };

  if (category.description && category.description.trim() !== "") {
    payload.categoryDescription = category.description.trim();
  }

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
  if (!category || !ProductValidation(category)) return;

  const payload = {
    categoryName: category.categoryName.trim(),
    category_status: "Active",
  };

  if (category.description && category.description.trim() !== "") {
    payload.categoryDescription = category.description.trim();
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

//delete category
export async function CategorySoftDelete(request, Handlefetch) {
  if (!request || !request.id) return;

  const category = {
    category_status: "Deleted",
  };

  try {
    await api.patch(`productcategory-delete/${request.id}`, category);

    SweetAlert.success(
      `Successfully deleted ${request.categoryname || "category"}`
    );

    if (typeof Handlefetch === "function") Handlefetch();
  } catch (err) {
    console.error("Error deleting unit:", err);
    SweetAlert.error("Failed to delete unit. Please try again.");
  }
}
