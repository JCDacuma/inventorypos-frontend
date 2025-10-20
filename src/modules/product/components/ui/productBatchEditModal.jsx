import { Modal } from "@/components/Layouts/modal.jsx";
import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useDeferredValue,
} from "react";
import { Group, Weight, CircleCheckBig, FolderOpen } from "lucide-react";
import { BatchEditLayout } from "@/modules/product/components/Layouts/productBatchEditLayout.jsx";
import { HandleInputChange } from "@/utils/InputValueChange.jsx";
import { BulkEditProduct } from "@/modules/product/api/productApi.jsx";
import { SweetAlert } from "@/utils/sweetalert.jsx";

export default function BatchEditProduct({
  isOpen,
  onClosed,
  setOpenUnit,
  setOpenCategory,

  //functionality
  FetchProducts,
  FetchCategory,
  FetchUnit,

  //Data
  selectedId,
  category,
  units,
}) {
  //---------------------Fetching / Option --------------------
  const [disabled, setDisabled] = useState(false);

  const [edit, setEdit] = useState({
    category: null,
    status: "",
    unit: null,
    tax: null,
  });

  const [selectedVal, setSelectedVal] = useState({
    category: null,
    unit: null,
  });

  const HandleReset = () => {
    setEdit({
      category: null,
      status: "",
      unit: null,
      tax: null,
    });
    setSelectedVal({
      category: null,
      unit: null,
    });
  };

  const FetchData = async () => {
    if (!isOpen) return;
    await FetchCategory();
    await FetchUnit();
  };

  useEffect(() => {
    FetchData();
  }, [isOpen]);

  const HandleRefetch = async () => {
    onClosed();
    await FetchProducts();
    HandleReset();
  };

  const categoryName = useMemo(() => {
    return category.map((category) => category.categoryName);
  });

  const unitName = useMemo(() => {
    return units.map((unit) => unit.unitname);
  });

  //taxable option
  const taxableOption = [
    { label: "yes", value: true },
    { label: "no", value: false },
  ];

  const Itemstatus = ["Active", "Inactive"];

  //product input edit batch
  const editInputs = [
    {
      disable: disabled,
      type: "dropdown",
      name: "category",
      placeholder: "Select Category",
      isString: false,
      hasBtn: true,
      onClick: () => setOpenCategory(),
      btnIcon: FolderOpen,
      icon: Group,
      option: categoryName,
      value: selectedVal.category,
    },
    {
      disable: disabled,
      type: "dropdown",
      name: "status",
      isString: true,
      placeholder: "Select Status",
      hasBtn: false,
      btnIcon: FolderOpen,
      icon: CircleCheckBig,
      option: Itemstatus,
      value: edit.status,
    },
    {
      disable: disabled,
      type: "dropdown",
      name: "unit",
      isString: false,
      placeholder: "Select Unit",
      hasBtn: true,
      btnIcon: FolderOpen,
      onClick: () => setOpenUnit(),
      icon: Weight,
      option: unitName,
      value: selectedVal.unit,
    },
    {
      disable: disabled,
      type: "radioInput",
      name: "tax",
      radioValue: edit.tax,
      radioOption: taxableOption,
    },
  ];

  // ------------ Dropdown / Input Change -------------
  const HandleSelectChange = (value, field) => {
    let selectedItem = null;

    if (field === "unit") {
      selectedItem = units?.find((unit) => unit.unitname === value);
    } else if (field === "category") {
      selectedItem = category?.find((categ) => categ.categoryName === value);
    }

    //dropdown current value sync input
    if (field === "unit") {
      HandleInputChange(selectedItem.unitname, field, setSelectedVal);
    }
    if (field === "category") {
      HandleInputChange(selectedItem.categoryName, field, setSelectedVal);
    }

    //main input set
    if (selectedItem) {
      HandleInputChange(selectedItem.id, field, setEdit);
    } else {
      HandleInputChange(value, field, setEdit);
    }
  };

  // ------------- Submit Request -----------------

  const HandleSubmit = async () => {
    if (disabled) return;

    const request = {};
    if (edit.status !== "") request.product_status = edit.status;
    if (edit.category !== null) request.category_id = edit.category;
    if (edit.unit !== null) request.unit_id = edit.unit;
    if (edit.tax !== null) request.taxable = edit.tax;

    if (Object.keys(request).length === 0) {
      SweetAlert.info(
        "No Input Detected",
        "Please fill in at least one field to proceed."
      );
      return;
    }
    setDisabled(true);
    try {
      await BulkEditProduct(selectedId, request, HandleRefetch);
    } finally {
      setDisabled(false);
    }
  };

  // ----------------- redering -------------------
  return (
    <Modal isOpen={isOpen} onClosed={onClosed} ModalTitle="Batch Edit">
      <BatchEditLayout
        editInputs={editInputs}
        inputSetter={setEdit}
        inputReset={HandleReset}
        //functionality
        dropdownChange={HandleSelectChange}
        inputChange={HandleInputChange}
        submitEdit={HandleSubmit}
        disable={disabled}
      />
    </Modal>
  );
}
