import Swal from "sweetalert2";

export const SweetAlert = {
  // Success alert
  success: (title = "Success", text = "") => {
    return Swal.fire({
      icon: "success",
      title,
      text,
      showConfirmButton: true,
      confirmButtonColor: "#6d00c5",
      width: "90%", // mobile-friendly width
      padding: "1.5em",
      backdrop: true,
      customClass: {
        title: "text-lg font-semibold",
        content: "text-sm text-gray-700",
        confirmButton:
          "px-4 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700",
      },
    });
  },

  // Error alert
  error: (title = "Error", text = "") => {
    return Swal.fire({
      icon: "error",
      title,
      text,
      showConfirmButton: true,
      confirmButtonColor: "#d33",
      width: "100% md:40%",
      backdrop: true,
      allowOutsideClick: false,
      customClass: {
        title: "text-md sm:text-lg font-lg",
        content: "text-xs md:text-sm text-gray-700",
        confirmButton:
          "px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700",
      },
    });
  },

  // Info alert
  info: (title = "", text = "") => {
    return Swal.fire({
      icon: "info",
      title,
      text,
      showConfirmButton: true,
      confirmButtonColor: "#3b82f6",
      width: "90%",
      padding: "1.5em",
      backdrop: true,
      customClass: {
        title: "text-lg font-semibold",
        content: "text-sm text-gray-700",
        confirmButton:
          "px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700",
      },
    });
  },
};
