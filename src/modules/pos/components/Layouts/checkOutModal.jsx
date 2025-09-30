import React from "react";
import { Modal } from "@/components/Layouts/modal.jsx";
import { DefaultDropDown } from "@/components/ui/dropdown.jsx";
import { Input } from "@/components/ui/Input.jsx";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TicketPercent, HandCoins } from "lucide-react";

export default function CheckOut({ isOpen, onClosed }) {
  const totalItem = 2;
  const totalquantity = 4;
  const subtotal = 3000;

  return (
    <Modal isOpen={isOpen} onClosed={onClosed} ModalTitle="Checkout">
      <div className="w-full h-[calc(100vh-210px)] p-2">
        <div className="w-full h-full px-2 overflow-auto">
          {/* Checkout Summary */}
          <section className="flex flex-col justify-start w-full gap-1 py-2 border-b-2 border-gray-400">
            <div className="flex justify-between w-full px-2 sm:px-10">
              <span>total items:</span>
              <span>10</span>
            </div>
            <div className="flex justify-between w-full px-2 sm:px-10">
              <span>total quantity:</span>
              <span>21</span>
            </div>
            <div className="flex justify-between w-full px-2 sm:px-10">
              <span>Subtotal:</span>
              <span>₱4300</span>
            </div>
            <div className="flex justify-between w-full px-2 sm:px-10">
              <span>Vat:</span>
              <span>₱300</span>
            </div>
            <div className="flex justify-between w-full px-2 sm:px-10">
              <span>
                <strong>Total:</strong>
              </span>
              <span>
                <strong>₱4800</strong>
              </span>
            </div>
          </section>
          {/* Discount Section */}
          <section className="px-4 py-4 border-b-2 border-gray-400">
            <strong className="text-gray-500 ">Discount and Exception</strong>
            <div className="flex flex-col w-full gap-2 py-2">
              <DefaultDropDown
                placeholder="Select discount type"
                icons={TicketPercent}
              />
              <p>Type: No selected yet</p>
            </div>
            <div className="flex items-center justify-start w-full gap-2">
              <strong className="text-sm text-gray-500">ID number: </strong>
              <input
                className="px-3 py-2 border shadow-lg border-violet-300 rounded-xl shadow-gray-300"
                placeholder="Enter ID number"
              />
            </div>
          </section>
          {/* Payment method */}
          <section className="px-4 py-4 border-b-2 border-gray-400">
            <strong className="text-gray-500">Payment method</strong>
            <div className="flex flex-col w-full py-2">
              <DefaultDropDown
                placeholder="Select payment method"
                icons={HandCoins}
              />
              <div className="flex items-center justify-start w-full gap-2 py-3">
                <strong className="text-sm text-gray-500">
                  Amount recieved:{" "}
                </strong>
                <input
                  className="px-3 py-2 border shadow-lg border-violet-300 rounded-xl shadow-gray-300"
                  placeholder="Enter amount recieved"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center w-full gap-2 text-sm text-gray-500">
                  <strong>Change:</strong> <strong>0</strong>
                </div>
                <div className="flex items-center w-full gap-2 text-sm text-black">
                  <strong>Final total:</strong> <strong>₱4000</strong>
                </div>
              </div>
            </div>
          </section>
          {/* Confirm checkout button */}

          <button className="flex items-center justify-center w-full px-5 py-3 mt-4 text-white rounded-lg bg-violet-500">
            Confirm Checkout
          </button>
        </div>
      </div>
    </Modal>
  );
}
