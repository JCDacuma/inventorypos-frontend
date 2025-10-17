import { validationField } from "@/utils/validation.jsx";
import { SweetAlert } from "@/utils/sweetalert.jsx";
export function ProductInputValidation(
  value,
  fieldname,
  setinputresult,
  rawprice
) {
  setinputresult((input) => {
    const update = { ...input };
    const numValue = parseFloat(value);
    const rawPrice = parseFloat(rawprice) || 0;

    switch (fieldname) {
      case "productname":
        update[fieldname] = validationField.productname.test(value);
        break;

      case "category":
        update[fieldname] = validationField.SelectedId.test(value);
        break;

      case "markUpPrice":
        update[fieldname] = validationField.markupprice.test(value);
        break;

      case "rawPrice":
        update[fieldname] = validationField.price.test(value) && numValue >= 0;
        break;

      case "sellingPrice":
        update[fieldname] =
          validationField.price.test(value) && numValue >= rawPrice;
        break;

      case "isTaxable":
        update[fieldname] = validationField.boolean.test(value);
        break;

      case "status":
        update[fieldname] = validationField.name.test(value);
        break;

      case "unit":
        update[fieldname] = validationField.SelectedId.test(value);
        break;

      case "reorderLevel":
        update[fieldname] =
          validationField.quantity.test(value) && numValue >= 0;
        break;

      case "description":
        update[fieldname] = validationField.description.test(value);
        break;

      case "unitname":
        update[fieldname] = validationField.unitname.test(value);
        break;

      case "symbol":
        update[fieldname] = validationField.symbol.test(value);
        break;

      default:
        break;
    }

    return update;
  });
}
export function ProductValidation(product) {
  for (const key in product) {
    const value = product[key];

    switch (key) {
      case "productImage":
        if (!value) {
          SweetAlert.error("Missing Image", "Please upload a product image.");
          return false;
        }

        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        const maxSize = 2 * 1024 * 1024;

        if (!allowedTypes.includes(value.type)) {
          SweetAlert.error(
            "Invalid File Type",
            "Only JPG, JPEG, or PNG are allowed."
          );
          return false;
        }

        if (value.size > maxSize) {
          SweetAlert.error("File Too Large", "Image must be under 2MB.");
          return false;
        }
        break;

      case "productname":
        if (!validationField.productname.test(value)) {
          SweetAlert.error(
            "Invalid Product Name",
            "Must be 2–150 characters using letters, numbers, or basic symbols."
          );
          return false;
        }
        break;

      case "category":
        if (!validationField.SelectedId.test(value)) {
          SweetAlert.error(
            "Invalid Category",
            "Please select a valid category."
          );
          return false;
        }
        break;

      case "rawPrice":
        if (!validationField.price.test(value)) {
          SweetAlert.error(
            "Invalid Raw Price",
            "Enter a valid numeric amount (e.g., 100 or 99.99)."
          );
          return false;
        }
        break;

      case "markUpPrice":
        if (!validationField.markupprice.test(value)) {
          SweetAlert.error(
            "Invalid Mark-Up",
            "Enter a valid percentage (e.g., 10 or 5.5)."
          );
          return false;
        }
        break;

      case "sellingPrice":
        if (!validationField.price.test(value)) {
          SweetAlert.error(
            "Invalid Selling Price",
            "Enter a valid numeric price (e.g., 150 or 149.99)."
          );
          return false;
        }
        if (parseFloat(value) < parseFloat(product.rawPrice || 0)) {
          SweetAlert.error(
            "Selling Price Too Low",
            "Must not be lower than raw price."
          );
          return false;
        }
        break;

      case "isTaxable":
        if (!validationField.boolean.test(value)) {
          SweetAlert.error(
            "Invalid Tax Field",
            "Taxable must be true or false."
          );
          return false;
        }
        break;

      case "status":
        if (!validationField.name.test(value)) {
          SweetAlert.error("Invalid Status", "Please enter a valid status.");
          return false;
        }
        break;

      case "reorderLevel":
        if (!validationField.quantity.test(value)) {
          SweetAlert.error(
            "Invalid Quantity",
            "Reorder level must be a whole number above 0."
          );
          return false;
        }
        break;

      case "description":
        if (!validationField.description.test(value)) {
          SweetAlert.error(
            "Invalid Description",
            "Please enter a clear, valid description."
          );
          return false;
        }
        break;

      case "unitname":
        if (!validationField.unitname.test(value)) {
          SweetAlert.error(
            "Invalid Unit Name",
            "Use 2–100 characters: letters, numbers, or dashes."
          );
          return false;
        }
        break;

      case "symbol":
        if (!validationField.symbol.test(value)) {
          SweetAlert.error(
            "Invalid Symbol",
            "Use 1–10 valid characters (e.g., %, °, /)."
          );
          return false;
        }
        break;
      case "categoryName":
        if (!validationField.name.test(value)) {
          SweetAlert.error(
            "Invalid Category Name",
            "Please enter a valid category name. It must be at least 2 characters long and may only contain letters, spaces, apostrophes, or hyphens."
          );
          return false;
        }
        break;
    }
  }
  return true;
}
