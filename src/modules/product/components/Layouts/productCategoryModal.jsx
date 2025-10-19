import { useState, useDeferredValue, useCallback } from "react";
import { motion } from "framer-motion";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import {
  ArrowLeftFromLine,
  PlusCircle,
  Tag,
  FileText,
  SquarePen,
  Trash,
  PackageOpen,
} from "lucide-react";
import { Modal } from "@/components/Layouts/modal.jsx"; // Adjust this import to your actual Modal path
import { Input } from "@/components/ui/Input.jsx"; // Adjust this import to your actual Input path
import {
  CategoryAdd,
  CategoryEdit,
  CategorySoftDelete,
} from "@/modules/product/api/categoryApi.jsx";
import { EmptyStateDefault } from "@/components/ui/emptyState.jsx";
import { HandleInputChange } from "@/utils/InputValueChange.jsx";

export default function AddCategoryModal({
  isOpen,
  onClosed,
  fetchedCategory,
  refetch,
}) {
  const [inputCategory, setInputCategory] = useState({
    categoryName: "",
    categoryDescription: "",
  });
  const [onSubmit, setOnsubmit] = useState(false); //submit
  const [openAdd, setOpenAdd] = useState(false); //open add category state
  const [selectedId, setSelectedId] = useState(null); // selected id to be edit

  const category = useDeferredValue(fetchedCategory);

  //resetfields
  const HandleReset = () => {
    setInputCategory({ categoryName: "", categoryDescription: "" });
  };

  const Refetch = async () => {
    setSelectedId(null);
    setOpenAdd(false);
    await refetch();
  };

  const HandleClose = () => {
    onClosed();
    setSelectedId(null);
    setOpenAdd(false);
    if (onSubmit) return;
    HandleReset();
  };

  const inputs = [
    {
      name: "categoryName",
      placeholder: "Enter CategoryName",
      icon: Tag,
      value: inputCategory.categoryName,
    },
    {
      name: "categoryDescription",
      placeholder: "Enter Category Description",
      icon: FileText,
      value: inputCategory.categoryDescription,
    },
  ];

  const isFormValid = inputCategory.categoryName.trim().length > 0;

  //selecting to edit
  const HandleSelectEdit = useCallback((category) => {
    setSelectedId(category);
    setInputCategory({
      categoryName: category.categoryName,
      categoryDescription: category.categoryDescription,
    });
  }, []);

  const HandleSubmitRegister = async () => {
    if (onSubmit) return;
    if (!inputCategory) return;

    const name = inputCategory.categoryName?.trim() || "";
    const description = inputCategory.categoryDescription?.trim() || "";

    if (name === "") {
      SweetAlert.error(
        "Category name is required",
        "Please enter a valid category name."
      );
      return;
    }

    setOnsubmit(true);

    const request = { categoryName: name };
    if (description !== "") request.description = description;

    try {
      await CategoryAdd(request, Refetch, HandleReset);
    } finally {
      setOnsubmit(false);
    }
  };

  // Edit Category
  const HandleSubmitEdit = async () => {
    if (onSubmit) return;
    if (!inputCategory) return;

    const name = inputCategory.categoryName?.trim() || "";
    const description = inputCategory.categoryDescription?.trim() || "";

    if (
      name === selectedId.categoryName &&
      description === selectedId.categoryDescription
    ) {
      SweetAlert.error(
        "No changes detected",
        "Please modify the category before saving."
      );
      return;
    }

    setOnsubmit(true);

    const request = {
      id: selectedId.id,
      categoryName: name,
    };

    if (description !== "") {
      request.description = description;
    }

    try {
      await CategoryEdit(request, Refetch, HandleReset);
    } finally {
      setOnsubmit(false);
    }
  };

  //Deletion
  const HandleRemove = async (id, name) => {
    if (!id || !name) return;

    const confirmDelete = await SweetAlert.Confirm(
      "Category Deletion",
      `Do you confirm to delete category ${name}?`
    );

    if (!confirmDelete.isConfirmed) return;

    const request = {
      id: id,
      categoryname: name,
    };

    await CategorySoftDelete(request, Refetch);
  };

  return (
    <Modal
      ModalTitle="Category"
      isOpen={isOpen}
      onClosed={() => HandleClose()}
      margin={"mt-10 2xl:mb-10"}
    >
      <div className="overflow-auto h-[calc(100vh-200px)] 2xl:h-[calc(100vh-500px)]">
        {/* show all category */}
        {!openAdd && selectedId === null && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-800">
                Categories
              </h4>
              <button
                onClick={() => {
                  setOpenAdd(true);
                  HandleReset();
                  setSelectedId(null);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded-lg shadow cursor-pointer bg-violet-600 hover:bg-violet-700"
              >
                <PlusCircle className="w-4 h-4" />
                Add Category
              </button>
            </div>

            <div className="flex flex-col gap-4 ">
              {category.length > 0 ? (
                category.map((categ) => (
                  <div
                    key={categ.id}
                    className="flex items-start justify-between w-full p-5 transition bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md"
                  >
                    <div className="flex flex-col">
                      <h5 className="mb-1 text-base font-semibold text-gray-800">
                        {categ.categoryName}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {categ.categoryDescription ||
                          "No description provided."}
                      </p>
                    </div>

                    <div className="mt-1 text-sm text-gray-600 sm:mt-0">
                      <button
                        type="button"
                        onClick={() => HandleSelectEdit(categ)}
                        className="p-2 transition duration-200 rounded-full cursor-pointer text-violet-600 hover:bg-violet-100 active:bg-violet-200"
                        title="Edit Contact"
                      >
                        <SquarePen size={22} className="stroke-2" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          HandleRemove(categ.id, categ.categoryName)
                        }
                        className="p-2 text-orange-800 transition duration-200 rounded-full cursor-pointer hover:bg-orange-100 active:bg-violet-200"
                        title="Edit Contact"
                      >
                        <Trash size={22} className="stroke-2" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyStateDefault
                  title={"No Category Found"}
                  message={
                    "It looks like there are no category available at the moment. Try adding a new one or refreshing the page."
                  }
                  icon={"PackageOpen"}
                />
              )}
            </div>
          </div>
        )}

        {/* Add new category */}
        {openAdd && selectedId === null ? (
          <div className="flex flex-col justify-between h-full p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-center py-3 border-b-2 border-violet-500 bg-violet-50">
              <h4 className="text-xl font-bold tracking-wide uppercase text-violet-700">
                Register
              </h4>
            </div>
            <div className="flex flex-col h-full gap-4">
              {inputs.map((input) => (
                <div key={input.name}>
                  <Input
                    disabled={onSubmit}
                    placeholder={input.placeholder}
                    onChange={(e) =>
                      HandleInputChange(e, input.name, setInputCategory)
                    }
                    icons={input.icon}
                    value={input.value}
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              {/* Cancel */}
              <motion.button
                disabled={onSubmit}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                onClick={() => {
                  setOpenAdd(false);
                  HandleReset();
                  setSelectedId(null);
                }}
                className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-gray-600 transition border cursor-pointer sm:px-5 rounded-xl hover:bg-gray-100"
              >
                <ArrowLeftFromLine className="w-5 h-5" />
                Cancel
              </motion.button>

              {/* Submit */}
              <motion.button
                onClick={() => HandleSubmitRegister()}
                whileHover={{ scale: isFormValid ? 1.03 : 1 }}
                whileTap={{ scale: isFormValid ? 0.97 : 1 }}
                transition={{ duration: 0.15 }}
                disabled={!isFormValid}
                className={`flex cursor-pointer items-center gap-2 px-2 sm:px-5 py-2 text-xs font-semibold text-white rounded-xl shadow-md transition
              ${
                isFormValid
                  ? "bg-violet-600 hover:bg-violet-700 hover:shadow-lg"
                  : "bg-violet-300 cursor-not-allowed"
              }
            `}
              >
                {onSubmit ? (
                  <svg
                    className="w-5 h-5 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : (
                  <PlusCircle className="w-5 h-5" />
                )}
                {onSubmit ? "Submiting..." : "Add Category"}
              </motion.button>
            </div>
          </div>
        ) : null}

        {/* editcategory */}
        {!openAdd && selectedId !== null ? (
          <div className="flex flex-col h-full p-6 space-y-6">
            <div className="flex items-center justify-center py-3 border-b-2 border-violet-500 bg-violet-50">
              <h4 className="text-xl font-bold tracking-wide uppercase text-violet-700">
                Edit Category
              </h4>
            </div>
            <div className="flex flex-col h-full gap-4">
              {inputs.map((input) => (
                <div key={input.name}>
                  <Input
                    disabled={onSubmit}
                    placeholder={input.placeholder}
                    onChange={(e) =>
                      HandleInputChange(e, input.name, setInputCategory)
                    }
                    icons={input.icon}
                    value={input.value}
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              {/* Cancel */}
              <motion.button
                disabled={onSubmit}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                onClick={() => {
                  setOpenAdd(false);
                  HandleReset();
                  setSelectedId(null);
                }}
                className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-gray-600 transition border cursor-pointer sm:px-5 rounded-xl hover:bg-gray-100"
              >
                <ArrowLeftFromLine className="w-5 h-5" />
                Cancel
              </motion.button>

              {/* Submit */}
              <motion.button
                onClick={() => HandleSubmitEdit()}
                whileHover={{ scale: isFormValid ? 1.03 : 1 }}
                whileTap={{ scale: isFormValid ? 0.97 : 1 }}
                transition={{ duration: 0.15 }}
                disabled={!isFormValid}
                className={`flex items-center cursor-pointer gap-2 px-2 sm:px-5 py-2 text-xs font-semibold text-white rounded-xl shadow-md transition
              ${
                isFormValid
                  ? "bg-violet-600 hover:bg-violet-700 hover:shadow-lg"
                  : "bg-violet-300 cursor-not-allowed"
              }
            `}
              >
                {onSubmit ? (
                  <svg
                    className="w-5 h-5 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : (
                  <PlusCircle className="w-5 h-5" />
                )}

                {onSubmit ? "Editing..." : "Edit Category"}
              </motion.button>
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
