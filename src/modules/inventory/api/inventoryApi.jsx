import api from "@/api/axiosInstance.js";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { ProductValidation } from "@/modules/product/utils/productValidation.jsx";

export async function InventoryFetch(setValue) {
  if (typeof setValue !== "function") {
    console.error("InventoryFetch error: setValue is not a valid function.");
    return;
  }

  try {
    const response = await api.get("get-inventory");

    const data = response.data.inventory.map((product) => ({
      id: product.id,
      code: product.product_code,
      name: product.productname,
      price: product.selling_price,
      totalQuantity: product.total_quantity,
      lastMovement: product.last_movement,
      category: product.product_category,
      reorder: product.reorder_level,
      unit: product.unit_symbol,
      status: product.product_status,
    }));

    if (data.length > 0) {
      setValue(data);
    } else {
      setValue(false);
    }
  } catch (err) {
    console.error("Error fetching inventory:", err);
    setValue(null);
  }
}
