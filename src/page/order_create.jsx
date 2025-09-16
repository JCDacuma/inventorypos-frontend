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
} from "lucide-react";

export default function CreateOrder() {
  const isDesktop = useMediaQuery({ minWidth: 968 });

  const productOrdering = [
    { itemname: "Nescafé Classic 100g", Quantity: 1, Unit: "Pack", price: 120 },
    { itemname: "Nescafé Classic 100g", Quantity: 1, Unit: "Pack", price: 150 },
  ];

  const [supplierProduct, setSupplierProduct] = useState([
    {
      id: 1,
      itemname: "Nescafé Classic 100g",
      category: "Beverages",
      Quantity: 1,
      Unit: "Pack",
      price: 120,
    },
    {
      id: 2,
      itemname: "Nescafé Classic 100g",
      category: "Beverages",
      Quantity: 1,
      Unit: "Pack",
      price: 150,
    },
    {
      id: 3,
      itemname: "Nescafé Classic 100g",
      category: "Beverages",
      Quantity: 1,
      Unit: "Pack",
      price: 150,
    },
    {
      id: 4,
      itemname: "Nescafé Classic 100g",
      category: "Beverages",
      Quantity: 1,
      Unit: "Pack",
      price: 150,
    },
    {
      id: 5,
      itemname: "Nescafé Classic 100g",
      category: "Beverages",
      Quantity: 1,
      Unit: "Pack",
      price: 150,
    },
    {
      id: 6,
      itemname: "Nescafé Classic 100g",
      category: "Beverages",
      Quantity: 1,
      Unit: "Pack",
      price: 150,
    },
  ]);

  return (
    <Layout currentWebPage={"Create Order"}>
      <div className=" w-full h-[calc(100vh-60px)] flex flex-col md:flex-row justify-center items-center md:items-start mt-14 overflow-auto p-0 2xl:p-5 ">
        <div className="shadow-md-gray w-full h-full min-h-[120px] flex flex-col gap-3 justify-start items-center px-2 pt-3 ">
          {/* Product Order */}
          <div className="h-full min-h-[400px] md:min-h-[350px] max-h-[calc(100vh-20px)] w-full shadow-lg shadow-violet-200 rounded-2xl bg-white  flex flex-col p-0 sm:p-3  ">
            <div className="flex-1 flex flex-col gap-1  overflow-auto px-1 py-1">
              {/* Supplier Info (Mobile Only) */}
              <div
                className={` ${
                  isDesktop ? `hidden` : `flex`
                } flex-col justify-center gap-4 shadow-md shadow-gray-200 p-4  rounded-xl bg-white  `}
              >
                {/* Supplier Dropdown */}
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium text-violet-700 mb-1">
                    Supplier
                  </label>
                  <select className="border border-violet-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400">
                    <option>Choose Supplier</option>
                  </select>
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between gap-3">
                  {/* Order Date */}
                  <div className="flex flex-col w-1/2">
                    <label className="text-sm font-medium text-violet-700 mb-1">
                      Order Date
                    </label>
                    <input
                      type="date"
                      className="border border-violet-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                  </div>

                  <ArrowBigRight
                    className="text-violet-500 mt-6 shrink-0 hidden sm:flex"
                    size={24}
                  />

                  {/* Expected Arrival */}
                  <div className="flex flex-col w-1/2">
                    <label className="text-sm font-medium text-violet-700 mb-1">
                      Expected Arrival
                    </label>
                    <input
                      type="date"
                      className="border border-violet-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                  </div>
                </div>
              </div>

              {/* Control Section */}
              <div className=" bg-white lg:bg-violet-200 shadow-white md:shadow-md shadow-gray rounded-t-md  flex justify-between items-center gap-4 px-5 py-1 lg:py-4">
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
                <div className="flex justify-center items-center gap-3 mt-1">
                  <div className="flex justify-center items-center gap-4">
                    <button
                      className={`${
                        isDesktop ? `flex` : `hidden`
                      } p-3 bg-violet-500 text-white rounded-full shadow-md hover:bg-violet-600 hover:scale-110 active:scale-95 transition-all duration-200 ease-in-out`}
                    >
                      <Truck size={20} />
                    </button>

                    <button
                      className={` justify-center items-center ${
                        isDesktop ? `hidden` : `flex`
                      }  w-[3rem] md:w-[100%] p-2 py-3 md:p-3 bg-violet-500 text-white rounded-full shadow-md hover:bg-violet-600 hover:scale-110 active:scale-95 transition-all duration-200 ease-in-out`}
                    >
                      <ShoppingBasket size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Supplier Product Section - Desktop */}
              <div
                className={`${
                  isDesktop ? `flex` : `hidden`
                } flex-col gap-3 h-full overflow-auto py-3 px-2`}
              >
                {supplierProduct.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-4 items-center bg-white shadow-md shadow-gray-200 border border-gray-200 rounded-lg px-3 py-8 hover:shadow-lg transition"
                  >
                    {/* Product Info */}
                    <p className="font-medium text-gray-800">{item.itemname}</p>
                    <p className="text-gray-600 flex justify-end">
                      {item.category}
                    </p>
                    <p className="text-gray-500 flex justify-center">
                      {item.Unit}
                    </p>

                    {/* Action Button */}
                    <div className="flex justify-end gap-2">
                      <input
                        className=" w-15 p-[0.05rem] border-[0.04rem] border-gray-400 shadow-md shadow-gray-200 text-center rounded-md"
                        value={item.Quantity}
                        min={0}
                        onChange={(e) => {
                          const newProduct = [...supplierProduct];
                          newProduct[index].Quantity = Number(e.target.value);
                          setSupplierProduct(newProduct);
                        }}
                      ></input>
                      {/* Add Button */}
                      <button className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-600 text-white text-lg font-bold hover:bg-purple-700 active:scale-95 transition">
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/*------------ Mobile Layout ---------------*/}

              {/* Supplier Product Section Mobile */}
              <div
                className={`${
                  isDesktop ? `hidden` : `flex`
                } flex-col gap-3 h-full overflow-auto py-3 px-2`}
              >
                {supplierProduct.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-4 bg-white shadow-md shadow-gray-200 border border-gray-200 rounded-xl hover:shadow-lg transition"
                  >
                    {/* Product Info */}
                    <div className="flex flex-col text-gray-800">
                      <p className="font-semibold">{item.itemname}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-xs text-gray-400">{item.Unit}</p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        className=" w-15 p-[0.05rem] border-[0.04rem] border-gray-400 shadow-md shadow-gray-200 text-center rounded-md"
                        value={item.Quantity}
                        min={0}
                        onChange={(e) => {
                          const newProduct = [...supplierProduct];
                          newProduct[index].Quantity = Number(e.target.value);
                          setSupplierProduct(newProduct);
                        }}
                      ></input>
                      {/* Add Button */}
                      <button className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-600 text-white text-lg font-bold hover:bg-purple-700 active:scale-95 transition">
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-center h-10 w-full rounded-b-lg ">
                  <div className="flex items-center   justify-center gap-3">
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

        {/* Supplier Product */}
        <div
          className={`${
            isDesktop ? `flex` : `hidden`
          } shadow-md-gray   w-1/1 md:w-[65%] xl:w-[60%] px-2  pt-3 h-[calc(100vh-60px)] min-h-[480px]  max-h-[calc(100vh-60px)] 2xl:max-h-[calc(100vh-98px)]`}
        >
          <div className=" h-full  w-full shadow-lg shadow-violet-200 rounded-2xl bg-white flex flex-col p-3 overflow-auto ">
            <div className="flex-1  flex flex-col gap-6">
              {/* Ordering */}
              <div className="flex flex-col justify-center items-center gap-3">
                {supplierProduct.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-4 items-center bg-white shadow-md shadow-gray-200 border border-gray-200 rounded-lg px-3 py-8 hover:shadow-lg transition"
                  >
                    {/* Product Info */}
                    <p className="font-medium text-gray-800">{item.itemname}</p>
                    <p className="text-gray-600 flex justify-end">
                      {item.category}
                    </p>
                    <p className="text-gray-500 flex justify-center">
                      {item.Unit}
                    </p>

                    {/* Action Button */}
                    <div className="flex justify-end gap-2">
                      <input
                        className=" w-15 p-[0.05rem] border-[0.04rem] border-gray-400 shadow-md shadow-gray-200 text-center rounded-md"
                        value={item.Quantity}
                        min={0}
                        onChange={(e) => {
                          const newProduct = [...supplierProduct];
                          newProduct[index].Quantity = Number(e.target.value);
                          setSupplierProduct(newProduct);
                        }}
                      ></input>
                      {/* Add Button */}
                      <button className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-600 text-white text-lg font-bold hover:bg-purple-700 active:scale-95 transition">
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Total */}
              <div>
                <p>Subtotal: </p>
                <p>Tax(12% vat): </p>
                <p>Shipping fee: </p>
                <p>Total: </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
