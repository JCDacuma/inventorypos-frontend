import Modal from "@/components/Layouts/modal.jsx";
import { SweetAlert } from "@/utils/sweetalert";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash, Plus, Minus } from "lucide-react";

export default function OrderSummaryMobile({
  isOpen,
  onClosed,
  order,
  setOrder,
  //Functionality
  AddStocks,
  MinStocks,
  RemoveItem,
  //SummaryTotal
  Subtotal,
  TotalVat,
  TotalPrice,
  ChangeShippingFee,
  ShippingFee,
}) {
  const [orders, setOrders] = useState([]);

  //Sync order
  useEffect(() => {
    setOrders(order);
  }, [order]);

  //Input Quantity
  const HandleQuantityInput = (index, value) => {
    if (!Number(value)) {
      SweetAlert.error("Invalid Input", "Please input number only");
    } else {
      const qty = Math.max(1, Number(value));
      const newOrder = order.map((order, indexOrder) =>
        indexOrder === index ? { ...order, Quantity: qty } : order
      );
      setOrder(newOrder);
    }
  };
  return (
    <Modal isOpen={isOpen} onClosed={onClosed} ModalTitle="Order Summary">
      <div className=" overflow-auto h-[calc(100vh-140px)] 2xl:h-[calc(100vh-200px)] px-2 pt-1 ">
        {order.length > 0 ? (
          <div className="flex flex-col gap-2 overflow-auto h-[calc(100vh-370px)] 2xl:h-[calc(100vh-440px)] ">
            {orders.map((item, index) => (
              <div
                key={item.id}
                className="grid items-center justify-end w-full grid-cols-3 px-4 py-4 transition bg-white border border-gray-200 shadow-md rounded-xl xl:px-8 hover:shadow-lg"
              >
                {/* Product Info */}
                <div className="flex flex-col items-start justify-center col-span-2 pl-2">
                  <span className="flex items-center justify-center text-sm font-semibold text-center text-gray-800">
                    {item.itemname}
                  </span>

                  <span className="pl-12 font-medium text-purple-600">
                    ₱{item.price}
                  </span>

                  <span className="text-gray-700 font-md pl-7 ">
                    Total: ₱{item.price * item.Quantity}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2">
                    {/* Decrease Button */}
                    <motion.button
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
                      onClick={() => MinStocks(index)}
                    >
                      <Minus size={12} />
                    </motion.button>

                    <input
                      className="py-1 text-center border border-gray-300 rounded-md shadow-sm w-14 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={item.Quantity}
                      onChange={(e) => {
                        HandleQuantityInput(index, e.target.value);
                      }}
                    />

                    {/* Add Button */}
                    <motion.button
                      whileTap={{
                        scale: 0.9,
                        backgroundColor: "#6d00c5",
                      }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#3c2350",
                      }}
                      onClick={() => AddStocks(index)}
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
                    onClick={() => RemoveItem(item.id)}
                    className="ml-2 font-medium text-red-500 cursor-pointer"
                  >
                    <Trash />
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-410px)] 2xl:h-[calc(100vh-470px)]  p-8 mt-10 text-gray-500 border border-gray-300 border-dashed bg-gray-50 rounded-xl">
            <span className="text-lg font-medium">No products ordered</span>
            <span className="text-sm text-gray-400">
              Your items will appear here once added.
            </span>
          </div>
        )}

        {/* Order Summary */}
        <div className="items-center justify-center w-full max-w-3xl p-6 mx-auto mt-1 border border-gray-200 shadow-sm bg-gray-50 rounded-xl ">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₱ {Subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tax (12% VAT)</span>
              <span>₱ {TotalVat}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
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
            <div className="flex justify-between pt-3 font-bold border-t text-md">
              <span>Total</span>
              <span className="text-purple-600">₱{TotalPrice}</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {/* Order Button */}
            <motion.button className="flex items-center justify-center w-full py-2 mt-2 font-semibold text-center text-white transition-all duration-200 ease-in-out bg-purple-600 shadow-md cursor-pointer text-md rounded-xl hover:bg-purple-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2">
              Create Order
            </motion.button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
