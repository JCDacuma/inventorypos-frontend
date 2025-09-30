import React from "react";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect, useRef } from "react";
import { SweetAlert } from "@/utils/sweetalert";
import { motion, AnimatePresence, scale } from "framer-motion";
import {
  ShoppingBasket,
  ArrowRightFromLine,
  Trash2,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";

import {} from "lucide-react";
export default function POSCart({
  isCartOpen,
  setOpenCart,
  Product,
  openCheckOut,
  setProductBuying,
}) {
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const totalItem = 2;
  const TotatQuantity = 0;
  const vat = 200;
  const totalPrice = 20000;

  //Handle item removal functionality
  const RemoveItem = (value) => {
    const newProduct = Product.filter((item) => item.id !== value);
    setProductBuying(newProduct);
  };

  // Remove all product ordered
  const RemoveAll = () => {
    if (Product.length <= 0) {
      return SweetAlert.error("No item ordered");
    }
    SweetAlert.Confirm(
      "Cart reset",
      "Are you sure you want to delete checkout?"
    ).then((result) => {
      if (result.isConfirmed) {
        setProductBuying([]);
        SweetAlert.success("Item in Cart has been deleted");
      } else if (result.isDismissed) {
        SweetAlert.error("Item in cart is not deleted");
      }
    });
  };

  //Add and Reduce Quantity
  const AddQuantity = (value) => {
    const updated = Product.map((itm) =>
      itm.id === value ? { ...itm, qtyToBuy: itm.qtyToBuy + 1 } : itm
    );
    setProductBuying(updated);
  };

  const RemoveQuantity = (value) => {
    const updated = Product.map((itm) =>
      itm.id === value
        ? { ...itm, qtyToBuy: Math.max(itm.qtyToBuy - 1, 1) } // never less than 1
        : itm
    );

    setProductBuying(updated);
  };

  //set Input quantity
  const HandleOnchangeQty = (value, id) => {
    let newQty = parseInt(value, 10);

    if (isNaN(newQty) || newQty < 1) newQty = 1;

    const updated = Product.map((itm) =>
      itm.id === id ? { ...itm, qtyToBuy: newQty } : itm
    );

    setProductBuying(updated);
  };

  return (
    <AnimatePresence>
      {isLargeScreen || isCartOpen ? (
        <motion.div
          initial={isLargeScreen ? null : { x: "100%" }}
          animate={isLargeScreen ? null : { x: "0%" }}
          exit={isLargeScreen ? null : { x: "100%" }}
          transition={
            isLargeScreen ? null : { duration: 0.4, ease: "easeInOut" }
          }
          className={`absolute flex w-full pointer-events-auto  h-full justify-end  lg:w-1/3 lg:relative  z-20`}
        >
          <div className="flex flex-col  w-full h-full bg-white border-gray-300 md:w-[80%] lg:w-full border-l-1">
            <div className="flex items-center justify-between w-full h-20 gap-1 px-3 text-2xl font-bold shadow-lg shadow-gray-300 text-violet-600">
              <div className="flex items-center justify-start gap-2">
                <ShoppingBasket size={30} />
                <h6>Cart</h6>
              </div>
              {!isLargeScreen ? (
                <motion.button
                  onClick={() => setOpenCart(false)}
                  className="flex items-center justify-center gap-1 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer text-violet-400 shadow-gray-300"
                >
                  Close <ArrowRightFromLine size={20} />
                </motion.button>
              ) : null}
            </div>
            <section className="relative w-full h-full ">
              <section className="flex flex-col w-full gap-2 px-2 py-2 overflow-auto h-[calc(100vh-260px)] ">
                {Product.length > 0 ? (
                  Product.map((item) => (
                    <div
                      key={item.id}
                      className="grid justify-between grid-cols-3 px-4 py-5 border border-gray-300 shadow-lg 2xl:px-8 rounded-xl shadow-gray-300"
                    >
                      <div className="flex flex-col items-start justify-start col-span-2">
                        <strong className="text-sm text-start">
                          {item.itemName}
                        </strong>
                        <div className="flex flex-col items-center justify-center text-sm text-gray-600">
                          <p>
                            ₱ {item.itemprice} - {item.Unit}
                          </p>
                          <div className="flex items-center justify-center gap-2 font-extrabold text-md text-violet-400">
                            {/* Minus Button */}
                            <motion.button
                              onClick={() => RemoveQuantity(item.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center justify-center w-5 h-5 text-white shadow cursor-pointer bg-violet-200 rounded-xl hover:bg-violet-400"
                            >
                              <Minus className="w-5 h-5" />
                            </motion.button>

                            {/* Input Display */}
                            <input
                              min="1"
                              className="w-20 px-2 py-1 font-semibold text-center border border-gray-300 rounded-xl"
                              value={item.qtyToBuy}
                              onChange={(e) =>
                                HandleOnchangeQty(e.target.value, item.id)
                              }
                            />

                            {/* Plus Button */}
                            <motion.button
                              onClick={() => AddQuantity(item.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center justify-center w-5 h-5 text-white shadow cursor-pointer bg-violet-200 rounded-xl hover:bg-violet-400"
                            >
                              <Plus className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end pr-4">
                        <motion.button
                          onClick={() => RemoveItem(item.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center w-10 h-10 text-red-600 bg-red-100 shadow cursor-pointer rounded-xl hover:bg-red-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-violet-500 bg-violet-100 rounded-xl text-violet-700">
                    <ShoppingCart className="w-10 h-10 mb-2 text-violet-500" />
                    <strong className="text-lg">No Item Ordered</strong>
                  </div>
                )}
              </section>
              <section className="relative w-full h-30 border-t-1 border-violet-400 ">
                <div className="flex gap-5 pt-1 ml-2 text-xs font-semibold text-gray-500 xl:text-sm">
                  <p>Total Item: {totalItem}</p>
                  <p> Total Quantity: {TotatQuantity}</p>
                  <p>Vat: {vat}</p>
                </div>
                <div className="flex items-center justify-start w-full h-[80%] gap-3 px-5">
                  {/* Clear cart button */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    onClick={() => RemoveAll()}
                    className="flex items-center justify-center p-3 transition-all duration-200 cursor-pointer text-violet-600 bg-violet-100 rounded-xl hover:bg-violet-200 hover:text-violet-800"
                  >
                    <Trash2 size={22} />
                  </motion.button>

                  {/* Checkout button */}
                  <motion.button
                    onClick={() => openCheckOut(true)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className=" flex items-center justify-between w-full px-6 py-4 font-bold text-white transition-all duration-300 rounded-xl shadow-lg bg-[#8568EF] hover:bg-[#6f4ed9] hover:shadow-xl active:scale-95 cursor-pointer"
                  >
                    <span className="text-sm xl:text-lg">Checkout</span>
                    <span className="text-sm xl:text-lg">₱ {totalPrice}</span>
                  </motion.button>
                </div>
              </section>
            </section>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
