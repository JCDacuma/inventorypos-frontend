import { useMediaQuery } from "react-responsive";

import { motion } from "framer-motion";
import { Plus, Store, PackageX } from "lucide-react";

export default function SupplierProductSection({
  HandleDisableButton,
  productShowing,
  selectedSupplier,
  HandleSelectOrder,
}) {
  const isDesktop = useMediaQuery({ minWidth: 968 });
  return (
    <>
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
              <p className="font-medium text-gray-800">{item.itemname}</p>
              <p className="flex justify-end text-gray-600">{item.category}</p>
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
            <p className="font-medium text-gray-600">No supplier selected</p>
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
                  onChange={(e) => {
                    const newProduct = [...productShowing];
                    newProduct[index].Quantity = Number(e.target.value);
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
            <p className="font-medium text-gray-600">No supplier selected</p>
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
    </>
  );
}
