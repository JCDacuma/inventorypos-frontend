import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layouts/Layout.jsx";
import AddCategoryModal from "@/modules/product/components/Layouts/productCategoryModal.jsx";
import { Input } from "@/components/ui/input.jsx";
import { RadioGroup } from "@/components/ui/radioGroup.jsx";
import { DefaultDropDown } from "@/components/ui/dropdown.jsx";
import { motion } from "framer-motion";
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
  Truck,
  Warehouse,
  ShoppingCart,
  Notebook,
} from "lucide-react";
export default function AddProduct() {
  const [productImage, setProductImage] = useState(null);
  const imageRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [productname, setProductName] = useState("");
  const [category, setCategory] = useState({});
  const [unit, setUnit] = useState("");
  const [rawPrice, setRawPrice] = useState("");
  const [markUpPrice, setMarkupPrice] = useState(null);
  const [sellingPrice, setSellingPrice] = useState(null);

  //Second column
  const [isTaxable, noTaxable] = useState(null);
  const [status, setStatus] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [stockQuantity, setStock] = useState(null);
  const [reorderLevel, setReorder] = useState(null);
  const [description, setDescription] = useState("");

  //const Taxable Option list
  const taxableOption = [
    { label: "yes", value: true },
    { label: "no", value: false },
  ];

  //Sample data category
  const categorySampleData = [
    { id: 1, categoryName: "Electronics" },
    { id: 2, categoryName: "Appliances" },
    { id: 3, categoryName: "Clothing & Apparel" },
    { id: 4, categoryName: "Footwear" },
    { id: 5, categoryName: "Cosmetics & Personal Care" },
    { id: 6, categoryName: "Groceries" },
    { id: 7, categoryName: "Household Supplies" },
    { id: 8, categoryName: "Beverages" },
    { id: 9, categoryName: "Appetizers" },
    { id: 10, categoryName: "Main Course" },
    { id: 11, categoryName: "Desserts" },
    { id: 12, categoryName: "Add-ons / Extras" },
    { id: 13, categoryName: "Raw Materials" },
    { id: 14, categoryName: "Finished Goods" },
    { id: 15, categoryName: "Packaging Materials" },
  ];

  //Supplier sample data fetch
  const supplier = [
    {
      id: 1,
      suppliername: "Dell Supplier Inc.",
      contactperson: "John Smith",
      phonenumber: "+63 912 345 6789",
      vatregistered: "Yes",
      shippingfee: "₱2,500",
    },
    {
      id: 2,
      suppliername: "Tech Distributors Ltd.",
      contactperson: "Emily Davis",
      phonenumber: "+63 917 222 3344",
      vatregistered: "No",
      shippingfee: "₱1,800",
    },
    {
      id: 3,
      suppliername: "Logitech Distribution",
      contactperson: "Michael Lee",
      phonenumber: "+63 918 555 7788",
      vatregistered: "Yes",
      shippingfee: "₱1,200",
    },
    {
      id: 4,
      suppliername: "Apple Authorized Dist.",
      contactperson: "Sophia Tan",
      phonenumber: "+63 915 111 2233",
      vatregistered: "Yes",
      shippingfee: "₱3,000",
    },
    {
      id: 5,
      suppliername: "Samsung Electronics",
      contactperson: "David Kim",
      phonenumber: "+63 916 777 8899",
      vatregistered: "No",
      shippingfee: "₱2,200",
    },
  ];

  //category
  const categoryName = [
    ...new Set(categorySampleData.map((category) => category.categoryName)),
  ];

  //set Selected category
  const selectedCategoryId = (value) => {
    const selectedCategory = categorySampleData.find(
      (category) => category.categoryName === value
    );

    if (selectedCategory) {
      setCategory(selectedCategory);
    } else {
      setCategory({});
    }
  };

  //open add category
  const [isAddCategory, setAddCategoryModal] = useState(false);

  //supplier
  const supplierOption = [...new Set(supplier.map((sup) => sup.suppliername))];

  //set selected supplier
  const HandleSelectedSupplier = (value) => {
    const Selectedsupplier = supplier.find((sup) => sup.suppliername === value);

    if (Selectedsupplier) {
      setSelectedSupplier(Selectedsupplier);
    } else {
      setSelectedSupplier({});
    }
  };

  //itemStatus
  const Itemstatus = ["Active", "Inactive"];

  //Uploaded image preview
  useEffect(() => {
    if (productImage) {
      const preview = URL.createObjectURL(productImage);
      setImagePreview(preview);
    }
  }, [productImage]);

  const HandleRemoveImage = () => {
    setProductImage(null);
    setImagePreview(null);

    if (imageRef.current !== null || imageRef.current !== undefined) {
      imageRef.current.value = null;
    }
  };
  return (
    <Layout currentWebPage="Register Product">
      <div className="w-full h-full px-1 pt-16 pb-2 bg-white ">
        <div className="flex flex-col items-center w-full h-full gap-2 px-3 py-4 overflow-auto sm:py-10 sm:px-10 ">
          <div className="flex flex-col items-center justify-start w-full h-20 gap-5 sm:gap-0 sm:justify-center sm:flex-row ">
            <div className="flex justify-start w-full sm:w-20">
              <Link to={"/product-management"}>
                <motion.button
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
                  {productImage === undefined || productImage === null ? (
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
                  placeholder={"drop image here"}
                  onChange={setProductImage}
                  type={"file"}
                  haveBtn={true}
                  buttonIcon={Trash}
                  icons={ImageDown}
                  OnClick={HandleRemoveImage}
                  Ref={imageRef}
                />
              </div>
              <div>
                <Input
                  placeholder={"Enter item name"}
                  onChange={setProductName}
                  icons={PackageSearch}
                  value={productname}
                />
              </div>
              <div className="mt-2">
                <DefaultDropDown
                  placeholder={"Select category"}
                  initialDisplay={"Choose category"}
                  items={categoryName}
                  SetSelected={selectedCategoryId}
                  icons={Group}
                  BtnIcons={Plus}
                  selectedValue={category.categoryName}
                  OnClick={() => setAddCategoryModal(true)}
                />
              </div>
              <div>
                <Input
                  placeholder={"Enter item unit (eg. Kg)"}
                  value={unit}
                  onChange={setUnit}
                  icons={Weight}
                />
              </div>
              <div>
                <Input
                  placeholder={"Enter raw price"}
                  value={rawPrice}
                  onChange={setRawPrice}
                  icons={PhilippinePeso}
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full gap-3 sm:gap-1 sm:flex-row ">
                <Input
                  placeholder={"mark up price"}
                  value={markUpPrice}
                  onChange={setMarkupPrice}
                  icons={Percent}
                />
                <Input
                  placeholder={"selling price"}
                  value={sellingPrice}
                  onChange={setSellingPrice}
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
                  options={taxableOption}
                  value={isTaxable}
                  onChange={noTaxable}
                  name={"taxable"}
                />
              </div>
              <div className="mt-2">
                <DefaultDropDown
                  placeholder={"Select status"}
                  items={Itemstatus}
                  selectedValue={status}
                  onChange={setStatus}
                  icons={CircleCheckBig}
                />
              </div>
              <div className="mt-2">
                <DefaultDropDown
                  placeholder={"Select supplier"}
                  items={supplierOption}
                  selectedValue={selectedSupplier.suppliername}
                  SetSelected={setSelectedSupplier}
                  icons={Truck}
                />
              </div>
              <div>
                <Input
                  placeholder={"Enter stock quantity"}
                  value={stockQuantity}
                  onChange={setStock}
                  icons={Warehouse}
                />
              </div>
              <div>
                <Input
                  placeholder={"Enter reorder level"}
                  value={reorderLevel}
                  onChange={setReorder}
                  icons={ShoppingCart}
                />
              </div>
              <div>
                <Input
                  placeholder={"Enter description"}
                  value={description}
                  onChange={setDescription}
                  icons={Notebook}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01, backgroundColor: "#562FA8" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeInOut" }}
                className="w-full py-3 font-bold text-white cursor-pointer select-none bg-violet-500 rounded-2xl"
              >
                Register Product
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <AddCategoryModal
        onClosed={() => setAddCategoryModal(false)}
        isOpen={isAddCategory}
      />
    </Layout>
  );
}
