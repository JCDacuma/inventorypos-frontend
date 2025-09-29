import React from "react";
import { useState, useEffect, useRef } from "react";
import CheckOut from "@/modules/pos/components/Layouts/checkOutModal.jsx";
import { Layout } from "@/components/Layouts/Layout";
import { HorizontalSlider } from "@/utils/slider.jsx";
import Searchbar from "@/components/ui/Searchbar.jsx";
import POSCart from "@/modules/pos/components/ui/POSCart.jsx";

import {
  motion,
  AnimatePresence,
  useDragControls,
  DragControls,
} from "framer-motion";

import { ShoppingBasket } from "lucide-react";
export default function PointofSale() {
  // sample grocery products
  const product = [
    {
      id: 1,
      item: "Fresh Milk",
      sku: "MLK-001",
      CurrentStock: 20,
      Unit: "bottles",
      MinStock: 5,
      category: 1,
      itemprice: 65.0,
      taxable: true,
      status: "Active",
    },
    {
      id: 2,
      item: "Brown Bread",
      sku: "BRD-001",
      CurrentStock: 15,
      Unit: "loaves",
      MinStock: 3,
      category: 2,
      itemprice: 55.0,
      taxable: false,
      status: "Active",
    },
    {
      id: 3,
      item: "Chicken Breast",
      sku: "MT-CHK-001",
      CurrentStock: 10,
      Unit: "packs",
      MinStock: 2,
      category: 3,
      itemprice: 220.0,
      taxable: true,
      status: "Active",
    },
    {
      id: 4,
      item: "Apples - Red Delicious",
      sku: "FRU-APL-001",

      CurrentStock: 25,
      Unit: "kg",
      MinStock: 5,
      category: 4,
      itemprice: 150.0,
      taxable: false,
      status: "Active",
    },
    {
      id: 5,
      item: "Rice",
      sku: "GRN-RCE-001",
      CurrentStock: 30,
      Unit: "sacks",
      MinStock: 5,
      category: 5,
      itemprice: 280.0,
      taxable: false,
      status: "Active",
    },
  ];

  // sample grocery categories
  const category = [
    { categoryId: 1, categoryName: "Dairy" },
    { categoryId: 2, categoryName: "Bakery" },
    { categoryId: 3, categoryName: "Meat" },
    { categoryId: 4, categoryName: "Fruits" },
    { categoryId: 5, categoryName: "Grains" },
    { categoryId: 6, categoryName: "Vegetables" },
    { categoryId: 7, categoryName: "Seafood" },
    { categoryId: 8, categoryName: "Snacks" },
    { categoryId: 9, categoryName: "Beverages" },
    { categoryId: 10, categoryName: "Frozen Foods" },
    { categoryId: 11, categoryName: "Canned Goods" },
    { categoryId: 12, categoryName: "Condiments & Sauces" },
    { categoryId: 13, categoryName: "Spices & Seasonings" },
    { categoryId: 14, categoryName: "Personal Care" },
    { categoryId: 15, categoryName: "Household Essentials" },
  ];

  const ProductBuying = [
    {
      id: 1,
      item: "Fresh Milk",
      sku: "MLK-001",
      Category: "Dairy",
      CurrentStock: 20,
      Unit: "bottles",
      MinStock: 5,
      category: 1,
      itemprice: 65.0,
      taxable: true,
      status: "Active",
    },
    {
      id: 2,
      item: "Brown Bread",
      sku: "BRD-001",
      Category: "Bakery",
      CurrentStock: 15,
      Unit: "loaves",
      MinStock: 3,
      category: 2,
      itemprice: 55.0,
      taxable: false,
      status: "Active",
    },
  ];

  //CategoryDisplay for each item
  const HandleItemCategory = (value) => {
    const itemCategory = category.find((ctgry) => ctgry.categoryId === value);
    return itemCategory.categoryName;
  };

  //Selected Category to show
  const [selctdCtgry, setselctdCtgry] = useState(null);

  //Cart Mobile state
  const [isCartOpen, setOpenCart] = useState(false);

  //Checkout Modal
  const [isCheckOutOpen, setCheckoutOpen] = useState(false);

  return (
    <Layout currentWebPage="Point of Sale" style="items-center">
      <div className="flex w-full h-full pt-16 ">
        <div className="relative flex w-full h-full">
          <div className="flex flex-col w-full lg:w-3/4 ">
            {/* category */}
            <HorizontalSlider
              className={
                "flex items-center gap-3 px-5 py-4 overflow-x-auto overflow-y-hidden border border-gray-300 shadow-lg shadow-gray-300 scrollbar-hide"
              }
            >
              <div className="flex w-20 gap-3 min-h-10">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    color: "#fff",
                    boxShadow: "0px 8px 20px rgba(104, 55, 196, 0.35)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  onClick={() => setselctdCtgry(null)}
                  className={`flex-shrink-0 px-5 py-1 text-xs font-medium text-gray-800 transition-colors ${
                    selctdCtgry === null ? `bg-violet-500` : `bg-gray-300`
                  }  shadow-md cursor-pointer select-none md:text-sm md:px-8 md:py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2`}
                >
                  All
                </motion.button>

                {category.map((ctgry) => (
                  <motion.button
                    whileHover={{
                      scale: 1.05,

                      color: "#fff",
                      boxShadow: "0px 8px 20px rgba(104, 55, 196, 0.35)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    key={ctgry.categoryId}
                    onClick={() => {
                      setselctdCtgry(ctgry.categoryId);
                    }}
                    className={`flex-shrink-0 px-5 py-1 
                      ${
                        selctdCtgry === ctgry.categoryId
                          ? "bg-violet-500 text-white"
                          : "bg-gray-300 text-gray-800"
                      }
                      text-xs font-medium transition-colors shadow-md cursor-pointer select-none 
                      md:text-sm md:px-8 md:py-3 rounded-2xl focus:outline-none 
                      focus:ring-2 focus:ring-purple-400 focus:ring-offset-2`}
                  >
                    {ctgry.categoryName}
                  </motion.button>
                ))}
              </div>
            </HorizontalSlider>
            <div className="w-full h-full px-5 pb-20 overflow-auto ">
              <div className="flex justify-start items-center w-[100%] gap-1 py-5   ">
                <Searchbar />
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "hsl(260, 56%, 49%)",
                    color: "#fff",
                    boxShadow: "0px 8px 20px rgba(104, 55, 196, 0.35)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center justify-center px-3 py-[0.7rem] border border-gray-300 rounded-xl shadow-lg shadow-gray-300 text-violet-700 bg-white lg:hidden"
                  onClick={() => setOpenCart(true)}
                >
                  <ShoppingBasket size={20} />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                {product.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col overflow-hidden transition-transform transform bg-white border border-gray-300 shadow-lg cursor-pointer select-none shadow-gray-300 rounded-xl hover:shadow-xl hover:scale-105"
                  >
                    {/* Image placeholder */}
                    <div className="flex items-center justify-center w-full h-40 font-semibold text-gray-500 border-dashed bg-violet-200 border-violet-600">
                      <p>Image Show here</p>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between flex-1 p-4">
                      <p className="font-semibold text-gray-800 text-md">
                        {item.item}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {HandleItemCategory(item.category)}
                      </p>
                      <p className="mt-1 text-sm font-bold text-black">
                        ₱{item.itemprice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* cart section */}
          <POSCart
            isCartOpen={isCartOpen}
            setOpenCart={setOpenCart}
            Product={ProductBuying}
            openCheckOut={setCheckoutOpen}
          />
          {/* checkout section */}
          <CheckOut
            isOpen={isCheckOutOpen}
            onClosed={() => setCheckoutOpen(false)}
          />
        </div>
      </div>
    </Layout>
  );
}
