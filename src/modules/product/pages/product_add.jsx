import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";
import { Layout } from "@/components/Layouts/Layout.jsx";
import AddCategoryModal from "@/modules/product/components/Layouts/productCategoryModal.jsx";
import UnitModal from "@/modules/product/components/Layouts/productUnitModal.jsx";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import {
  ProductSubmit,
  FetchProductById,
  updateProduct,
} from "@/modules/product/api/productApi.jsx";
import { FetchUnit } from "@/modules/product/api/unitApi.jsx";
import { ProductConfig } from "@/modules/product/components/ui/productConfig.jsx";
//helper
import { GenerateProductCode } from "@/utils/generatecode.jsx";
import { CalculateSellingPrice } from "@/utils/calculator.jsx";
import { ProductInputValidation } from "@/modules/product/utils/productValidation.jsx";
import { HandleInputChange } from "@/utils/InputValueChange.jsx";

import { CategoryFetch } from "@/modules/product/api/categoryApi.jsx";

export default function AddProduct() {
  // ------------------------- Routing -------------------------
  const { id } = useParams(); //id sendd via url string
  const navigate = useNavigate(); //navigation to other page

  // ------------------------- Form State ----------------------
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

  // ------------------------- Image Handling -------------------------

  const imageRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  // ------------------------- Dropdown & Data Fetching -------------------------

  const [fetchedCategory, setFetchedCategory] = useState([]); //category fetch
  const [fetchedUnit, setFetchedUnit] = useState([]); //unit fetch

  //open category modal
  const [isAddCategory, setAddCategoryModal] = useState(false);
  //open unit modal
  const [unitModal, setUnitModal] = useState(false);

  //api
  const [loading, setLoading] = useState(true);

  //fetching functionality category
  const HandleFetchCategory = () => {
    CategoryFetch(setFetchedCategory);
  };

  //fetching functionality unit
  const HandleFetchUnit = () => {
    FetchUnit(setFetchedUnit);
  };

  //fetch category trigger
  useEffect(() => {
    HandleFetchCategory();
    HandleFetchUnit();
  }, []);

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

  // Handle dropdown selection (unit or category)
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

    // If no matching item is found
    if (!selectedItem) {
      HandleInputChange(null, field, setProductInfo);

      ProductInputValidation(null, field, setInputValid, rawPrice);

      setSelected((prev) => ({
        ...prev,
        [field === "unit" ? "selectedUnit" : "selectedCategory"]: null,
      }));

      return;
    }

    // If a valid item is selected:
    setSelected((prev) => ({
      ...prev,
      [field === "unit" ? "selectedUnit" : "selectedCategory"]: value,
    }));

    HandleInputChange(selectedItem.id, field, setProductInfo);
    ProductInputValidation(selectedItem.id, field, setInputValid, rawPrice);
  };

  // ------------------------- Price Auto Calculation -------------------------

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

  // ------------------------- Register Product -------------------------
  const [onSubmit, setOnsubmit] = useState(false); //submition state

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

  // ------------------------- Edit Product -------------------------
  const parsedId = useMemo(() => parseInt(id), [id]); //id converted to integer
  const [productEdit, setProductEdit] = useState(null); //product data to be edit, object

  const BounceRedirectionNav = () => navigate("/product-management");

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

  //input assign base on fetched id product to be edit
  const HandleInputAssign = (data = productEdit) => {
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

  // ------------------------- Render -------------------------
  return (
    <Layout currentWebPage="Register Product">
      {/*product page show*/}
      <ProductConfig
        productInfo={productInfo}
        inputValid={inputValid}
        selected={selected}
        categoryName={categoryName}
        unitname={unitname}
        onSubmit={onSubmit}
        productEdit={productEdit}
        parameterURL={id}
        imagePreview={imagePreview}
        imageRef={imageRef}
        //functionality
        HandleRemoveImage={HandleRemoveImage}
        ProductInputValidation={ProductInputValidation}
        HandleInputChange={HandleInputChange}
        HandleSelectChange={HandleSelectChange}
        HandleInputAssign={HandleInputAssign}
        HandleSubmit={HandleSubmit}
        EditProductSubmit={EditProductSubmit}
        //modal
        setAddCategoryModal={setAddCategoryModal}
        setUnitModal={setUnitModal}
        //input setter
        setInputValid={setInputValid}
        setProductInfo={setProductInfo}
      />

      {/*Category Modal*/}
      <AddCategoryModal
        onClosed={() => setAddCategoryModal(false)}
        isOpen={isAddCategory}
        refetch={HandleFetchCategory}
        fetchedCategory={fetchedCategory}
      />
      {/*Unit Modal*/}
      <UnitModal
        onClosed={() => setUnitModal(false)}
        isOpen={unitModal}
        refetch={HandleFetchUnit}
        FetchUnit={fetchedUnit}
      />
    </Layout>
  );
}
