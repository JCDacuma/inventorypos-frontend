import { Modal } from "@/components/Layouts/modal.jsx";
import { LayoutProductSupplier } from "@/modules/product/components/Layouts/productSupplierLayout.jsx";
import { useState, useMemo, useEffect } from "react";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { BulkProductAssignedSupplier } from "@/modules/product/api/productSupplierApi.jsx";

export default function BatchAssignSupplierModal({
  product,
  isOpen,
  onClosed,
}) {
  if (product.actionType !== "GroupAssign" || !isOpen) return; //page check
  console.log(product);
  const [assigned, setAssigned] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [openAssign, setOpenAssign] = useState(false);

  const SupplierAssigneFetch = async () => {
    if (!product || !isOpen) return;

    const request = {
      product_ids: product.id,
    };
    await BulkProductAssignedSupplier(request, setAssigned);
  };

  useEffect(() => {
    SupplierAssigneFetch();
  }, []);

  const handleLinkUnlinkSupplier = () => {};

  /* ==================== Modal Change ==================== */
  const HandleCloseModal = async () => {
    setAssigned(null);
    setSupplier(null);
    setOpenAssign(false);
    onClosed();
  };

  return (
    <Modal
      ModalTitle={product.productname ? `Batch Assign` : "Product Supplier"}
      onClosed={() => HandleCloseModal()}
      isOpen={isOpen}
    >
      <LayoutProductSupplier
        openAssign={openAssign}
        assignedSupplier={assigned}
        setAssign={setOpenAssign}
        supplier={supplier}
        productname={product.productname}
        HandleLinkUnlink={handleLinkUnlinkSupplier}
      />
    </Modal>
  );
}
