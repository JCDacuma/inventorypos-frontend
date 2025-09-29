import React from "react";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBasket, ArrowRightFromLine, Trash2 } from "lucide-react";

import {} from "lucide-react";
export default function POSCart({
  isCartOpen,
  setOpenCart,
  Product,
  openCheckOut,
}) {
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const totalItem = 2;
  const TotatQuantity = 0;
  const vat = 200;
  const totalPrice = 20000;

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
          <div className="flex flex-col w-full h-full bg-white border-gray-300 md:w-[80%] lg:w-full border-l-1">
            <div className="flex items-center justify-between w-full gap-1 px-3 text-2xl font-bold shadow-lg h-[10%] shadow-gray-300 text-violet-600">
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
              <section className="flex flex-col w-full h-[75%] gap-2 px-2 py-2 overflow-auto">
                {Product.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between px-4 py-5 border border-gray-300 shadow-lg 2xl:px-8 rounded-xl shadow-gray-300"
                  >
                    <div className="flex flex-col items-center">
                      <strong>{item.item}</strong>
                      <div className="flex flex-col items-center justify-center text-sm text-gray-600">
                        <p>
                          ₱ {item.itemprice} - {item.Unit}
                        </p>
                        <div className="flex items-center justify-center gap-2 font-extrabold text-md text-violet-400">
                          <button className="text-lg cursor-pointer ">+</button>
                          <input className="items-center w-20 px-2 py-1 font-semibold text-center border border-gray-300 rounded-xl" />

                          <button className="text-lg cursor-pointer">-</button>
                        </div>
                      </div>
                    </div>
                    <button className="text-orange-600 cursor-pointer">
                      <Trash2 size={25} />
                    </button>
                  </div>
                ))}
              </section>
              <section className="relative w-full h-[25%] border-t-1 border-violet-400 ">
                <div className="flex gap-5 pt-1 ml-2 text-xs font-semibold text-gray-500 xl:text-sm">
                  <p>Total Item: {totalItem}</p>
                  <p> Total Quantity: {TotatQuantity}</p>
                  <p>Vat: {vat}</p>
                </div>
                <div className="flex items-center justify-start w-full h-[80%] gap-3 px-5">
                  {/* Clear cart button */}
                  <button className="flex items-center justify-center p-3 transition-all duration-200 text-violet-600 bg-violet-100 rounded-xl hover:bg-violet-200 hover:text-violet-800">
                    <Trash2 size={22} />
                  </button>

                  {/* Checkout button */}
                  <button
                    onClick={() => openCheckOut(true)}
                    className="flex items-center justify-between w-full px-6 py-4 font-bold text-white transition-all duration-300 rounded-xl shadow-lg bg-[#8568EF] hover:bg-[#6f4ed9] hover:shadow-xl active:scale-95"
                  >
                    <span className="text-sm xl:text-lg">Checkout</span>
                    <span className="text-sm xl:text-lg">₱ {totalPrice}</span>
                  </button>
                </div>
              </section>
            </section>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
