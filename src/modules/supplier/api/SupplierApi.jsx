import { validationField } from "@/utils/validation.jsx";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import api from "@/api/axiosInstance.js";

export async function SubmitSupplier(supplier) {
  try {
    await api.post("/supplier", supplier);
    SweetAlert.success(
      "Registration Complete!",
      "The new supplier has been successfully added."
    );
  } catch (err) {
    SweetAlert.error("Failed to submit", "There is error in connection");
  }
}
