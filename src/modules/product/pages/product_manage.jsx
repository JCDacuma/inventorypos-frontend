import { useState } from "react";
import { Link } from "react-router-dom";

// Page Layout component
import { Layout } from "@/components/Layouts/Layout.jsx";
import ButtonLayout from "@/components/Layouts/pageControlButtons.jsx";
import { useMediaQuery } from "react-responsive";
import BatchControl from "@/components/Layouts/BatchControl.jsx";
import NavControl from "@/components/Layouts/pageControlsMobile.jsx";

//Table Layout component
import Table from "@/components/Layouts/table.jsx";
import TableHeader from "@/components/Layouts/tableHeader.jsx";
import MobileTable from "@/components/ui/MobileTable.jsx";
import { ProductStatus } from "@/modules/product/components/ui/productStatus.jsx";
import { Action } from "@/components/ui/buttons.jsx";

//Animation
import { motion, AnimatePresence } from "framer-motion";

//Icons
import { SquarePen, Trash2, Megaphone, CirclePlus } from "lucide-react";

export default function ProductManagement() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);
  const openBatchContol = selectedID.length > 0; //Batch Contol Modal State
  const [pageControl, setPageControl] = useState(false); //Page control mobile state modal

  const isSmallMobile = useMediaQuery({ maxWidth: 375 });

  // Table Action functionality
  const HandleEdit = (items, id) => {
    alert(`Edit ${items} id: ${id}`);
  };

  const HandleRemove = (items, id) => {
    alert(`remove ${items} id: ${id}`);
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
      icon: Trash2,
      padding: "py-2 px-6",
    },
  ];

  //Sample columns
  const columns = [
    { key: "Select", label: "" },
    { key: "product", label: "Product" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  //Page Controls
  const PageBtnControls = [
    {
      BtnLabel: "Add Product",
      iconControl: CirclePlus,
      to: "/product-add",
    },
    {
      BtnLabel: "Promo",
      iconControl: Megaphone,
      to: "/promo-management",
    },
  ];

  // Sample fetch from database
  const data = [
    {
      id: 1,
      product: "Laptop - Dell Inspiron 15",
      category: "Electronics",
      price: "₱6000",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Laptop - Dell Inspiron 15", 1),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleRemove("Laptop - Dell Inspiron 15", 1),
              icon: Trash2,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Layout currentWebPage="Manage Product">
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
            data={data}
            selectedID={selectedID}
            setSelectedId={setSelectedID}
          />
        </div>
        <div className="hidden md:block">
          <Table
            columns={columns}
            data={data}
            setSelectedId={setSelectedID}
            selectedID={selectedID}
          />
        </div>
      </div>

      {/* Batch Contol */}
      <BatchControl
        clearId={() => setSelectedID([])}
        Count={selectedID.length}
        Buttons={BatchControlBtn}
        openBatchContol={openBatchContol}
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
