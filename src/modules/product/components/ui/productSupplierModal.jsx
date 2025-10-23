import { Modal } from "@/components/Layouts/modal.jsx";
import { FetchSupplier } from "@/modules/supplier/api/SupplierApi.jsx";
import { LayoutProductSupplier } from "@/modules/product/components/Layouts/productSupplierLayout.jsx";
import { useState, useMemo, useEffect } from "react";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import {
  handleProductSupplierAssignment,
  productSupplierFetch,
  UnnasignedSupplierFetch,
} from "@/modules/product/api/productSupplierApi.jsx";
export default function ProductSupplierModal({ isOpen, onClosed, productId }) {
  const [assigned, setAssigned] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [openAssign, setOpenAssign] = useState(false);

  useEffect(() => {
    if (!isOpen || !productId?.id) return;
    productSupplierFetch(productId.id, setAssigned);
  }, [isOpen, productId?.id]);

  useEffect(() => {
    if (!isOpen || !openAssign || !productId?.id) return;
    UnnasignedSupplierFetch(productId.id, setSupplier);
  }, [openAssign, isOpen, productId?.id]);

  const refetch = useMemo(
    () => async () => {
      if (productId?.id) {
        await productSupplierFetch(productId.id, setAssigned);
        if (openAssign) {
          await UnnasignedSupplierFetch(productId.id, setSupplier);
        }
      }
    },
    [productId?.id, openAssign]
  );

  const HandleCloseModal = () => {
    onClosed();
    setSupplier(null);
    setOpenAssign(false);
    setAssigned(null);
  };

  const handleLinkUnlinkSupplier = async (
    supplierId,
    actionType,
    supplierName
  ) => {
    if (!supplierId || !["Unnasign", "Assign"].includes(actionType)) return;

    const verb = actionType === "Assign" ? "Assign" : "Unnasign";
    const progressive = actionType === "Assign" ? "Assigning" : "Unnasigning";

    const result = await SweetAlert.Confirm(
      `${progressive} Supplier`,
      `Are you sure you want to ${verb.toLowerCase()} supplier${
        supplierName ? ` "${supplierName}"` : ""
      }?`
    );

    if (!result.isConfirmed) return;

    const request = {
      supplierId,
      productId: productId.id,
      actionType,
    };

    await handleProductSupplierAssignment(request, refetch);
  };

  if (productId.actionType !== "SingleAssign" || !isOpen) return null;
  /* ===========  Render Layout (LayoutProductSupplier) ========== */
  return (
    <Modal
      ModalTitle={
        productId.productname
          ? `Product: ${productId.productname}`
          : "Product Supplier"
      }
      onClosed={() => HandleCloseModal()}
      isOpen={isOpen}
    >
      <LayoutProductSupplier
        openAssign={openAssign}
        assignedSupplier={assigned}
        setAssign={setOpenAssign}
        supplier={supplier}
        productname={productId.productname}
        HandleLinkUnlink={handleLinkUnlinkSupplier}
      />
    </Modal>
  );
}
