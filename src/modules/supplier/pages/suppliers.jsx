import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

// Page Layout component
import { Layout } from "@/components/Layouts/Layout.jsx";

import { BatchEditModal } from "@/modules/supplier/components/Layouts/supplierUpdateBatchModal.jsx";
import ContactModal from "@/modules/supplier/components/Layouts/registerContactModal.jsx";
import BatchControl from "@/components/Layouts/BatchControl.jsx";
import NavControl from "@/components/Layouts/pageControlsMobile.jsx";

//Table Layout component
import Table from "@/components/Layouts/table.jsx";
import TableHeader from "@/components/Layouts/tableHeader.jsx";
import MobileTable from "@/components/ui/MobileTable.jsx";
import { SupplierStatus } from "@/modules/supplier/components/ui/supplier.status.jsx";
import { Action } from "@/components/ui/buttons.jsx";

//Animation
import { motion, AnimatePresence } from "framer-motion";

//Icons
import {
  SquarePen,
  Archive,
  OctagonMinus,
  TruckElectric,
  ClipboardClock,
  PhoneCall,
} from "lucide-react";
import { FetchSupplier } from "@/modules/supplier/api/SupplierApi.jsx";
import { FetchContact } from "@/modules/supplier/api/ContactApi.jsx";

export default function Suppliers() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);

  //Batch Contol Modal State
  const [pageControl, setPageControl] = useState(false); //Page control mobile state modal
  //BatchUpdate modal state
  const [batchUpdateModal, setBatchUpdateModal] = useState(false);
  const [supplier, setSupplier] = useState([]); //supplier fetched
  const [addContactModal, setContactModal] = useState(false);
  const [fetchedContact, setFectchedContact] = useState([]);
  const navigation = useNavigate();

  //api fetch contact functionality
  const HandleContactFetch = async () => {
    await FetchContact(setFectchedContact);
  };

  //Trigger fetch
  useEffect(() => {
    HandleContactFetch();
  }, []);

  //Batch Control ----------------------
  const HandleBatchUpdate = () => {
    setBatchUpdateModal(true);
  };

  const HandleBatchArchive = () => {};

  //Active Table Button  ----------------------

  //Archiving functionality for selected id
  const HandleArchieve = (id) => {};

  //Edit functionality for selected id
  const HandleEdit = (id) => {
    navigation(`/register-supplier/${id}`);
  };

  //Action Header Button ------------------------
  const HandleOpenContactModal = () => {
    setContactModal(true);
  };

  //BatchControls
  const BatchControlBtn = [
    {
      btnLabel: "Edit",
      color: "bg-violet-500 ",
      icon: SquarePen,
      padding: "py-2 px-6",
      function: () => HandleBatchUpdate(),
    },
    {
      btnLabel: "Archive",
      color: "bg-[#910B0B]/[0.69]",
      icon: Archive,
      padding: "py-2 px-6",
      function: () => HandleBatchArchive(),
    },
  ];

  //Page Controls
  const PageBtnControls = [
    {
      BtnLabel: "Register Supplier",
      iconControl: TruckElectric,
      to: "/register-supplier/register",
    },
    {
      BtnLabel: "Contact",
      iconControl: PhoneCall,
      onClick: () => HandleOpenContactModal(),
    },
  ];

  //table column
  const columns = [
    { key: "Select", label: "" },
    { key: "suppliername", label: "Supplier Name" },
    { key: "contactperson", label: "Contact Person" },
    { key: "Address", label: "Adress" },
    { key: "vatregistered", label: "Vat Register" },
    { key: "shippingfee", label: "Shipping Fee" },
    { key: "status", label: "Status" },
    { key: "Action", label: "Action" },
  ];

  //supplier data table
  const fetchedSupplier = useMemo(() => {
    return supplier.map((sup) => ({
      id: sup.id,
      suppliername: sup.supplierName,
      contactperson: sup.name_contact,
      Address: sup.supplier_address,
      vatregistered: sup.vat_registered ? "Yes" : "No",
      shippingfee: ` ₱ ${sup.shipping_fee}`,
      status: <SupplierStatus status={sup.status} />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit(sup.id),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
              tooltip: "Edit",
            },
            {
              to: "/order-history/8",
              icon: ClipboardClock,
              iconSize: "h-[1.2rem] w-[1.2rem]",
              tooltip: "History",
            },
            {
              onClick: () => HandleArchieve(sup.id),
              icon: Archive,
              iconSize: "h-[1.2rem] w-[1.2rem]",
              tooltip: "Archieve",
            },
          ]}
        />
      ),
    }));
  }, [supplier]);

  const HandleFetchSupplier = () => {
    FetchSupplier(setSupplier);
  };

  useEffect(() => {
    HandleFetchSupplier();
  }, []);

  return (
    <Layout currentWebPage="Supplier">
      <div className="relative flex flex-col w-full px-5 pt-20 overflow-auto">
        {/* Control Section */}
        <TableHeader
          pageControl={pageControl}
          setPageControl={() => setPageControl(true)}
          hasFilter={true}
          hasExport={true}
          Buttons={PageBtnControls}
        />

        {/* Table Section */}
        <div className="block md:hidden">
          <MobileTable
            columns={columns}
            setSelectedId={setSelectedID}
            data={fetchedSupplier}
          />
        </div>

        <div className="hidden md:block">
          <Table
            columns={columns}
            setSelectedId={setSelectedID}
            data={fetchedSupplier}
          />
        </div>
      </div>

      {/* Batch Contol */}
      <BatchControl
        Count={selectedID.length}
        openBatchContol={selectedID.length > 0}
        Buttons={BatchControlBtn}
      />

      {/* Page Controls (Mobile Layout only) */}
      <NavControl
        onClosed={() => setPageControl(false)}
        isOpen={pageControl}
        hasExport={true}
        Buttons={PageBtnControls}
      />

      {/* Batch Edit modal */}
      <BatchEditModal
        id={selectedID}
        isOpen={batchUpdateModal}
        onClosed={() => setBatchUpdateModal(false)}
        contact={fetchedContact}
      />

      {/* Registerd Contact Modal */}
      <ContactModal
        isOpen={addContactModal}
        onClosed={() => setContactModal(false)}
        FetchContact={HandleContactFetch}
        Contact={fetchedContact}
      />
    </Layout>
  );
}
