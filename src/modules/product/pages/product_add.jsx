import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";
import { Layout } from "@/components/Layouts/Layout.jsx";
import AddCategoryModal from "@/modules/product/components/Layouts/productCategoryModal.jsx";
import UnitModal from "@/modules/product/components/Layouts/productUnitModal.jsx";
import { Input } from "@/components/ui/Input.jsx";
import { RadioGroup } from "@/components/ui/radioGroup.jsx";
import { DefaultDropDown } from "@/components/ui/dropdown.jsx";
import { motion } from "framer-motion";
import { ProductSubmit } from "@/modules/product/api/productApi.jsx";
import { FetchUnit } from "@/modules/product/api/unitApi.jsx";

//helper
import { GenerateProductCode } from "@/utils/generatecode.jsx";
import { CalculateSellingPrice } from "@/utils/calculator.jsx";
import { ProductInputValidation } from "@/modules/product/utils/productValidation.jsx";
import { HandleInputChange } from "@/utils/InputValueChange.jsx";

//icon
import {
  Trash,
  ImageDown,
  PackageSearch,
  Group,
  Plus,
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
import { CategoryFetch } from "@/modules/product/api/categoryApi.jsx";

export default function AddProduct() {
  //input value
  const [productInfo, setProductInfo] = useState({
    productImage: null,
    productname: "",
    category: null,
    rawPrice: null,
    markUpPrice: null,
    sellingPrice: null,
    isTaxable: null,
    status: "",
    unit: null,
    reorderLevel: null,
    description: "",
  });

  //dropdownSelected
  const [selected, setSelected] = useState({
    selectedUnit: null,
    selectedCategory: null,
  });

  //input validation state
  const [inputValid, setInputValid] = useState({
    productImage: true,
    productname: true,
    category: true,
    rawPrice: true,
    markUpPrice: true,
    sellingPrice: true,
    isTaxable: true,
    status: true,
    unit: true,
    reorderLevel: true,
    description: true,
  });

  const imageRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  //open category modal
  const [isAddCategory, setAddCategoryModal] = useState(false);
  //open unit modal
  const [unitModal, setUnitModal] = useState(false);

  //api
  const [onSubmit, setOnsubmit] = useState(false); //submition state
  const [fetchedCategory, setFetchedCategory] = useState([]); //category fetch
  const [fetchedUnit, setFetchedUnit] = useState([]); //unit fetch

  //fetching functionality
  const HandleFetchCategory = () => {
    CategoryFetch(setFetchedCategory);
  };

  const HandleFetchUnit = () => {
    FetchUnit(setFetchedUnit);
  };

  //fetch category
  useEffect(() => {
    HandleFetchCategory();
    HandleFetchUnit();
  }, []);

  //Uploaded image preview
  useEffect(() => {
    const file = productInfo.productImage;
    if (file instanceof Blob) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      return () => URL.revokeObjectURL(preview);
    } else {
      setImagePreview(null);
    }
  }, [productInfo.productImage]);

  //image remove
  const HandleRemoveImage = (e, field) => {
    HandleInputChange(e, field, setProductInfo);
    if (imageRef.current !== null && imageRef.current !== undefined) {
      imageRef.current.value = null;
    }
  };

  //reset input
  const HandleReset = () => {
    setProductInfo({
      productImage: null,
      productname: "",
      category: null,
      rawPrice: null,
      markUpPrice: null,
      sellingPrice: null,
      isTaxable: null,
      status: "",
      unit: "",
      reorderLevel: null,
      description: "",
    });

    if (imageRef.current) {
      imageRef.current.value = null;
    }
    setSelected({
      selectedUnit: null,
      selectedCategory: null,
    });
    setImagePreview(null);
  };

  //calculate the selling price
  useEffect(() => {
    if (
      productInfo.rawPrice === null &&
      productInfo.markUpPrice === null &&
      productInfo.sellingPrice === null
    ) {
      return;
    }
    CalculateSellingPrice(
      productInfo.markUpPrice,
      productInfo.rawPrice,
      setProductInfo
    );
    ProductInputValidation(
      productInfo.sellingPrice,
      "sellingPrice",
      setInputValid,
      productInfo.rawPrice
    );
  }, [productInfo.rawPrice, productInfo.markUpPrice]);

  //category name display in dropdown
  const categoryName = useMemo(
    () => fetchedCategory?.map((categ) => categ.categoryName) || [],
    [fetchedCategory]
  );

  const unitname = useMemo(
    () => fetchedUnit?.map((unit) => unit.unitname) || [],
    [fetchedUnit]
  );

  const HandleSelectChange = (value, field, setInputValid, rawPrice) => {
    let selectedItem = null;

    if (field === "unit") {
      selectedItem = fetchedUnit?.find((unit) => unit.unitname === value);
    } else if (field === "category") {
      selectedItem = fetchedCategory?.find(
        (categ) => categ.categoryName === value
      );
    }

    if (!selectedItem) {
      HandleInputChange(null, field, setProductInfo);
      ProductInputValidation(null, field, setInputValid, rawPrice);

      setSelected((prev) => ({
        ...prev,
        [field === "unit" ? "selectedUnit" : "selectedCategory"]: null,
      }));

      return;
    }

    // Update local dropdown display
    setSelected((prev) => ({
      ...prev,
      [field === "unit" ? "selectedUnit" : "selectedCategory"]: value,
    }));

    // Update actual ID value in main state
    HandleInputChange(selectedItem.id, field, setProductInfo);
    ProductInputValidation(selectedItem.id, field, setInputValid, rawPrice);
  };

  //register product
  const HandleSubmit = async () => {
    if (onSubmit) return;
    setOnsubmit(true);

    const generatedCode = GenerateProductCode(productInfo.productname);

    const request = {
      generatedCode: generatedCode,
      productImage: productInfo.productImage,
      productname: productInfo.productname,
      category: productInfo.category,
      productunit: productInfo.unit,
      rawPrice: productInfo.rawPrice,
      markUpPrice: productInfo.markUpPrice,
      sellingPrice: productInfo.sellingPrice,
      isTaxable: productInfo.isTaxable,
      status: productInfo.status,
      reorderLevel: productInfo.reorderLevel,
      description: productInfo.description,
    };

    try {
      await ProductSubmit(request, HandleReset);
    } finally {
      setOnsubmit(false);
    }
  };

  //Option -------------
  //const Taxable Option list
  const taxableOption = [
    { label: "yes", value: true },
    { label: "no", value: false },
  ];

  //itemStatus option
  const Itemstatus = ["Active", "Inactive"];

  return (
    <Layout currentWebPage="Register Product">
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

            <div className="flex justify-center w-full mr-0 sm:mr-20 2xl:mr-30 ">
              <div className="flex items-center justify-center w-64 px-6 py-4 text-lg font-bold transition-all duration-300 ease-in-out border shadow-md cursor-pointer text-violet-700 bg-gradient-to-r from-violet-50 to-white border-violet-200 rounded-2xl hover:shadow-lg hover:scale-105 2xl:text-xl">
                <label className="tracking-wide">Register Product</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-0 mt-10 lg:gap-5 sm:mt-2 lg:flex-row">
            <div className="relative flex flex-col w-full h-full gap-3 py-5 lg:gap-5 lg:pr-5 xl:pl-10 2xl:pl-20">
              <div className="relative flex items-center justify-center gap-3 ">
                <div className="items-center justify-center hidden h-32 p-1 border-2 border-dashed w-42 md:flex bg-violet-50 border-violet-300 rounded-2xl">
                  {productInfo.productImage === undefined ||
                  productInfo.productImage === null ? (
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
                  placeholder={"drop image here"}
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
            </div>
          </div>
        </div>
      </div>

      <AddCategoryModal
        onClosed={() => setAddCategoryModal(false)}
        isOpen={isAddCategory}
        refetch={HandleFetchCategory}
        fetchedCategory={fetchedCategory}
      />

      <UnitModal
        onClosed={() => setUnitModal(false)}
        isOpen={unitModal}
        refetch={HandleFetchUnit}
        FetchUnit={fetchedUnit}
      />
    </Layout>
  );
}
