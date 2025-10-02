import { useState } from "react";
import { Link } from "react-router-dom";

// Page Layout component
import { Layout } from "@/components/Layouts/Layout.jsx";

import { useMediaQuery } from "react-responsive";

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
import { SquarePen, Eye, OctagonMinus, TruckElectric } from "lucide-react";

export default function Suppliers() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);

  //Batch Contol Modal State
  const openBatchContol = selectedID.length > 0;
  const [pageControl, setPageControl] = useState(false); //Page control mobile state modal

  const isSmallMobile = useMediaQuery({ maxWidth: 375 });

  const HandleEdit = (items, id) => {
    alert(`Edit ${items} id: ${id}`);
  };

  const HandleInactive = (items, id) => {
    alert(`UpdateInactive ${items} id: ${id}`);
  };

  //BatchControls
  const BatchControlBtn = [
    {
      btnLabel: "Edit",
      color: "bg-violet-500 ",
      icon: SquarePen,
      padding: "py-2 px-6",
    },
    {
      btnLabel: "Remove",
      color: "bg-[#910B0B]/[0.69]",
      icon: OctagonMinus,
      padding: "py-2 px-6",
    },
  ];

  //Page Controls
  const PageBtnControls = [
    {
      BtnLabel: "Register Supplier",
      iconControl: TruckElectric,
      to: "/register-supplier",
    },
  ];

  const columns = [
    { key: "Select", label: "" },
    { key: "suppliername", label: "Supplier" },
    { key: "contactperson", label: "Contact" },
    { key: "phonenumber", label: "Phone" },
    { key: "vatregistered", label: "VatRegister" },
    { key: "shippingfee", label: "ShippingFee" },
    { key: "status", label: "Status" },
    { key: "Action", label: "Action" },
  ];

  const supplierData = [
    {
      id: 1,
      suppliername: "Dell Supplier Inc.",
      contactperson: "John Smith",
      phonenumber: "+63 912 345 6789",
      vatregistered: "Yes",
      shippingfee: "₱2,500",
      status: <SupplierStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Dell Supplier Inc.", 1),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/1",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Dell Supplier Inc.", 1),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 2,
      suppliername: "Tech Distributors Ltd.",
      contactperson: "Emily Davis",
      phonenumber: "+63 917 222 3344",
      vatregistered: "No",
      shippingfee: "₱1,800",
      status: <SupplierStatus status="Inactive" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Tech Distributors Ltd.", 2),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/2",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Tech Distributors Ltd.", 2),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 3,
      suppliername: "Logitech Distribution",
      contactperson: "Michael Lee",
      phonenumber: "+63 918 555 7788",
      vatregistered: "Yes",
      shippingfee: "₱1,200",
      status: <SupplierStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Logitech Distribution", 3),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/3",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Logitech Distribution", 3),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 4,
      suppliername: "Apple Authorized Dist.",
      contactperson: "Sophia Tan",
      phonenumber: "+63 915 111 2233",
      vatregistered: "Yes",
      shippingfee: "₱3,000",
      status: <SupplierStatus status="Inactive" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Apple Authorized Dist.", 4),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/4",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Apple Authorized Dist.", 4),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 5,
      suppliername: "Samsung Electronics",
      contactperson: "David Kim",
      phonenumber: "+63 916 777 8899",
      vatregistered: "No",
      shippingfee: "₱2,200",
      status: <SupplierStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Samsung Electronics", 5),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/5",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Samsung Electronics", 5),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 6,
      suppliername: "Grocery Trading Corp.",
      contactperson: "Maria Lopez",
      phonenumber: "+63 913 444 5566",
      vatregistered: "Yes",
      shippingfee: "₱900",
      status: <SupplierStatus status="Inactive" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Grocery Trading Corp.", 6),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/6",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Grocery Trading Corp.", 6),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 7,
      suppliername: "Furniture World Supply",
      contactperson: "James Rodriguez",
      phonenumber: "+63 919 888 3344",
      vatregistered: "No",
      shippingfee: "₱1,500",
      status: <SupplierStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Furniture World Supply", 7),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/7",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Furniture World Supply", 7),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 8,
      suppliername: "Clothing Hub Dist.",
      contactperson: "Anna Garcia",
      phonenumber: "+63 914 222 7788",
      vatregistered: "Yes",
      shippingfee: "₱1,000",
      status: <SupplierStatus status="Inactive" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Clothing Hub Dist.", 8),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/8",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Clothing Hub Dist.", 8),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
  ];

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
            data={supplierData}
            setSelectedId={setSelectedID}
          />
        </div>

        <div className="hidden md:block">
          <Table
            columns={columns}
            data={supplierData}
            setSelectedId={setSelectedID}
          />
        </div>
      </div>

      {/* Batch Contol */}
      <BatchControl
        Count={selectedID.length}
        openBatchContol={openBatchContol}
        Buttons={BatchControlBtn}
      />

      {/* Page Controls (Mobile Layout only) */}
      <NavControl
        onClosed={() => setPageControl(false)}
        isOpen={pageControl}
        hasExport={true}
        Buttons={PageBtnControls}
      />
    </Layout>
  );
}
