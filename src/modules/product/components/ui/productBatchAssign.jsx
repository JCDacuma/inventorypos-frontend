import { Modal } from "@/components/Layouts/modal.jsx";
import { LayoutProductSupplier } from "@/modules/product/components/Layouts/productSupplierLayout.jsx";
import { useState, useMemo, useEffect } from "react";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import {
  BulkProductAssignedSupplier,
  FetchAllSupplier,
  BulkAssigning,
} from "@/modules/product/api/productSupplierApi.jsx";

export default function BatchAssignSupplierModal({
  product,
  isOpen,
  onClosed,
  fetchProducts,
}) {
  const [assigned, setAssigned] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [openAssign, setOpenAssign] = useState(false);

  const SupplierAssignFetch = async () => {
    if (!product || !isOpen || openAssign) return;
    const request = {
      product_ids: product.id,
    };
    await BulkProductAssignedSupplier(request, setAssigned);
  };

  const HandleFetchAllSupplier = async () => {
    if (!openAssign || !isOpen) return;
    await FetchAllSupplier(setSupplier);
  };

  useEffect(() => {
    SupplierAssignFetch();
  }, [isOpen, openAssign]);

  useEffect(() => {
    HandleFetchAllSupplier();
  }, [isOpen, openAssign]);

  //refetching data
  const refetch = useMemo(
    () => async () => {
      setOpenAssign(false);
      await SupplierAssignFetch();
    },
    []
  );

  // assign
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
      productIds: product.id,
      actionType,
    };

    await BulkAssigning(request, refetch);
  };

  /* ==================== Modal Change ==================== */
  const HandleCloseModal = async () => {
    setAssigned(null);
    setSupplier(null);
    setOpenAssign(false);
    onClosed();
    await fetchProducts();
  };
  if (product.actionType !== "GroupAssign" || !isOpen) return; //page check
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
