import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/Input.jsx";
import { RadioGroup } from "@/components/ui/radioGroup.jsx";
import { DefaultDropDown } from "@/components/ui/dropdown.jsx";

import { motion } from "framer-motion";

//icon
import {
  Trash,
  ImageDown,
  PackageSearch,
  Group,
  ListRestart,
  Weight,
  PhilippinePeso,
  Percent,
  Banknote,
  HandCoins,
  CircleCheckBig,
  ShoppingCart,
  Notebook,
  FolderOpen,
} from "lucide-react";

/**
 * ProductConfig Component
 *
 * This component serves as the main configuration UI for registering or editing a product.
 * It handles displaying product fields, validation states, image preview, dropdown selections,
 * and triggers either register or edit submission depending on the URL parameter.
 *
 * @component
 * @param {Object} props - Component properties
 *
 * @param {Object} props.productInfo - Current product form values.
 * @param {File|null} props.productInfo.productImage - Uploaded product image file.
 * @param {string} props.productInfo.productname - Product name input value.
 * @param {number|null} props.productInfo.category - Selected category ID.
 * @param {number|null} props.productInfo.rawPrice - Product raw price.
 * @param {number|null} props.productInfo.markUpPrice - Product markup price.
 * @param {number|null} props.productInfo.sellingPrice - Computed selling price.
 * @param {boolean|null} props.productInfo.isTaxable - Taxable status.
 * @param {string} props.productInfo.status - Product status string.
 * @param {number|null} props.productInfo.unit - Selected unit ID.
 * @param {number|null} props.productInfo.reorderLevel - Reorder level quantity.
 * @param {string} props.productInfo.description - Product description text.
 *
 * @param {Object} props.inputValid - Validation state for each input field (true = valid, false = invalid).
 * @param {Object} props.selected - Current selected display values for dropdowns.
 * @param {string|null} props.selected.selectedUnit - Selected unit display name.
 * @param {string|null} props.selected.selectedCategory - Selected category display name.
 *
 * @param {string[]} props.categoryName - List of category names for dropdown options.
 * @param {string[]} props.unitname - List of unit names for dropdown options.
 *
 * @param {boolean} props.onSubmit - Submission loading state (disables submit buttons while true).
 * @param {Object|null} props.productEdit - Original product data fetched for editing (null for new product).
 * @param {string|number} props.parameterURL - URL parameter (either "register" or product ID).
 *
 * @param {string|null} props.imagePreview - Object URL or string for displaying image preview.
 * @param {React.RefObject<HTMLInputElement>} props.imageRef - Ref for the file input element to manually clear it.
 *
 * @param {Function} props.HandleRemoveImage - Removes selected image from state.
 * @param {Function} props.ProductInputValidation - Validates input fields (fieldName, value, etc.).
 * @param {Function} props.HandleInputChange - Handles text/number input changes and updates productInfo.
 * @param {Function} props.HandleSelectChange - Handles dropdown selection changes (unit/category).
 * @param {Function} props.HandleInputAssign - Assigns fetched product data to form state for editing.
 * @param {Function} props.HandleSubmit - Submits new product data to API (register mode).
 * @param {Function} props.EditProductSubmit - Submits edited product data to API (edit mode).
 *
 * @param {Function} props.setAddCategoryModal - Opens or closes the Add Category modal (boolean setter).
 * @param {Function} props.setUnitModal - Opens or closes the Add Unit modal (boolean setter).
 *
 * @param {Function} props.setInputValid - Setter for input validation state.
 * @param {Function} props.setProductInfo - Setter for productInfo state.
 *
 * @returns {JSX.Element} Product configuration UI
 */

export function ProductConfig({
  productInfo,
  inputValid,
  selected,
  categoryName,
  unitname,
  onSubmit,
  productEdit,
  parameterURL,
  imagePreview,
  imageRef,

  //functionality
  HandleRemoveImage,
  ProductInputValidation,
  HandleInputChange,
  HandleSelectChange,
  HandleInputAssign,
  HandleSubmit,
  EditProductSubmit,
  //modal
  setAddCategoryModal,
  setUnitModal,

  //input setter
  setInputValid,
  setProductInfo,
}) {
  //const Taxable Option list
  const taxableOption = [
    { label: "yes", value: true },
    { label: "no", value: false },
  ];

  //itemStatus option
  const Itemstatus = ["Active", "Inactive"];

  return (
    <div className="w-full h-full px-1 pt-16 pb-2 bg-white ">
      <div className="flex flex-col items-center w-full h-full gap-2 px-3 py-4 overflow-auto sm:py-10 sm:px-10 ">
        <div className="flex flex-col items-center justify-start w-full h-20 gap-5 sm:gap-0 sm:justify-center sm:flex-row ">
          <div className="flex justify-start w-full sm:w-20">
            <Link to={"/product-management"}>
              <motion.button
                disabled={onSubmit}
                whileHover={{
                  backgroundColor: "#4E1CA6",
                  color: "#fff",
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="relative z-10 px-5 py-2 text-sm font-semibold border border-gray-200 shadow-md cursor-pointer text-violet-600 rounded-xl hover:shadow-lg"
              >
                Back
              </motion.button>
            </Link>
          </div>
          <div className="relative flex justify-center w-full mr-0 sm:mr-20 2xl:mr-30 ">
            <div className="relative items-center justify-center hidden px-6 py-4 text-sm font-bold transition-all duration-300 ease-in-out border shadow-md cursor-pointer w-70 md:flex text-violet-700 bg-gradient-to-r from-violet-50 to-white border-violet-200 rounded-2xl hover:shadow-lg hover:scale-105 2xl:text-xl">
              <label className="flex items-center justify-center text-[1rem] tracking-wide text-center">
                {parameterURL === "register"
                  ? "Register Product"
                  : `Edit ${productEdit?.productname ?? ""}`}
              </label>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center w-full gap-0 mt-0 md:mt-10 lg:gap-5 sm:mt-2 lg:flex-row">
          <div className="relative flex items-center justify-center w-full px-6 py-4 text-lg font-bold transition-all duration-300 ease-in-out border shadow-md cursor-pointer md:hidden text-violet-700 bg-gradient-to-r from-violet-50 to-white border-violet-200 rounded-2xl hover:shadow-lg hover:scale-105 2xl:text-xl">
            <label className="flex items-center justify-center text-sm tracking-wide text-center">
              {parameterURL === "register"
                ? "Register Product"
                : `Edit ${productEdit?.productname ?? ""}`}
            </label>
          </div>

          <div className="relative flex flex-col w-full h-full gap-3 py-5 lg:gap-5 lg:pr-5 xl:pl-10 2xl:pl-20">
            <div className="relative flex flex-col items-center justify-center gap-3 sm:flex-row ">
              <div className="relative flex items-center justify-center p-1 border-2 border-dashed h-25 md:h-32 w-38 md:w-42 bg-violet-50 border-violet-300 rounded-2xl">
                {!imagePreview ? (
                  <p className="text-xs font-medium text-center text-violet-500">
                    Image will appear here
                  </p>
                ) : (
                  <img
                    src={imagePreview}
                    className="object-cover w-full h-full rounded-xl"
                  />
                )}
              </div>
              <Input
                disabled={onSubmit}
                placeholder={
                  !productEdit
                    ? "Click to upload product image"
                    : "Click to change product image"
                }
                onChange={(e) =>
                  HandleInputChange(e, "productImage", setProductInfo)
                }
                type={"file"}
                haveBtn={true}
                buttonIcon={Trash}
                icons={ImageDown}
                OnClick={() => HandleRemoveImage(null, "productImage")}
                Ref={imageRef}
                file={productInfo.productImage}
              />
            </div>
            <div>
              <Input
                disabled={onSubmit}
                placeholder={"Enter item name"}
                onChange={(e) => {
                  HandleInputChange(e, "productname", setProductInfo);
                  ProductInputValidation(
                    e,
                    "productname",
                    setInputValid,
                    productInfo.rawPrice
                  );
                }}
                icons={PackageSearch}
                value={productInfo.productname}
                validated={inputValid.productname}
              />
            </div>
            <div className="mt-2">
              <DefaultDropDown
                disabled={onSubmit}
                placeholder={"Select category"}
                selectedValue={selected.selectedCategory}
                icons={Group}
                BtnIcons={FolderOpen}
                items={categoryName}
                validated={inputValid.category}
                SetSelected={(e) => {
                  HandleSelectChange(
                    e,
                    "category",
                    setInputValid,
                    productInfo.rawPrice
                  );
                }}
                OnClick={() => setAddCategoryModal(true)}
              />
            </div>

            <div>
              <Input
                disabled={onSubmit}
                placeholder={"Enter raw price"}
                value={productInfo.rawPrice}
                validated={inputValid.rawPrice}
                onChange={(e) => {
                  HandleInputChange(e, "rawPrice", setProductInfo);
                  ProductInputValidation(
                    e,
                    "rawPrice",
                    setInputValid,
                    productInfo.rawPrice
                  );
                }}
                icons={PhilippinePeso}
              />
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-3 sm:gap-1 sm:flex-row ">
              <Input
                disabled={onSubmit}
                placeholder={"mark up price"}
                value={productInfo.markUpPrice}
                validated={inputValid.markUpPrice}
                onChange={(e) => {
                  HandleInputChange(e, "markUpPrice", setProductInfo);
                  ProductInputValidation(
                    e,
                    "markUpPrice",
                    setInputValid,
                    productInfo.rawPrice
                  );
                }}
                icons={Percent}
              />
              <Input
                disabled={onSubmit}
                placeholder={"selling price"}
                value={productInfo.sellingPrice}
                validated={inputValid.sellingPrice}
                onChange={(e) => {
                  HandleInputChange(e, "sellingPrice", setProductInfo);
                  ProductInputValidation(
                    e,
                    "sellingPrice",
                    setInputValid,
                    productInfo.rawPrice
                  );
                }}
                icons={Banknote}
              />
            </div>
          </div>
          <div className="relative flex flex-col w-full h-full gap-3 py-5 lg:gap-5 lg:pl-5 xl:pr-10 2xl:pr-20 ">
            <div className="flex flex-col w-full gap-2">
              <div className="flex gap-1 text-violet-500">
                <HandCoins />
                <label>Taxable?</label>
              </div>

              <RadioGroup
                disabled={onSubmit}
                options={taxableOption}
                value={productInfo.isTaxable}
                validated={inputValid.isTaxable}
                onChange={(e) => {
                  HandleInputChange(e, "isTaxable", setProductInfo);
                  ProductInputValidation(
                    e,
                    "isTaxable",
                    setInputValid,
                    productInfo.rawPrice
                  );
                }}
              />
            </div>
            <div className="mt-2">
              <DefaultDropDown
                disabled={onSubmit}
                placeholder={"Select status"}
                items={Itemstatus}
                selectedValue={productInfo.status}
                SetSelected={(e) => {
                  HandleInputChange(e, "status", setProductInfo);
                  ProductInputValidation(
                    e,
                    "status",
                    setInputValid,
                    productInfo.rawPrice
                  );
                }}
                validated={inputValid.status}
                icons={CircleCheckBig}
              />
            </div>

            <div>
              <div className="mt-2">
                <DefaultDropDown
                  disabled={onSubmit}
                  placeholder={"Select unit"}
                  selectedValue={selected.selectedUnit}
                  icons={Weight}
                  BtnIcons={FolderOpen}
                  items={unitname}
                  validated={inputValid.unit}
                  SetSelected={(e) => {
                    HandleSelectChange(
                      e,
                      "unit",
                      setInputValid,
                      productInfo.rawPrice
                    );
                  }}
                  OnClick={() => setUnitModal(true)}
                />
              </div>
            </div>
            <div>
              <Input
                disabled={onSubmit}
                placeholder={"Enter reorder level"}
                value={productInfo.reorderLevel}
                validated={inputValid.reorderLevel}
                onChange={(e) => {
                  HandleInputChange(e, "reorderLevel", setProductInfo);
                  ProductInputValidation(
                    e,
                    "reorderLevel",
                    setInputValid,
                    productInfo.rawPrice
                  );
                }}
                icons={ShoppingCart}
              />
            </div>

            <div>
              <Input
                disabled={onSubmit}
                placeholder={"Enter description"}
                value={productInfo.description}
                validated={inputValid.description}
                onChange={(e) => {
                  HandleInputChange(e, "description", setProductInfo);
                  ProductInputValidation(
                    e,
                    "description",
                    setInputValid,
                    productInfo.rawPrice
                  );
                }}
                icons={Notebook}
              />
            </div>

            {parameterURL === "register" ? (
              <motion.button
                onClick={() => HandleSubmit()}
                whileHover={{ scale: 1.01, backgroundColor: "#562FA8" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeInOut" }}
                className={`flex ${
                  onSubmit ? `bg-gray-400` : `bg-violet-500 cursor-pointer`
                }  items-center justify-center w-full gap-2 py-3 font-bold text-white  select-none  rounded-2xl`}
              >
                {onSubmit && (
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
                )}
                Register Product
              </motion.button>
            ) : (
              <div className="flex justify-center w-full gap-3">
                <motion.button
                  disabled={onSubmit}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  onClick={() => HandleInputAssign()}
                  className={`flex items-center cursor-pointer  justify-center bg-violet-500 hover:bg-violet-800 rounded-2xl text-white px-5`}
                >
                  <ListRestart />
                </motion.button>
                <motion.button
                  onClick={() => EditProductSubmit()}
                  whileHover={{ scale: 1.01, backgroundColor: "#562FA8" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                  className={`flex ${
                    onSubmit ? `bg-gray-400` : `bg-violet-500 cursor-pointer`
                  }  items-center justify-center w-full gap-2 py-3 font-bold text-white  select-none  rounded-2xl`}
                >
                  {onSubmit && (
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
                  )}
                  Edit Product
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
