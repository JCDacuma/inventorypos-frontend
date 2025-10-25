import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

//Page Layout
import { Layout } from "@/components/Layouts/Layout.jsx";
import NavControl from "@/components/Layouts/pageControlsMobile.jsx";
import { useMediaQuery } from "react-responsive";
import BatchControl from "@/components/Layouts/BatchControl.jsx";

//Table Layout component
import Table from "@/components/Layouts/table.jsx";
import TableHeader from "@/components/Layouts/tableHeader.jsx";
import MobileTable from "@/components/ui/MobileTable.jsx";
import { BatchStockStatus } from "@/modules/inventory/components/ui/inventoryStatus.jsx";
import { Action } from "@/components/ui/buttons.jsx";

//Animation
import { motion, AnimatePresence } from "framer-motion";

//Icons
import {
  Undo2,
  PackagePlus,
  PackageMinus,
  SquarePen,
  ReplaceAll,
  Trash2,
  Blocks,
} from "lucide-react";

export default function BatchInventory() {
  const isSmallMobile = useMediaQuery({ maxWidth: 375 });
  const { id } = useParams(); // selected item showing
  const selectedId = parseInt(id);
  //Item Selected
  const [selectedID, setSelectedID] = useState([]);
  const openBatchContol = selectedID.length > 0; //Batch Contol Modal State
  const [pageControl, setPageControl] = useState(false); //Page control mobile state modal

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

  //Page Controls
  const PageBtnControls = [{ BtnLabel: "Add Stock", iconControl: Blocks }];

  //Sample column
  const columns = [
    { key: "Select", label: "" },
    { key: "stocknumber", label: "Stock No." },
    { key: "location", label: "Location" },
    { key: "quantity", label: "Quantity" },
    { key: "status", label: "Status" },
    { key: "Lastmoved", label: "Last Moved" },
    { key: "stocktype", label: "Stock Status" },
    { key: "stockstate", label: "Stock State" },
    { key: "Action", label: "Action" },
  ];

  const batchData = [
    {
      id: 1,
      BatchNo: "LAP-2025-1009-001",
      Expiry: "2027-12-31",
      Location: "Warehouse A",
      Qty: 5,
      Supplier: "Dell Supplier Inc.",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("LAP-2025-1009-001", 1),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("LAP-2025-1009-001", 1),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("LAP-2025-1009-001", 1),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("LAP-2025-1009-001", 1),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 1,
    },
  ];

  const filteredData = batchData.filter(
    (Bdata) => Bdata.itemId === parseInt(id)
  );

  /* ================================== Action Functionality================================== */

  const HandleStockIn = (items, id) => {
    alert(`stockIn ${items} id: ${id}`);
  };

  const HandleStockOut = (items, id) => {
    alert(`StockOut ${items} id: ${id}`);
  };

  const HandleEdit = (items, id) => {
    alert(`Edit ${items} id: ${id}`);
  };

  const HandleTransfer = (items, id) => {
    alert(`Transfer ${items} id: ${id}`);
  };

  return (
    <Layout currentWebPage="Stock by batch">
      <div className="relative flex flex-col w-full px-5 pt-20 overflow-auto">
        <TableHeader
          pageControl={pageControl}
          setPageControl={() => setPageControl(true)}
          hasFilter={true}
          hasExport={true}
          hasNavBack={true}
          BackNavigationLink="/inventory"
          Buttons={PageBtnControls}
        />

        {/* Table Section */}
        <div className="block md:hidden">
          <MobileTable
            columns={columns}
            data={filteredData}
            selectedID={selectedID}
            setSelectedId={setSelectedID}
          />
        </div>

        <div className="hidden md:block">
          <Table
            columns={columns}
            data={filteredData}
            setSelectedId={setSelectedID}
            selectedID={selectedID}
          />
        </div>
      </div>

      {/* Batch Contol */}
      <BatchControl
        Count={selectedID.length}
        clearId={() => setSelectedID([])}
        openBatchContol={openBatchContol}
        Buttons={BatchControlBtn}
      />

      {/* Page Controls (Mobile Layout only) */}
      <NavControl
        onClosed={() => setPageControl(false)}
        isOpen={pageControl}
        hasExport={true}
        Buttons={PageBtnControls}
        hasNavBack={true}
        BackNavigationLink="/inventory"
      />
    </Layout>
  );
}
