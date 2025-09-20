import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
// Page Layout component
import { Layout } from "../../../components/Layouts/Layout";

//Component
//Order Summary Modal (Mobile)
import OrderSummaryMobile from "../components/Layouts/OrderSummaryModal";
import SupplierModal from "../components/Layouts/OrderSupplierModal";
import OrderCreationSummary from "@/modules/orders/components/ui/OrderSummarySection.jsx";

//Animation and icons
import { motion, AnimatePresence } from "framer-motion";
import { SweetAlert } from "@/utils/sweetalert";

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
  Undo2,
} from "lucide-react";

export default function CreateOrder() {
  const isDesktop = useMediaQuery({ minWidth: 968 });

  //Open mobile order summary
  const [isOpenOrderSummary, setOpenSummary] = useState(false);

  //Open Supplier Selection
  const [isOpenSupplierInfo, setOpenSupplier] = useState(false);

  //sample supplier data fetch
  const supplier = [
    {
      id: 1,
      suppliername: "Dell Supplier Inc.",
      contactperson: "John Smith",
      phonenumber: "+63 912 345 6789",
      vatregistered: true,
      shippingfee: 2500,
      status: "Active",
    },
    {
      id: 2,
      suppliername: "Tech Distributors Ltd.",
      contactperson: "Emily Davis",
      phonenumber: "+63 917 222 3344",
      vatregistered: false,
      shippingfee: 1800,
      status: "Active",
    },
    {
      id: 3,
      suppliername: "Logitech Distribution",
      contactperson: "Michael Lee",
      phonenumber: "+63 918 555 7788",
      vatregistered: true,
      shippingfee: 1200,
      status: "Active",
    },
    {
      id: 4,
      suppliername: "Apple Authorized Dist.",
      contactperson: "Sophia Tan",
      phonenumber: "+63 915 111 2233",
      vatregistered: true,
      shippingfee: 3000,
      status: "Active",
    },
    {
      id: 5,
      suppliername: "Samsung Electronics",
      contactperson: "David Kim",
      phonenumber: "+63 916 777 8899",
      vatregistered: false,
      shippingfee: 2200,
      status: "Active",
    },
    {
      id: 6,
      suppliername: "Grocery Trading Corp.",
      contactperson: "Maria Lopez",
      phonenumber: "+63 913 444 5566",
      vatregistered: true,
      shippingfee: 900,
      status: "Active",
    },
    {
      id: 7,
      suppliername: "Furniture World Supply",
      contactperson: "James Rodriguez",
      phonenumber: "+63 919 888 3344",
      vatregistered: false,
      shippingfee: 1500,
      status: "Active",
    },
    {
      id: 8,
      suppliername: "Clothing Hub Dist.",
      contactperson: "Anna Garcia",
      phonenumber: "+63 914 222 7788",
      vatregistered: true,
      shippingfee: 1000,
      status: "Active",
    },
    {
      id: 9,
      suppliername: "Nestle Philippines",
      contactperson: "Maria Santos",
      phonenumber: "+63 913 444 5566",
      vatregistered: true,
      shippingfee: 1000,
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
      price: 13,
      supplierID: 9,
      taxable: true,
    },
    {
      id: 2,
      itemname: "Dell Inspiron 15 Laptop",
      category: "Electronics",
      Quantity: 1,
      Unit: "pcs",
      price: 35000,
      supplierID: 1,
      taxable: true,
    },
    {
      id: 3,
      itemname: "Logitech M185 Wireless Mouse",
      category: "Electronics",
      Quantity: 1,
      Unit: "pcs",
      price: 800,
      supplierID: 3,
      taxable: true,
    },
    {
      id: 4,
      itemname: "iPhone 14 Smartphone",
      category: "Electronics",
      Quantity: 1,
      Unit: "pcs",
      price: 45000,
      supplierID: 4,
      taxable: true,
    },
    {
      id: 5,
      itemname: "Rice 5kg Bag",
      category: "Grocery",
      Quantity: 1,
      Unit: "kg",
      price: 250,
      supplierID: 6,
      taxable: false,
    },
    {
      id: 6,
      itemname: "Cooking Oil 1L Bottle",
      category: "Grocery",
      Quantity: 1,
      Unit: "liters",
      price: 85,
      supplierID: 6,
      taxable: true,
    },
    {
      id: 7,
      itemname: "Fresh Bananas",
      category: "Grocery",
      Quantity: 1,
      Unit: "kg",
      price: 60,
      supplierID: 6,
      taxable: false,
    },
    {
      id: 8,
      itemname: "Ergonomic Office Chair",
      category: "Furniture",
      Quantity: 1,
      Unit: "pcs",
      price: 8500,
      supplierID: 7,
      taxable: true,
    },
    {
      id: 9,
      itemname: "6 Seater Dining Table",
      category: "Furniture",
      Quantity: 1,
      Unit: "pcs",
      price: 25000,
      supplierID: 7,
      taxable: true,
    },
    {
      id: 10,
      itemname: "Cotton T-Shirt Large",
      category: "Clothing",
      Quantity: 1,
      Unit: "pcs",
      price: 450,
      supplierID: 8,
      taxable: true,
    },
    {
      id: 11,
      itemname: "Blue Denim Jeans",
      category: "Clothing",
      Quantity: 1,
      Unit: "pcs",
      price: 1200,
      supplierID: 8,
      taxable: true,
    },
    {
      id: 12,
      itemname: "Winter Coat Jacket",
      category: "Clothing",
      Quantity: 1,
      Unit: "pcs",
      price: 2800,
      supplierID: 8,
      taxable: true,
    },
  ]);

  //Selected Supplier
  const [selectedSupplier, setSelectedSup] = useState([]);

  //Product Showing for ordering
  const [productShowing, setProductShowing] = useState([]);

  //Product to be order
  const [productOrdering, setproductOrdering] = useState([]);

  useEffect(() => {
    const newSupplierProduct = supplierProduct.filter(
      (item) => item.supplierID === selectedSupplier.id
    );
    setProductShowing(newSupplierProduct);
  }, [selectedSupplier]);

  //Selecting supplier functionality
  const SelectedNewSupplier = (value) => {
    const Newsupplier = supplier.find((sup) => sup.id === Number(value));
    setSelectedSup(Newsupplier);
    SweetAlert.success(`Supplier Selected`, `${Newsupplier.suppliername}`);
  };

  //Selecting order functionality
  const HandleSelectOrder = (itemId) => {
    const newProductOrdering = [
      ...productOrdering,
      productShowing.find((item) => item.id === itemId),
    ];
    setproductOrdering(newProductOrdering);
  };

  //Disabling Add order button
  const HandleDisableButton = (itemId) => {
    const hasOrdered = productOrdering.some((item) => item.id === itemId);
    return hasOrdered;
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

  //Remove item from the cart
  const HandleRemoveItem = (itemId) => {
    const NewproductOrdering = productOrdering.filter(
      (item) => item.id !== itemId
    );
    setproductOrdering(NewproductOrdering);
  };

  //Total Quantity Item to be order
  const TotalItem = productOrdering.reduce(
    (acc, curr) => acc + curr.Quantity,
    0
  );

  //Summary Total
  const Subtotal = productOrdering.reduce(
    (acc, curr) => acc + curr.price * curr.Quantity,
    0
  );

  //Shipping fee set
  const [ShippingFee, setShippingfee] = useState(
    selectedSupplier?.shippingfee ?? 0
  );

  useEffect(() => {
    if (selectedSupplier?.shippingfee != null && productOrdering.length > 0) {
      setShippingfee(selectedSupplier.shippingfee);
    } else {
      setShippingfee(0);
    }
  }, [selectedSupplier, productOrdering]);

  const HandleSetShippingFee = (value) => {
    if (value === "" || value === null) {
      setShippingfee(0);
      return;
    }
    if (isNaN(value) || Number(value) < 0) {
      SweetAlert.error("Oops!", "Please enter a valid number.");
      return;
    }
    setShippingfee(Number(value));
  };

  // Subtotal of only taxable products
  const TaxableSubtotal = productOrdering.reduce(
    (acc, curr) => (curr.taxable ? acc + curr.price * curr.Quantity : acc),
    0
  );

  //Total Vat
  const Vat = selectedSupplier?.vatregistered ? TaxableSubtotal * 0.12 : 0;

  //Total Price
  const TotalPrice = parseFloat((Subtotal + Vat + ShippingFee).toFixed(2));

  return (
    <>
      <Layout currentWebPage={"Create Order"}>
        <div className=" w-full h-[calc(100vh-60px)] flex flex-col md:flex-row justify-center items-center md:items-start mt-14 overflow-auto p-0 2xl:p-5 ">
          <div className="shadow-md-gray w-full h-full min-h-[120px] flex flex-col gap-3 justify-start items-center px-2 pt-3 ">
            {/* -------- Product Order column ------- */}
            <div className="h-full min-h-[500px] md:min-h-[350px] max-h-[calc(100vh-20px)] w-full shadow-lg  rounded-2xl bg-white  flex flex-col p-0 sm:p-3  ">
              <div className="flex flex-col flex-1 gap-1 px-1 py-1 overflow-auto custom-scroll">
                {/* --------- Search and Control Section -------- */}
                <div className="flex items-center justify-between gap-4 px-1 py-2 bg-white rounded-sm sm:px-5 md:shadow-md shadow-gray-100 lg:py-4">
                  <div className="flex items-center justify-between w-full gap-2 px-1 py-2 shadow-sm sm:px-3 rounded-xl">
                    {/* Back button */}
                    <Link to={"/product-orders"}>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05, color: "#3c2350" }}
                        className="flex items-center gap-1 ml-1 font-medium transition-colors text-violet-600 hover:text-violet-700"
                      >
                        <Undo2 size={24} className="stoke-2" />
                        <span className="hidden sm:flex">Back</span>
                      </motion.button>
                    </Link>

                    <div className="flex items-center justify-end w-full gap-2 sm:gap-1">
                      {/*------- Supplier Info (Desktop only) --------------*/}
                      <button
                        onClick={() => setOpenSupplier(true)}
                        className={`${
                          isDesktop ? "flex" : "hidden"
                        } items-center justify-center w-11 h-10 rounded-full 
                            bg-gradient-to-r from-violet-500 to-purple-600 
                            text-white shadow-md
                            hover:from-violet-600 hover:to-purple-700 hover:shadow-lg hover:scale-110
                            active:scale-95 active:from-violet-700 active:to-purple-800 active:shadow-md
                            focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2
                            transition-all duration-200 ease-in-out`}
                      >
                        <Truck
                          size={20}
                          className="stroke-[2.5] drop-shadow-sm"
                        />
                      </button>

                      {/* Search Bar*/}
                      <div className="relative flex w-full sm:w-1/2 lg:w-2/5 2xl:w-1/4">
                        <Search className="absolute -translate-y-1/2 left-3 top-1/2 text-violet-300" />
                        <input
                          placeholder="Search here..."
                          className="w-full rounded-2xl pl-10 pr-3 border border-gray-300 bg-white py-2.5 text-sm shadow-sm outline-none
                          placeholder:text-slate-400
                          focus:border-violet-600 focus:ring-2 focus:ring-violet-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

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
                    <div className="flex items-center justify-center w-full gap-1 ">
                      <select
                        className="w-full px-3 py-2 text-sm border rounded-lg border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                        disabled={productOrdering.length > 0}
                        onChange={(e) => SelectedNewSupplier(e.target.value)}
                        value={selectedSupplier.id}
                      >
                        <option value="">Choose Supplier</option>
                        {supplier.map((sup) =>
                          sup.status !== "Inactive" ? (
                            <option key={sup.id} value={sup.id}>
                              {sup.suppliername}
                            </option>
                          ) : null
                        )}
                      </select>

                      {/*------------- Order Summary Button (Mobile only) ----------------*/}
                      <div className="relative ">
                        <button
                          onClick={() => setOpenSummary(true)}
                          className={`bg-violet-400 ${
                            isDesktop ? "hidden" : "flex"
                          } items-center justify-center w-13 h-10 rounded-full 
                          bg-violet-530 text-white shadow-md
                          hover:bg-violet-600 hover:shadow-lg hover:scale-110
                          active:scale-95 active:shadow-sm
                          transition-all duration-200 ease-in-out`}
                        >
                          <ShoppingBasket size={18} />
                        </button>
                        {productOrdering.length > 0 ? (
                          <div className="absolute bg-red-900 text-white text-[0.55rem] text-center items-center rounded-4xl px-2 py-1 w-auto ml-7 bottom-7 ">
                            <p>{TotalItem}</p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
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
                              newProduct[index].Quantity = Number(
                                e.target.value
                              );
                              setProductShowing(newProduct);
                            }}
                          ></input>
                          {/* Add Button */}
                          <motion.button
                            onClick={() => HandleSelectOrder(item.id)}
                            disabled={HandleDisableButton(item.id)}
                            animate={{
                              backgroundColor: HandleDisableButton(item.id)
                                ? "#9ca3af" // gray-400
                                : "#c084fc", // purple-400
                            }}
                            whileHover={
                              HandleDisableButton(item.id)
                                ? {}
                                : {
                                    scale: 1.05,
                                    backgroundColor: "#7e22ce", // purple-700
                                  }
                            }
                            whileTap={
                              HandleDisableButton(item.id)
                                ? {}
                                : {
                                    scale: 0.9,
                                    backgroundColor: "#6d00c5",
                                  }
                            }
                            className={`flex items-center justify-center text-lg font-bold text-white rounded-full w-9 h-9 ${
                              HandleDisableButton(item.id)
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
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
                          <p className="text-sm text-gray-500">
                            {item.category}
                          </p>
                          <p className="text-xs text-gray-400">{item.Unit}</p>
                        </div>
                        <div className="flex gap-2">
                          <input
                            className=" w-15 p-[0.02rem] border-[0.04rem] border-gray-400 shadow-md shadow-gray-200 text-center rounded-md"
                            value={item.Quantity}
                            onChange={(e) => {
                              const newProduct = [...productShowing];
                              newProduct[index].Quantity = Number(
                                e.target.value
                              );
                              setProductShowing(newProduct);
                            }}
                          ></input>

                          {/* Add Button */}
                          <motion.button
                            onClick={() => HandleSelectOrder(item.id)}
                            disabled={HandleDisableButton(item.id)}
                            animate={{
                              backgroundColor: HandleDisableButton(item.id)
                                ? "#9ca3af"
                                : "#a78bfa",
                            }}
                            whileHover={
                              HandleDisableButton(item.id)
                                ? {}
                                : {
                                    scale: 1.05,
                                    backgroundColor: "#7e22ce",
                                  }
                            }
                            whileTap={
                              HandleDisableButton(item.id)
                                ? {}
                                : {
                                    scale: 0.9,
                                    backgroundColor: "#6d00c5",
                                  }
                            }
                            className={`flex items-center justify-center w-8 h-8 text-lg font-bold text-white rounded-full transition 
    ${HandleDisableButton(item.id) ? "cursor-not-allowed" : "cursor-pointer"}`}
                          >
                            <Plus
                              size={16}
                              className={
                                HandleDisableButton(item.id)
                                  ? "text-gray-200"
                                  : "text-white"
                              }
                            />
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

          {/* Summary Sections */}
          <OrderCreationSummary
            //Data
            productOrdering={productOrdering}
            setProductOrder={setproductOrdering}
            //functionality
            DecreaseStockBtn={DecreaseStock}
            IncreaseStockBtn={AddStock}
            RemoveItem={HandleRemoveItem}
            //Summary Total Info
            Subtotal={Subtotal}
            TotalVat={Vat}
            TotalPrice={TotalPrice}
            ChangeShippingFee={HandleSetShippingFee}
            ShippingFee={ShippingFee}
          />
        </div>
        {/* Modal */}
        {/* Order Summary Modal */}
        <OrderSummaryMobile
          isOpen={isOpenOrderSummary}
          onClosed={() => setOpenSummary(false)}
          order={productOrdering}
          setOrder={setproductOrdering}
          //Functionality
          AddStocks={AddStock}
          MinStocks={DecreaseStock}
          RemoveItem={HandleRemoveItem}
          //Summary Total Info
          Subtotal={Subtotal}
          TotalVat={Vat}
          TotalPrice={TotalPrice}
          ChangeShippingFee={HandleSetShippingFee}
          ShippingFee={ShippingFee}
        />
        {/* Supplier Modal */}
        <SupplierModal
          isOpen={isOpenSupplierInfo}
          onClosed={() => setOpenSupplier(false)}
          supplier={supplier}
          order={productOrdering}
          setSelectedSup={SelectedNewSupplier}
          totalItem={TotalItem}
          selectedSupplier={selectedSupplier}
        />
      </Layout>
    </>
  );
}
