import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Tag, XCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/Layouts/modal.jsx";

export default function AddCategoryModal({ isOpen, onClosed }) {
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    if (!category.trim()) return;
    console.log("New category:", category);
    setCategory("");
    onClosed();
  };

  return (
    <Modal
      ModalTitle="Create Category"
      isOpen={isOpen}
      onClosed={onClosed}
      margin={"mt-0 mb-0 2xl:mb-25"}
    >
      <div className="p-6 space-y-6">
        {/* Input with icon */}
        <Input
          placeholder="Enter category"
          value={category}
          onChange={setCategory}
          icons={Tag}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          {/* Cancel */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            onClick={onClosed}
            className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-gray-600 transition border sm:px-5 rounded-xl hover:bg-gray-100"
          >
            <XCircle className="w-5 h-5" />
            Cancel
          </motion.button>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: category ? 1.03 : 1 }}
            whileTap={{ scale: category ? 0.97 : 1 }}
            transition={{ duration: 0.15 }}
            onClick={handleSubmit}
            disabled={!category.trim()}
            className={`flex items-center gap-2 px-2 sm:px-5 py-2 text-xs  font-semibold text-white rounded-xl shadow-md transition
              ${
                category.trim()
                  ? "bg-violet-600 hover:bg-violet-700 hover:shadow-lg"
                  : "bg-violet-300 cursor-not-allowed"
              }
            `}
          >
            <PlusCircle className="w-5 h-5" />
            Add Category
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
