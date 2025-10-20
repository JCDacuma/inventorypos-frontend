import api from "@/api/axiosInstance.js";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { ProductValidation } from "@/modules/product/utils/productValidation.jsx";

//-------------------- Fetch unit -------------------------
export async function FetchUnit(setUnit) {
  try {
    const respond = await api.get("productunit");
    const responseData = respond.data.map((res) => ({
      id: res.id,
      unitname: res.unitname,
      symbol: res.symbol,
      description: res.description,
      unitstatus: res.unit_status,
    }));
    setUnit(responseData);
  } catch (err) {
    console.error(`There is unexpecetd error: ${err}`);
  }
}

//-------------------- Register unit -------------------------
export async function registerUnit(request, HandleReset) {
  if (!request || !ProductValidation(request)) return;

  const form = {
    unitname: request.unitname.trim(),
    symbol: request.symbol.trim(),
    description: request.description?.trim() || "",
    unitstatus: "Active",
  };

  SweetAlert.loading("Adding Unit...", "Please wait, while Adding Unit");
  try {
    await api.post("productunit", form);

    SweetAlert.close();
    SweetAlert.success("Success", "New unit has been registered successfully!");
    if (typeof HandleReset === "function") HandleReset();
  } catch (err) {
    SweetAlert.close();
    console.error("Error registering unit:", err);

    if (err.response) {
      const { status, data } = err.response;

      if (status === 422 && data.errors) {
        const firstError = Object.values(data.errors)[0][0];
        SweetAlert.error("Validation Error", firstError);
        return;
      }

      if (status === 500) {
        SweetAlert.error(
          "Server Error",
          data.error || "Something went wrong on the server."
        );
        return;
      }

      SweetAlert.error(
        `Error ${status}`,
        data.message || "An unexpected error occurred."
      );
    } else if (err.request) {
      SweetAlert.error(
        "Network Error",
        "Cannot reach the server. Please check your internet connection."
      );
    } else {
      SweetAlert.error(
        "Unexpected Error",
        err.message || "An unexpected issue occurred."
      );
    }
  }
}
//-------------------- Update unit -------------------------
export async function updateUnit(request, HandleReset) {
  if (!request || !ProductValidation(request)) return;

  const form = {
    unitname: request.unitname.trim(),
    symbol: request.symbol.trim(),
    description: request.description?.trim() || "",
    unitstatus: "Active",
  };

  SweetAlert.loading("Editing Unit...", "Please wait, while Editing Unit");
  try {
    await api.put(`productunit/${request.id}`, form);

    SweetAlert.close();
    SweetAlert.success("Updated", "Unit details saved successfully.");
    if (typeof HandleReset === "function") HandleReset();
  } catch (err) {
    SweetAlert.close();
    console.error("Update error:", err);

    if (err.response) {
      const { status, data } = err.response;

      if (status === 422 && data.errors) {
        const firstError = Object.values(data.errors)[0][0];
        SweetAlert.error("Validation Error", firstError);
        return;
      }

      if (status === 500) {
        SweetAlert.error("Server Error", data.error || "Something went wrong.");
        return;
      }

      SweetAlert.error(`Error ${status}`, data.message || "Unexpected error.");
    } else if (err.request) {
      SweetAlert.error("Network Error", "Failed to reach the server.");
    } else {
      SweetAlert.error("Error", err.message || "An unknown error occurred.");
    }
  }
}

//-------------------- Delete unit -------------------------
export async function DeleteUnit(request, HandleReset) {
  if (!request || !request.id) return;

  const unit = {
    unitstatus: "Deleted",
  };

  SweetAlert.loading("Deleting Unit...", "Please wait, while Deleting Unit");

  try {
    await api.patch(`productunit-delete/${request.id}`, unit);

    SweetAlert.close();
    SweetAlert.success(`Successfully deleted ${request.unitname || "unit"}`);

    if (typeof HandleReset === "function") HandleReset();
  } catch (err) {
    SweetAlert.close();
    console.error("Error deleting unit:", err);
    SweetAlert.error("Failed to delete unit. Please try again.");
  }
}
