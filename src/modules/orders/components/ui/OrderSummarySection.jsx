import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
//icons
import { Trash, Minus, Plus } from "lucide-react";

/* Order Creation Summary */
export default function OrderCreationSummary({
  // Data
  productOrdering,
  setProductOrder,
  Subtotal,
  TotalVat,
  TotalPrice,
  ShippingFee,
  ChangeShippingFee,

  // Functionality
  DecreaseStockBtn,
  IncreaseStockBtn,
  RemoveItem,
}) {
  const isDesktop = useMediaQuery({ minWidth: 968 });

  return (
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

          <div className="overflow-auto h-[calc(100vh-440px)] min-h-[200px] 2xl:h-[calc(100vh-480px)]">
            {/* Scrollable product list */}
            <div className="flex flex-col items-center justify-center flex-1 gap-4 pr-1">
              {productOrdering.length > 0 ? (
                productOrdering.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid items-center justify-end w-full grid-cols-3 px-4 py-4 transition bg-white border border-gray-200 shadow-md rounded-xl xl:px-8 hover:shadow-lg"
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
                          onClick={() => DecreaseStockBtn(index)}
                          whileTap={{
                            scale: 0.9,
                            backgroundColor:
                              item.Quantity - 1 <= 0 ? "#e5e7eb" : "#6d00c5",
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
                            setProductOrder(newproductOrdering);
                          }}
                        />

                        {/* Add Button */}
                        <motion.button
                          onClick={() => IncreaseStockBtn(index)}
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
                        onClick={() => RemoveItem(item.id)}
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
            <div className="w-full max-w-sm mx-auto space-y-2">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₱{Subtotal}</span>
              </div>

              {/* VAT */}
              <div className="flex items-center justify-between text-gray-600">
                <span>Tax (12% VAT)</span>
                <span>₱{TotalVat}</span>
              </div>

              {/* Shipping Fee */}
              <div className="flex items-center justify-between text-gray-600">
                <span>Shipping Fee</span>
                <div>
                  ₱
                  <input
                    value={ShippingFee}
                    onChange={(e) => ChangeShippingFee(e.target.value)}
                    className="p-1 ml-1 border border-gray-300 rounded-md shadow-sm text-end w-29"
                  />
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between pt-3 text-lg font-bold border-t">
                <span>Total</span>
                <span className="text-purple-600">₱ {TotalPrice}</span>
              </div>
            </div>
            <div className="flex justify-center">
              {/* Order Button */}
              <motion.button className="w-[70%]   py-2 mt-6 text-lg font-semibold text-white transition-all duration-200 ease-in-out bg-purple-600 shadow-md cursor-pointer rounded-xl hover:bg-purple-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2">
                Create Order
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
