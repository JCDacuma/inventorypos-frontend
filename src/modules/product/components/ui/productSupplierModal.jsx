import { Modal } from "@/components/Layouts/modal.jsx";
import { LayoutProductSupplier } from "@/modules/product/components/Layouts/productSupplierLayout.jsx";
import { useState, useMemo, useEffect } from "react";

import { productSupplierFetch } from "@/modules/product/api/productSupplierApi.jsx";
import { FetchSupplier } from "@/modules/supplier/api/SupplierApi.jsx";

export default function ProductSupplierModal({ isOpen, onClosed, productId }) {
  const [assigned, setAssigned] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [openAssign, setOpenAssign] = useState(false);

  // --------------- fetching functionality -----------------------------
  const AssignedSupplierFetch = async () => {
    if (!productId.id || !isOpen) return;
    await productSupplierFetch(productId.id, setAssigned);
  };

  const AllSupplierFetch = async () => {
    if (!openAssign) return;
    await FetchSupplier(setSupplier);
  };

  useEffect(() => {
    AssignedSupplierFetch();
  }, [productId, isOpen]);

  useEffect(() => {
    AllSupplierFetch();
  }, [openAssign]);

  // ------------------------- State Modal ----------------------------
  const HandleCloseModal = () => {
    onClosed();
    setAssigned(null);
  };

  /* --------------  Render Layout (LayoutProductSupplier) ----------- */
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
      />
    </Modal>
  );
}
