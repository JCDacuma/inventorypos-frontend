import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "@/components/Layouts/modal.jsx";

export default function NavControl({ isOpen, onClosed, controlButton }) {
  return <Modal ModalTitle="Page contols" onClosed={onClosed}></Modal>;
}
