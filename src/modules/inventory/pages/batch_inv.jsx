import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

//Page Layout
import {
  Layout,
  MainWrapper,
  ButtonLayout,
  ControlLayout,
} from "../../../components/Layouts/Layout.jsx";
import { useMediaQuery } from "react-responsive";
import { ExportButton } from "../../../components/ui/buttons.jsx";
import Searchbar from "../../../components/ui/Searchbar.jsx";
import BatchControl from "../../../components/Layouts/BatchControl.jsx";

//Table Layout component
import Table from "../../../components/ui/Table.jsx";
import MobileTable from "../../../components/ui/MobileTable.jsx";
import { BatchStockStatus } from "../../../components/ui/Status.jsx";
import { Action } from "../../../components/ui/buttons.jsx";

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

  //Item Selected
  const [selectedID, setSelectedID] = useState([]);
  const openBatchContol = selectedID.length > 0; //Batch Contol Modal State

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

  //Sample column
  const columns = [
    { key: "Select", label: "" },
    { key: "BatchNo", label: "Batch Number" },
    { key: "Expiry", label: "Expired Date" },
    { key: "Location", label: "Location" },
    { key: "Qty", label: "Qty" },
    { key: "Supplier", label: "Supplier" },
    { key: "Status", label: "Status" },
    { key: "Action", label: "Action" },
  ];

  const batchData = [
    // Batches for Laptop (id: 1)
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
    {
      id: 2,
      BatchNo: "LAP-2025-1009-002",
      Expiry: "2026-06-30",
      Location: "Warehouse B",
      Qty: 7,
      Supplier: "Tech Distributors Ltd.",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("LAP-2025-1009-002", 2),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("LAP-2025-1009-002", 2),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("LAP-2025-1009-002", 2),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("LAP-2025-1009-002", 2),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 1,
    },

    // Batches for Wireless Mouse (id: 2)
    {
      id: 3,
      BatchNo: "MOU-2025-1009-001",
      Expiry: "2028-01-01",
      Location: "Warehouse A",
      Qty: 25,
      Supplier: "Logitech Distribution",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("MOU-2025-1009-001", 3),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("MOU-2025-1009-001", 3),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("MOU-2025-1009-001", 3),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("MOU-2025-1009-001", 3),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 2,
    },
    {
      id: 4,
      BatchNo: "MOU-2025-1009-002",
      Expiry: "2027-05-15",
      Location: "Warehouse C",
      Qty: 20,
      Supplier: "Global Peripherals",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("MOU-2025-1009-002", 4),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("MOU-2025-1009-002", 4),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("MOU-2025-1009-002", 4),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("MOU-2025-1009-002", 4),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 2,
    },

    // Batches for Smartphone - iPhone 14 (id: 3)
    {
      id: 5,
      BatchNo: "IPH-2025-1009-001",
      Expiry: "2028-12-31",
      Location: "Warehouse A",
      Qty: 4,
      Supplier: "Apple Authorized Dist.",
      Status: <BatchStockStatus status="Low Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("IPH-2025-1009-001", 5),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("IPH-2025-1009-001", 5),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("IPH-2025-1009-001", 5),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("IPH-2025-1009-001", 5),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 3,
    },
    {
      id: 6,
      BatchNo: "IPH-2025-1009-002",
      Expiry: "2029-06-30",
      Location: "Warehouse B",
      Qty: 4,
      Supplier: "Tech Mobile Traders",
      Status: <BatchStockStatus status="Low Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("IPH-2025-1009-002", 6),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("IPH-2025-1009-002", 6),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("IPH-2025-1009-002", 6),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("IPH-2025-1009-002", 6),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 3,
    },

    // Batches for Rice Bag - 50kg (id: 4)
    {
      id: 7,
      BatchNo: "RICE-2025-1009-01",
      Expiry: "2026-02-15",
      Location: "Warehouse Grain-1",
      Qty: 80,
      Supplier: "Agro Supplier",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("RICE-2025-1009-01", 7),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("RICE-2025-1009-01", 7),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("RICE-2025-1009-01", 7),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("RICE-2025-1009-01", 7),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 4,
    },
    {
      id: 8,
      BatchNo: "RICE-2025-1009-02",
      Expiry: "2026-09-10",
      Location: "Warehouse Grain-2",
      Qty: 70,
      Supplier: "Food Supplies Ltd.",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("RICE-2025-1009-02", 8),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("RICE-2025-1009-02", 8),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("RICE-2025-1009-02", 8),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("RICE-2025-1009-02", 8),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 4,
    },

    // Batches for Milk - 1L Pack (id: 5)
    {
      id: 9,
      BatchNo: "MILK-2025-1009-01",
      Expiry: "2025-09-20",
      Location: "Warehouse Dairy-1",
      Qty: 40,
      Supplier: "Dairy Fresh Ltd.",
      Status: <BatchStockStatus status="Expiring Soon" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("MILK-2025-1009-01", 9),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("MILK-2025-1009-01", 9),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("MILK-2025-1009-01", 9),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("MILK-2025-1009-01", 9),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 5,
    },
    {
      id: 10,
      BatchNo: "MILK-2025-1009-02",
      Expiry: "2025-09-25",
      Location: "Warehouse Dairy-2",
      Qty: 35,
      Supplier: "Happy Cows Dairy",
      Status: <BatchStockStatus status="Expiring Soon" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("MILK-2025-1009-02", 10),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("MILK-2025-1009-02", 10),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("MILK-2025-1009-02", 10),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("MILK-2025-1009-02", 10),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 5,
    },

    // Batches for Bread - Whole Wheat (id: 6)
    {
      id: 11,
      BatchNo: "BREAD-2025-1009-01",
      Expiry: "2025-09-14",
      Location: "Warehouse Bakery-1",
      Qty: 50,
      Supplier: "Bakery House",
      Status: <BatchStockStatus status="Expired" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("BREAD-2025-1009-01", 11),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("BREAD-2025-1009-01", 11),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("BREAD-2025-1009-01", 11),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("BREAD-2025-1009-01", 11),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 6,
    },
    {
      id: 12,
      BatchNo: "BREAD-2025-1009-02",
      Expiry: "2025-09-16",
      Location: "Warehouse Bakery-2",
      Qty: 60,
      Supplier: "Golden Bakes",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("BREAD-2025-1009-02", 12),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("BREAD-2025-1009-02", 12),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("BREAD-2025-1009-02", 12),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("BREAD-2025-1009-02", 12),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 6,
    },

    // Batches for Office Chair - Ergonomic (id: 7)
    {
      id: 13,
      BatchNo: "CHAIR-2025-1009-01",
      Expiry: "2030-12-31",
      Location: "Warehouse Furniture-1",
      Qty: 0,
      Supplier: "Office Supplies Ltd.",
      Status: <BatchStockStatus status="Out of Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("CHAIR-2025-1009-01", 13),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("CHAIR-2025-1009-01", 13),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("CHAIR-2025-1009-01", 13),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("CHAIR-2025-1009-01", 13),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 7,
    },
    {
      id: 14,
      BatchNo: "CHAIR-2025-1009-02",
      Expiry: "2031-06-30",
      Location: "Warehouse Furniture-2",
      Qty: 0,
      Supplier: "Furniture Makers Inc.",
      Status: <BatchStockStatus status="Out of Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("CHAIR-2025-1009-02", 14),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("CHAIR-2025-1009-02", 14),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("CHAIR-2025-1009-02", 14),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("CHAIR-2025-1009-02", 14),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 7,
    },

    // Batches for Dining Table - 6 Seater (id: 8)
    {
      id: 15,
      BatchNo: "TABLE-2025-1009-01",
      Expiry: "2032-12-31",
      Location: "Warehouse Furniture-1",
      Qty: 1,
      Supplier: "Home Interiors",
      Status: <BatchStockStatus status="Low Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("TABLE-2025-1009-01", 15),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("TABLE-2025-1009-01", 15),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("TABLE-2025-1009-01", 15),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("TABLE-2025-1009-01", 15),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 8,
    },
    {
      id: 16,
      BatchNo: "TABLE-2025-1009-02",
      Expiry: "2033-05-30",
      Location: "Warehouse Furniture-2",
      Qty: 0,
      Supplier: "Classic Woodworks",
      Status: <BatchStockStatus status="Out of Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("TABLE-2025-1009-02", 16),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("TABLE-2025-1009-02", 16),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("TABLE-2025-1009-02", 16),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("TABLE-2025-1009-02", 16),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 8,
    },

    // Batches for T-Shirt - Cotton (Large) (id: 9)
    {
      id: 17,
      BatchNo: "TSHIRT-2025-1009-01",
      Expiry: "2027-12-31",
      Location: "Warehouse Clothing-1",
      Qty: 30,
      Supplier: "Cotton Textiles Ltd.",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("TSHIRT-2025-1009-01", 17),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("TSHIRT-2025-1009-01", 17),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("TSHIRT-2025-1009-01", 17),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("TSHIRT-2025-1009-01", 17),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 9,
    },
    {
      id: 18,
      BatchNo: "TSHIRT-2025-1009-02",
      Expiry: "2028-06-30",
      Location: "Warehouse Clothing-2",
      Qty: 20,
      Supplier: "Fashion Supplies Inc.",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("TSHIRT-2025-1009-02", 18),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("TSHIRT-2025-1009-02", 18),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("TSHIRT-2025-1009-02", 18),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("TSHIRT-2025-1009-02", 18),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 9,
    },

    // Batches for Jeans - Blue Denim (id: 10)
    {
      id: 19,
      BatchNo: "JEANS-2025-1009-01",
      Expiry: "2029-12-31",
      Location: "Warehouse Clothing-1",
      Qty: 10,
      Supplier: "Denim Traders",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("JEANS-2025-1009-01", 19),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("JEANS-2025-1009-01", 19),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("JEANS-2025-1009-01", 19),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("JEANS-2025-1009-01", 19),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 10,
    },
    {
      id: 20,
      BatchNo: "JEANS-2025-1009-02",
      Expiry: "2030-06-30",
      Location: "Warehouse Clothing-2",
      Qty: 5,
      Supplier: "Blue Denim Co.",
      Status: <BatchStockStatus status="Low Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("JEANS-2025-1009-02", 20),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("JEANS-2025-1009-02", 20),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("JEANS-2025-1009-02", 20),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("JEANS-2025-1009-02", 20),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 10,
    },

    // Batches for Jacket - Winter Coat (id: 11)
    {
      id: 21,
      BatchNo: "JACKET-2025-1009-01",
      Expiry: "2029-12-31",
      Location: "Warehouse Clothing-1",
      Qty: 2,
      Supplier: "Winter Wear Ltd.",
      Status: <BatchStockStatus status="Low Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("JACKET-2025-1009-01", 21),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("JACKET-2025-1009-01", 21),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("JACKET-2025-1009-01", 21),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("JACKET-2025-1009-01", 21),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 11,
    },
    {
      id: 22,
      BatchNo: "JACKET-2025-1009-02",
      Expiry: "2030-05-30",
      Location: "Warehouse Clothing-2",
      Qty: 3,
      Supplier: "Cozy Apparel Co.",
      Status: <BatchStockStatus status="Low Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("JACKET-2025-1009-02", 22),
              icon: PackagePlus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleStockOut("JACKET-2025-1009-02", 22),
              icon: PackageMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleEdit("JACKET-2025-1009-02", 22),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleTransfer("JACKET-2025-1009-02", 22),
              icon: ReplaceAll,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      itemId: 11,
    },
  ];
  //Sample fetch from database
  //Temporary Code
  const filteredData = batchData.filter(
    (Bdata) => Bdata.itemId === parseInt(id)
  );

  return (
    <Layout currentWebPage="Stock by batch">
      <MainWrapper>
        <div
          className={`flex-column h-full m-0 md:block rounded-2xl pb-27 bg-white shadow-md py-5  ${
            isSmallMobile ? `px-1` : `px-5`
          }`}
        >
          {/* Control Section */}
          <ControlLayout>
            {/* Back button */}
            <Link to={"/inventory"}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05, color: "#3c2350" }}
                className="items-center justify-center hidden gap-1 mt-2 font-semibold cursor-pointer sm:flex text-violet-500"
              >
                <Undo2 /> Back
              </motion.button>
            </Link>
            <ButtonLayout>
              <div className="flex justify-between gap-3 w-1/1">
                <div className="flex items-center justify-center align-middle">
                  {/* Page Button */}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
                    whileHover={{ scale: 1.05, backgroundColor: "#3c2350" }}
                    className="flex px-4 py-2 text-sm text-white cursor-pointer bg-violet-400 rounded-3xl"
                  >
                    <Blocks className={"h-5 w-5 "} />
                    Add Stock
                  </motion.button>
                  <ExportButton />
                </div>
              </div>
            </ButtonLayout>
            <Searchbar />
          </ControlLayout>
          {/* Table Section */}
          <MobileTable
            columns={columns}
            data={filteredData}
            setSelectedId={setSelectedID}
          />
          <Table
            columns={columns}
            data={filteredData}
            setSelectedId={setSelectedID}
          />
        </div>
      </MainWrapper>

      {/* Batch Contol */}
      <BatchControl
        Count={selectedID.length}
        openBatchContol={openBatchContol}
        Buttons={BatchControlBtn}
      />
    </Layout>
  );
}
