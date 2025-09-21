import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
// Page Layout component
import { Layout } from "../../../components/Layouts/Layout";

//Component
//Order Summary Modal (Mobile)
import OrderSummaryMobile from "../components/Layouts/OrderSummaryModal";
import SupplierModal from "../components/Layouts/OrderSupplierModal";

//ui
import OrderCreationSummary from "@/modules/orders/components/ui/OrderSummarySection.jsx";
import SupplierSectionMobile from "@/modules/orders/components/ui/OrderProductSupplierMobile.jsx";
import SupplierProductSection from "@/modules/orders/components/ui/OrderSupplierProductSection.jsx";
import SearchAndControl from "@/modules/orders/components/ui/OrderSearchAndControl.jsx";

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
  };

  //Date of order
  const [orderDate, setOrderDate] = useState("");

  //Date Expected Order Arrival
  const [arrivalDate, setArrivalDate] = useState("");

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

  /*---------- Order Summary Controls Functionality  ----------- */

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

  //Set shipping fee
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
  const Vat = parseFloat(
    (selectedSupplier?.vatregistered ? TaxableSubtotal * 0.12 : 0).toFixed(2)
  );

  //Total Price
  const TotalPrice = parseFloat((Subtotal + Vat + ShippingFee).toFixed(2));

  /* ---------------- Validation ---------------- */

  const [ValidSupplier, setValidSupplier] = useState(false);

  //Supplier validation
  const HandleValidationSupplier = (OrderDate, ArrivalDate, Supplier) => {
    if (!OrderDate || !ArrivalDate) {
      SweetAlert.error(
        "Missing Dates",
        "Please select both order and arrival dates."
      );
      return;
    }

    const FromDate = new Date(OrderDate);
    const ToDate = new Date(ArrivalDate);

    if (FromDate > ToDate) {
      SweetAlert.error(
        "Invalid Date Selection",
        "The Order Date cannot be later than the Arrival Date."
      );

      return;
    }

    // Check if no supplier is selected
    if (
      Supplier === "" ||
      Supplier === null ||
      Supplier === undefined ||
      isNaN(Supplier)
    ) {
      SweetAlert.error(
        "No Supplier Selected",
        "Please select a supplier before continuing."
      );
      return;
    }

    SelectedNewSupplier(Supplier);
    setOrderDate(OrderDate);
    setArrivalDate(ArrivalDate);
    //Supplier Modal
    setOpenSupplier(false);

    //Mark as validated supplier
    setValidSupplier(true);
  };

  return (
    <>
      <Layout currentWebPage={"Create Order"}>
        <div className=" w-full h-[calc(100vh-60px)] flex flex-col md:flex-row justify-center items-center md:items-start mt-14 overflow-auto p-0 2xl:p-5 ">
          <div className="shadow-md-gray w-full h-full min-h-[120px] flex flex-col gap-3 justify-start items-center px-2 pt-3 ">
            {/* -------- Product Order column ------- */}
            <div className="h-full min-h-[500px] md:min-h-[350px] max-h-[calc(100vh-20px)] w-full shadow-lg  rounded-2xl bg-white  flex flex-col p-0 sm:p-3  ">
              <div className="flex flex-col flex-1 gap-1 px-1 py-1 overflow-auto custom-scroll">
                {/* --------- Search and Control Section -------- */}
                <SearchAndControl setOpenSupplier={setOpenSupplier} />

                <SupplierSectionMobile
                  supplier={supplier}
                  order={productOrdering}
                  totalItem={TotalItem}
                  selectedSupplier={selectedSupplier}
                  setSelectedSupplier={SelectedNewSupplier}
                  setOrderDate={setOrderDate}
                  orderDate={orderDate}
                  setArrivalDate={setArrivalDate}
                  arrivalDate={arrivalDate}
                  openSummaryModal={setOpenSummary}
                />

                {/* -------- Supplier Product Section - Desktop Layout ------ */}
                <SupplierProductSection
                  HandleDisableButton={HandleDisableButton}
                  productShowing={productShowing}
                  selectedSupplier={selectedSupplier}
                  HandleSelectOrder={HandleSelectOrder}
                  setProductShowing={setProductShowing}
                />

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

          {/*-------------- Summary Sections -------------*/}
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
        {/*---------------- Modal Section ---------------*/}
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
          SubmitSupplier={HandleValidationSupplier}
          selectedSupplier={selectedSupplier}
          setOrderDate={setOrderDate}
          orderDate={orderDate}
          setArrivalDate={setArrivalDate}
          arrivalDate={arrivalDate}
        />
      </Layout>
    </>
  );
}
