import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";
import { Layout } from "@/components/Layouts/Layout.jsx";
import AddCategoryModal from "@/modules/product/components/Layouts/productCategoryModal.jsx";
import UnitModal from "@/modules/product/components/Layouts/productUnitModal.jsx";
import { Input } from "@/components/ui/Input.jsx";
import { RadioGroup } from "@/components/ui/radioGroup.jsx";
import { DefaultDropDown } from "@/components/ui/dropdown.jsx";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { motion } from "framer-motion";
import {
  ProductSubmit,
  FetchProductById,
  updateProduct,
} from "@/modules/product/api/productApi.jsx";
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
  const [loading, setLoading] = useState(true);
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

  //reset input functionality
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
    ); //calculate selling price functionality
    ProductInputValidation(
      productInfo.sellingPrice,
      "sellingPrice",
      setInputValid,
      productInfo.rawPrice
    ); //validate the changes
  }, [productInfo.rawPrice, productInfo.markUpPrice]);

  //categoryname display in dropdown list
  const categoryName = useMemo(
    () => fetchedCategory?.map((categ) => categ.categoryName) || [],
    [fetchedCategory]
  );

  //unitname display in dropdown list
  const unitname = useMemo(
    () => fetchedUnit?.map((unit) => unit.unitname) || [],
    [fetchedUnit]
  );

  // Handle dropdown selection changes for Unit or Category fields
  const HandleSelectChange = (value, field, setInputValid, rawPrice) => {
    let selectedItem = null;

    // Determine which list to search based on the field type
    if (field === "unit") {
      selectedItem = fetchedUnit?.find((unit) => unit.unitname === value);
    } else if (field === "category") {
      selectedItem = fetchedCategory?.find(
        (categ) => categ.categoryName === value
      );
    }

    // If no matching item is found (e.g., user clears or invalid value)
    if (!selectedItem) {
      // Clear the corresponding field value in the main product state
      HandleInputChange(null, field, setProductInfo);

      // Run validation with null value to show error if needed
      ProductInputValidation(null, field, setInputValid, rawPrice);

      // Reset the selected display value in the dropdown UI
      setSelected((prev) => ({
        ...prev,
        [field === "unit" ? "selectedUnit" : "selectedCategory"]: null,
      }));

      return;
    }

    // If a valid item is selected:

    // Update the dropdown display value (for UI only)
    setSelected((prev) => ({
      ...prev,
      [field === "unit" ? "selectedUnit" : "selectedCategory"]: value,
    }));

    // Update the actual ID value in the main product state (used for saving)
    HandleInputChange(selectedItem.id, field, setProductInfo);

    // Re-run validation using the selected item's ID
    ProductInputValidation(selectedItem.id, field, setInputValid, rawPrice);
  };

  //register product to Api
  const HandleSubmit = async () => {
    if (onSubmit) return;
    if (id !== "register") return;
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
      await ProductSubmit(request, HandleReset); //Api functionality register
    } finally {
      setOnsubmit(false);
    }
  };

  // -------------------------- Edit functionality ----------------------------
  const { id } = useParams(); //id sendd via url string
  const navigate = useNavigate(); //navigation to other page
  const [productEdit, setProductEdit] = useState(null); //product data to be edit, object
  const parsedId = useMemo(() => parseInt(id), [id]); //id converted to integer

  const BounceRedirectionNav = () => {
    navigate("/product-management");
  };

  //fetching product to be eddit
  const HandleFetchProduct = async () => {
    if (id === "register") return;

    if (isNaN(parsedId)) navigate("/product-management");
    await FetchProductById(parsedId, setProductEdit); //api fetching
  };

  //trigger fetching functionality
  useEffect(() => {
    HandleFetchProduct();
  }, [id]);

  //page checking if register or edit page
  useEffect(() => {
    if (productEdit === null) return;
    if (productEdit === false) {
      navigate("/product-management");
    }
    HandleInputAssign();
  }, [productEdit, id]);

  //Edit product
  const HandleEditSubmit = () => {
    if (onSubmit) return;
    setOnsubmit(true);
  };

  //input assign base on fetched id product to be edit
  const HandleInputAssign = (data = productEdit) => {
    //input
    setProductInfo({
      productname: data.productname,
      category: data.category_id,
      rawPrice: data.raw_price,
      markUpPrice: data.markup_price,
      sellingPrice: data.selling_price,
      isTaxable: data.taxable,
      status: data.product_status,
      unit: data.unit_id,
      reorderLevel: data.reorder_level,
      description: data.description,
    });

    //dropdown
    setSelected({
      selectedUnit: data.unit.unitname,
      selectedCategory: data.category.category_name,
    });
    setImagePreview(data.product_image_url);
  };

  const EditProductSubmit = async () => {
    if (onSubmit) return;
    if (productEdit === null || !productEdit) return;

    if (
      (productInfo.productImage === null ||
        productInfo.productImage === undefined) &&
      productInfo.productname === productEdit.productname &&
      productInfo.category === productEdit.category_id &&
      productInfo.rawPrice === productEdit.raw_price &&
      productInfo.markUpPrice === productEdit.markup_price &&
      productInfo.sellingPrice === productEdit.selling_price &&
      productInfo.isTaxable === productEdit.taxable &&
      productInfo.status === productEdit.product_status &&
      productInfo.unit === productEdit.unit_id &&
      productInfo.reorderLevel === productEdit.reorder_level &&
      (productInfo.description?.trim() || "") ===
        (productEdit.description?.trim() || "")
    ) {
      SweetAlert.info(
        "No Changes Detected",
        "Please make changes before you submit."
      );
      return;
    }
    setOnsubmit(true);

    const request = {
      id: productEdit.id,
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
    //conditional object
    if (productInfo.productImage) {
      request.productimage = productInfo.productImage;
    }
    try {
      await updateProduct(request, BounceRedirectionNav);
    } finally {
      setOnsubmit(false);
    }
  };

  //Option ----------------------
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
            <div className="relative flex justify-center w-full mr-0 sm:mr-20 2xl:mr-30 ">
              <div className="relative items-center justify-center hidden px-6 py-4 text-sm font-bold transition-all duration-300 ease-in-out border shadow-md cursor-pointer w-70 md:flex text-violet-700 bg-gradient-to-r from-violet-50 to-white border-violet-200 rounded-2xl hover:shadow-lg hover:scale-105 2xl:text-xl">
                <label className="flex items-center justify-center text-[1rem] tracking-wide text-center">
                  {id === "register"
                    ? "Register Product"
                    : `Edit ${productEdit?.productname ?? ""}`}
                </label>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center w-full gap-0 mt-0 md:mt-10 lg:gap-5 sm:mt-2 lg:flex-row">
            <div className="relative flex items-center justify-center w-full px-6 py-4 text-lg font-bold transition-all duration-300 ease-in-out border shadow-md cursor-pointer md:hidden text-violet-700 bg-gradient-to-r from-violet-50 to-white border-violet-200 rounded-2xl hover:shadow-lg hover:scale-105 2xl:text-xl">
              <label className="flex items-center justify-center text-sm tracking-wide text-center">
                {id === "register"
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

              {id === "register" ? (
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
