import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Page Layout component
import {
  Layout,
  MainWrapper,
  ButtonLayout,
  ControlLayout,
} from "../Layouts/Layout";

import { useMediaQuery } from "react-responsive";
//Animation
import { motion, AnimatePresence } from "framer-motion";

//icons
import {
  ArrowBigRight,
  Search,
  Truck,
  ShoppingBasket,
  ChevronsRight,
  Trash,
  Plus,
  Minus,
  PackageX,
  Store,
} from "lucide-react";

export default function CreateOrder() {
  const isDesktop = useMediaQuery({ minWidth: 968 });

  //sample supplier data fetch
  const supplier = [
    {
      id: 1,
      suppliername: "Dell Supplier Inc.",
      contactperson: "John Smith",
      phonenumber: "+63 912 345 6789",
      vatregistered: "Yes",
      shippingfee: "₱2,500",
      status: "Active",
    },
    {
      id: 2,
      suppliername: "Tech Distributors Ltd.",
      contactperson: "Emily Davis",
      phonenumber: "+63 917 222 3344",
      vatregistered: "No",
      shippingfee: "₱1,800",
      status: "Inactive",
    },
    {
      id: 3,
      suppliername: "Logitech Distribution",
      contactperson: "Michael Lee",
      phonenumber: "+63 918 555 7788",
      vatregistered: "Yes",
      shippingfee: "₱1,200",
      status: "Active",
    },
    {
      id: 4,
      suppliername: "Apple Authorized Dist.",
      contactperson: "Sophia Tan",
      phonenumber: "+63 915 111 2233",
      vatregistered: "Yes",
      shippingfee: "₱3,000",
      status: "Inactive",
    },
    {
      id: 5,
      suppliername: "Samsung Electronics",
      contactperson: "David Kim",
      phonenumber: "+63 916 777 8899",
      vatregistered: "No",
      shippingfee: "₱2,200",
      status: "Active",
    },
    {
      id: 6,
      suppliername: "Grocery Trading Corp.",
      contactperson: "Maria Lopez",
      phonenumber: "+63 913 444 5566",
      vatregistered: "Yes",
      shippingfee: "₱900",
      status: "Inactive",
    },
    {
      id: 7,
      suppliername: "Furniture World Supply",
      contactperson: "James Rodriguez",
      phonenumber: "+63 919 888 3344",
      vatregistered: "No",
      shippingfee: "₱1,500",
      status: "Active",
    },
    {
      id: 8,
      suppliername: "Clothing Hub Dist.",
      contactperson: "Anna Garcia",
      phonenumber: "+63 914 222 7788",
      vatregistered: "Yes",
      shippingfee: "₱1,000",
      status: "Inactive",
    },
    {
      id: 9,
      suppliername: "Nestle Philippines",
      contactperson: "Maria Santos",
      phonenumber: "+63 913 444 5566",
      vatregistered: "Yes",
      shippingfee: "₱1000",
      status: "Active",
    },
  ];

  /*---------- Suppliers Controls  ----------- */
  //sample registered product data fetch
  const [supplierProduct, setSupplierProduct] = useState([
    {
      id: 1,
      itemname: "Nescafé Classic 100g",
      category: "Beverages",
      Quantity: 1,
      Unit: "Pack",
      price: 1,
      supplierID: 9, //Nestle Philippines
    },
    {
      id: 2,
      itemname: "Dell Inspiron 15 Laptop",
      category: "Electronics",
      Quantity: 1,
      Unit: "pcs",
      price: 35000,
      supplierID: 1, // Dell Supplier Inc.
    },
    {
      id: 3,
      itemname: "Logitech M185 Wireless Mouse",
      category: "Electronics",
      Quantity: 1,
      Unit: "pcs",
      price: 800,
      supplierID: 3, // Logitech Distribution
    },
    {
      id: 4,
      itemname: "iPhone 14 Smartphone",
      category: "Electronics",
      Quantity: 1,
      Unit: "pcs",
      price: 45000,
      supplierID: 4, // Apple Authorized Dist.
    },
    {
      id: 5,
      itemname: "Rice 5kg Bag",
      category: "Grocery",
      Quantity: 1,
      Unit: "kg",
      price: 250,
      supplierID: 6, // Grocery Trading Corp.
    },
    {
      id: 6,
      itemname: "Cooking Oil 1L Bottle",
      category: "Grocery",
      Quantity: 1,
      Unit: "liters",
      price: 85,
      supplierID: 6, // Grocery Trading Corp.
    },
    {
      id: 7,
      itemname: "Fresh Bananas",
      category: "Grocery",
      Quantity: 1,
      Unit: "kg",
      price: 60,
      supplierID: 6, // Grocery Trading Corp.
    },
    {
      id: 8,
      itemname: "Ergonomic Office Chair",
      category: "Furniture",
      Quantity: 1,
      Unit: "pcs",
      price: 8500,
      supplierID: 7, // Furniture World Supply
    },
    {
      id: 9,
      itemname: "6 Seater Dining Table",
      category: "Furniture",
      Quantity: 1,
      Unit: "pcs",
      price: 25000,
      supplierID: 7, // Furniture World Supply
    },
    {
      id: 10,
      itemname: "Cotton T-Shirt Large",
      category: "Clothing",
      Quantity: 1,
      Unit: "pcs",
      price: 450,
      supplierID: 8, // Clothing Hub Dist.
    },
    {
      id: 11,
      itemname: "Blue Denim Jeans",
      category: "Clothing",
      Quantity: 1,
      Unit: "pcs",
      price: 1200,
      supplierID: 8, // Clothing Hub Dist.
    },
    {
      id: 12,
      itemname: "Winter Coat Jacket",
      category: "Clothing",
      Quantity: 1,
      Unit: "pcs",
      price: 2800,
      supplierID: 8, // Clothing Hub Dist.
    },
  ]);

  //Selected Supplier
  const [selectedSupplier, setSelectedSup] = useState(null);

  //Product Showing for ordering
  const [productShowing, setProductShowing] = useState([]);

  useEffect(() => {
    const newSupplierProduct = supplierProduct.filter(
      (item) => item.supplierID === Number(selectedSupplier)
    );
    setProductShowing(newSupplierProduct);
  }, [selectedSupplier]);

  //Order Product

  //Product to be order
  const [productOrdering, setproductOrdering] = useState([]);

  const HandleSelectOrder = (itemId) => {
    const newProductOrdering = [
      ...productOrdering,
      productShowing.find((item) => item.id === itemId),
    ];
    setproductOrdering(newProductOrdering);
    console.log(itemId);
  };

  /*---------- Summary Order Controls  ----------- */
  //Add current ordering stock
  const AddStock = (index) => {
    const newproductOrdering = [...productOrdering];
    newproductOrdering[index].Quantity = newproductOrdering[index].Quantity + 1;
    setproductOrdering(newproductOrdering);
  };

  //Decrease current ordering stock
  const DecreaseStock = (index) => {
    const newproductOrdering = [...productOrdering];
    newproductOrdering[index].Quantity = newproductOrdering[index].Quantity - 1;
    setproductOrdering(newproductOrdering);
  };
  return (
    <Layout currentWebPage={"Create Order"}>
      <div className=" w-full h-[calc(100vh-60px)] flex flex-col md:flex-row justify-center items-center md:items-start mt-14 overflow-auto p-0 2xl:p-5 ">
        <div className="shadow-md-gray w-full h-full min-h-[120px] flex flex-col gap-3 justify-start items-center px-2 pt-3 ">
          {/* -------- Product Order column ------- */}
          <div className="h-full min-h-[500px] md:min-h-[350px] max-h-[calc(100vh-20px)] w-full shadow-lg shadow-violet-200 rounded-2xl bg-white  flex flex-col p-0 sm:p-3  ">
            <div className="flex flex-col flex-1 gap-1 px-1 py-1 overflow-auto custom-scroll">
              {/* -------- Supplier Info (Mobile Only) --------- */}
              <div
                className={` ${
                  isDesktop ? `hidden` : `flex`
                } flex-col justify-center gap-4 shadow-md shadow-gray-200 p-4  rounded-xl bg-white  `}
              >
                {/* Supplier Dropdown */}
                <div className="flex flex-col w-full">
                  <label className="mb-1 text-sm font-medium text-violet-700">
                    Supplier
                  </label>
                  <select
                    className="px-3 py-2 text-sm border rounded-lg border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
                    onChange={(e) => setSelectedSup(e.target.value)}
                  >
                    <option value="">Choose Supplier</option>
                    {supplier.map((sup) =>
                      sup.status !== "Inactive" ? (
                        <option key={sup.id} value={sup.id}>
                          {sup.suppliername}
                        </option>
                      ) : (
                        ""
                      )
                    )}
                  </select>
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between gap-3">
                  {/* Order Date */}
                  <div className="flex flex-col w-1/2">
                    <label className="mb-1 text-sm font-medium text-violet-700">
                      Order Date
                    </label>
                    <input
                      type="date"
                      className="px-2 py-2 text-sm border rounded-lg border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                  </div>

                  <ArrowBigRight
                    className="hidden mt-6 text-violet-500 shrink-0 sm:flex"
                    size={24}
                  />

                  {/* Expected Arrival */}
                  <div className="flex flex-col w-1/2">
                    <label className="mb-1 text-sm font-medium text-violet-700">
                      Expected Arrival
                    </label>
                    <input
                      type="date"
                      className="px-2 py-2 text-sm border rounded-lg border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                  </div>
                </div>
              </div>

              {/* --------- Search and control Section -------- */}
              <div className="flex items-center justify-between gap-4 px-5 py-1 bg-white lg:bg-violet-200 shadow-white md:shadow-md shadow-gray rounded-t-md lg:py-4">
                <div
                  className={` relative flex w-[100%] sm:w-[50%] lg:w-[40%] 2xl:w-[20%] mt-1`}
                >
                  {
                    <Search className="absolute mt-[0.7rem] ml-2 text-violet-200" />
                  }
                  <input
                    placeholder="   Search here..."
                    className="  w-1/1 rounded-2xl pl-9 border-gray-300 border-[0.01rem]  bg-white py-3 text-sm shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-violet-600 focus:ring-2 focus:ring-violet-400"
                  />
                </div>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      className={`${
                        isDesktop ? `flex` : `hidden`
                      } p-3 bg-violet-500 text-white rounded-full shadow-md hover:bg-violet-600 hover:scale-110 active:scale-95 transition-all duration-200 ease-in-out cursor-pointer`}
                    >
                      <Truck size={20} />
                    </button>

                    <button
                      className={` justify-center items-center ${
                        isDesktop ? `hidden` : `flex`
                      }  w-[3rem] md:w-[100%] p-2 py-3 md:p-3 bg-violet-500 text-white rounded-full shadow-md hover:bg-violet-600 hover:scale-110 active:scale-95 transition-all duration-200 ease-in-out `}
                    >
                      <ShoppingBasket size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* -------- Supplier Product Section - Desktop Layout ------ */}
              <div
                className={`${
                  isDesktop ? `flex` : `hidden`
                } flex-col gap-3 h-full overflow-auto py-3 px-2`}
              >
                {productShowing.length > 0 ? (
                  productShowing.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid items-center grid-cols-4 px-3 py-8 transition bg-white border border-gray-200 rounded-lg shadow-md shadow-gray-200 hover:shadow-lg"
                    >
                      {/* Product Info */}
                      <p className="font-medium text-gray-800">
                        {item.itemname}
                      </p>
                      <p className="flex justify-end text-gray-600">
                        {item.category}
                      </p>
                      <span className="flex justify-center text-gray-500">
                        {item.Unit}
                      </span>

                      {/* Action Button */}
                      <div className="flex justify-end gap-2">
                        <input
                          className=" w-15 p-[0.02rem] border-[0.04rem] border-gray-400 shadow-md shadow-gray-200 text-center rounded-md"
                          value={item.Quantity}
                          min={0}
                          onChange={(e) => {
                            const newProduct = [...productShowing];
                            newProduct[index].Quantity = Number(e.target.value);
                            setProductShowing(newProduct);
                          }}
                        ></input>
                        {/* Add Button */}
                        <motion.button
                          whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#3c2350",
                          }}
                          className="flex items-center justify-center text-lg font-bold text-white transition bg-purple-400 rounded-full cursor-pointer w-9 h-9 hover:bg-purple-700 active:scale-95"
                        >
                          <Plus className="stroke-3" size={18} />
                        </motion.button>
                      </div>
                    </div>
                  )) /*------ No Supplier Selected ------*/
                ) : selectedSupplier === null || selectedSupplier === "" ? (
                  <div className="flex flex-col items-center justify-center py-12 border border-gray-300 border-dashed shadow-sm bg-gray-50 rounded-2xl">
                    <Store className="w-12 h-12 mb-3 text-gray-400" />
                    <p className="font-medium text-gray-600">
                      No supplier selected
                    </p>
                    <p className="text-sm text-gray-400">
                      Please choose a supplier to view products
                    </p>
                  </div>
                ) : (
                  /*------ No items found for the supplier ------*/
                  <div className="flex flex-col items-center justify-center py-12 border border-gray-300 border-dashed shadow-sm bg-gray-50 rounded-2xl">
                    <PackageX className="w-12 h-12 mb-3 text-gray-400" />
                    <p className="font-medium text-gray-600">
                      No items found for this supplier
                    </p>
                    <p className="text-sm text-center text-gray-400">
                      Please select a different supplier to see products
                    </p>
                  </div>
                )}
              </div>

              {/* -------------- Supplier Product Section - Mobile Layout ---------- */}
              <div
                className={`${
                  isDesktop ? `hidden` : `flex`
                } flex-col gap-3 h-full overflow-auto py-3 px-2`}
              >
                {productShowing.length > 0 ? (
                  productShowing.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 transition bg-white border border-gray-200 shadow-md shadow-gray-200 rounded-xl hover:shadow-lg"
                    >
                      {/* Product Info */}
                      <div className="flex flex-col text-gray-800">
                        <p className="font-semibold">{item.itemname}</p>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <p className="text-xs text-gray-400">{item.Unit}</p>
                      </div>
                      <div className="flex gap-2">
                        <input
                          className=" w-15 p-[0.02rem] border-[0.04rem] border-gray-400 shadow-md shadow-gray-200 text-center rounded-md"
                          value={item.Quantity}
                          min={0}
                          onChange={(e) => {
                            const newProduct = [...productShowing];
                            newProduct[index].Quantity = Number(e.target.value);
                            setProductShowing(newProduct);
                          }}
                        ></input>
                        {/* Add Button */}
                        <motion.button
                          onClick={() => HandleSelectOrder(item.id)}
                          whileTap={{
                            scale: 0.9,
                            backgroundColor: "#6d00c5",
                          }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#3c2350",
                          }}
                          className="flex items-center justify-center w-8 h-8 text-lg font-bold text-white transition bg-purple-400 rounded-full cursor-pointer hover:bg-purple-700 active:scale-95"
                        >
                          <Plus className="stroke-3" size={16} />
                        </motion.button>
                      </div>
                    </div>
                  ))
                ) : /*------ No Supplier Selected ------*/
                selectedSupplier === null || selectedSupplier === "" ? (
                  <div className="flex flex-col items-center justify-center py-12 border border-gray-300 border-dashed shadow-sm bg-gray-50 rounded-2xl">
                    <Store className="w-12 h-12 mb-3 text-gray-400" />
                    <p className="font-medium text-gray-600">
                      No supplier selected
                    </p>
                    <p className="text-sm text-gray-400">
                      Please choose a supplier to view products
                    </p>
                  </div>
                ) : (
                  /*------ No items found for the supplier ------*/
                  <div className="flex flex-col items-center justify-center py-12 border border-gray-300 border-dashed shadow-sm bg-gray-50 rounded-2xl">
                    <PackageX className="w-12 h-12 mb-3 text-gray-400" />
                    <p className="font-medium text-gray-600">
                      No items found for this supplier
                    </p>
                    <p className="text-sm text-center text-gray-400">
                      Please select a different supplier to see products
                    </p>
                  </div>
                )}
              </div>

              {/* --------- Pagination section --------- */}
              <div>
                <div className="flex items-center justify-center w-full h-10 rounded-b-lg ">
                  <div className="flex items-center justify-center gap-3">
                    <button className="flex text-violet-500 ">
                      <ChevronsRight className="rotate-180 cursor-pointer" />
                      <span className="cursor-pointer">Prev</span>
                    </button>
                    <div className="flex gap-1 cursor-pointer">
                      <div className="flex justify-center items-center w-5 h-5 rounded-[0.3rem] bg-violet-400 p-3 text-white ">
                        <p>1</p>
                      </div>
                      <div className="flex cursor-pointer justify-center items-center w-5 h-5 rounded-[0.3rem] bg-violet-400 p-3 text-white ">
                        <p>2</p>
                      </div>
                      <div className="flex cursor-pointer justify-center items-center w-5 h-5 rounded-[0.3rem] bg-violet-400 p-3 text-white ">
                        <p>3</p>
                      </div>
                      <div className="flex cursor-pointer justify-center items-center w-5 h-5 rounded-[0.3rem] bg-violet-700 p-3 text-white ">
                        <p>4</p>
                      </div>
                      <div className="flex cursor-pointer justify-center items-center w-5 h-5 rounded-[0.3rem] bg-violet-400 p-3 text-white ">
                        <p>5</p>
                      </div>
                    </div>

                    <button className="flex cursor-pointer text-violet-500 ">
                      <span className="cursor-pointer">Next</span>
                      <ChevronsRight className="cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------- Order Summary ------ */}
        <div
          className={`${
            isDesktop ? `flex` : `hidden`
          } shadow-md-gray   w-1/1 md:w-[65%] xl:w-[60%] px-2  pt-3 h-[calc(100vh-60px)] min-h-[361px]  max-h-[calc(100vh-61px)] 2xl:max-h-[calc(100vh-98px)]`}
        >
          <div className="flex flex-col w-full h-full p-3 overflow-auto bg-white shadow-lg shadow-violet-200 rounded-2xl scrollbar-thin scrollbar-thumb-violet-500 hover:scrollbar-thumb-violet-600 scrollbar-track-violet-100 scrollbar-thumb-rounded-full">
            <div className="flex flex-col flex-1 gap-4">
              {/* Ordering */}
              <div className="flex items-center justify-center pb-2 mb-2 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Order Summary
                </h2>
              </div>

              <div className="overflow-auto h-[calc(100vh-390px)] min-h-[200px] 2xl:h-[calc(100vh-410px)]">
                {/* Scrollable product list */}
                <div className="flex flex-col items-center justify-center flex-1 gap-4 pr-1">
                  {productOrdering > 0 ? (
                    productOrdering.map((item, index) => (
                      <div
                        key={item.id}
                        className="grid items-center justify-end grid-cols-3 px-2 py-4 transition bg-white border border-gray-200 shadow-md rounded-xl xl:px-8 hover:shadow-lg"
                      >
                        {/* Product Info */}
                        <div className="flex flex-col items-start justify-center col-span-2 pl-2">
                          <span className="flex items-center justify-center text-lg font-semibold text-gray-800">
                            {item.itemname}
                          </span>

                          <span className="pl-12 font-medium text-purple-600">
                            ₱{item.price}
                          </span>

                          <span className="font-semibold text-gray-700 pl-7 ">
                            Total: ₱{item.price * item.Quantity}
                          </span>

                          {/* Actions */}
                          <div className="flex items-center justify-end gap-2">
                            {/* Decrease Button */}
                            <motion.button
                              onClick={() => DecreaseStock(index)}
                              whileTap={{
                                scale: 0.9,
                                backgroundColor:
                                  item.Quantity - 1 <= 0
                                    ? "#e5e7eb"
                                    : "#6d00c5", // gray if disabled
                              }}
                              whileHover={
                                item.Quantity - 1 <= 0
                                  ? {}
                                  : {
                                      scale: 1.05,
                                      backgroundColor: "#9977B5",
                                    }
                              }
                              disabled={item.Quantity - 1 <= 0}
                              className={`flex items-center justify-center w-8 h-8 rounded-full font-bold transition
                                    ${
                                      item.Quantity - 1 <= 0
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : "bg-purple-200 text-purple-600 hover:bg-purple-200 cursor-pointer"
                                    }`}
                            >
                              <Minus size={12} />
                            </motion.button>

                            <input
                              className="py-1 text-center border border-gray-300 rounded-md shadow-sm w-14 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              value={item.Quantity}
                              onChange={(e) => {
                                const newproductOrdering = [...productOrdering];
                                newproductOrdering[index].Quantity = Number(
                                  e.target.value
                                );
                                setproductOrdering(newproductOrdering);
                              }}
                            />

                            {/* Add Button */}
                            <motion.button
                              onClick={() => AddStock(index)}
                              whileTap={{
                                scale: 0.9,
                                backgroundColor: "#6d00c5",
                              }}
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: "#3c2350",
                              }}
                              className="flex items-center justify-center text-lg font-bold text-white transition bg-purple-400 rounded-full cursor-pointer w-7 h-7 hover:bg-purple-700 active:scale-95"
                            >
                              <Plus className="stroke-3" size={16} />
                            </motion.button>
                            {/* Unit */}
                            <span className="flex justify-center text-center text-gray-500">
                              {item.Unit}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <motion.button
                            whileHover={{
                              color: "#59222C",
                              scale: 1.07,
                            }}
                            whileTap={{
                              scale: 0.9,
                            }}
                            className="ml-2 font-medium text-red-500 cursor-pointer"
                          >
                            <Trash />
                          </motion.button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full p-8 mt-10 text-gray-500 border border-gray-300 border-dashed bg-gray-50 rounded-xl">
                      <span className="text-lg font-medium">
                        No products ordered
                      </span>
                      <span className="text-sm text-gray-400">
                        Your items will appear here once added.
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {/* Order Summary */}
              <div className="w-full max-w-3xl p-6 mx-auto border border-gray-200 shadow-sm bg-gray-50 rounded-xl">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₱450</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (12% VAT)</span>
                    <span>₱54</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Fee</span>
                    <span>₱50</span>
                  </div>
                  <div className="flex justify-between pt-3 text-lg font-bold border-t">
                    <span>Total</span>
                    <span className="text-purple-600">₱554</span>
                  </div>
                </div>

                {/* Order Button */}
                <button className="w-full py-3 mt-6 text-lg font-semibold text-white transition bg-purple-600 shadow-md rounded-xl hover:bg-purple-700 active:scale-95">
                  Create Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
