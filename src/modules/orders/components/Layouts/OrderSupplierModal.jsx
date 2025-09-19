import { useState } from "react";
import Modal from "@/components/Layouts/modal";
export default function SupplierModal({ isOpen, onClosed }) {
  return (
    <Modal
      isOpen={isOpen}
      onClosed={onClosed}
      ModalTitle="Supplier Info"
    ></Modal>
  );
}
