import { useState } from "react";
import { Link } from "react-router-dom";
import NavControl from "@/components/Layouts/pageControlsMobile.jsx";
// Page Layout component
import {
  Layout,
  MainWrapper,
  ControlLayout,
} from "../../../components/Layouts/Layout.jsx";
import ButtonLayout from "@/components/Layouts/pageControlButtons.jsx";
import { useMediaQuery } from "react-responsive";
import { ExportButton } from "../../../components/ui/buttons.jsx";
import Searchbar from "../../../components/ui/Searchbar.jsx";
import BatchControl from "../../../components/Layouts/BatchControl.jsx";

//Table Layout component
import Table from "../../../components/ui/Table.jsx";
import MobileTable from "../../../components/ui/MobileTable.jsx";
import { InventoryStatus } from "../../../components/ui/Status.jsx";
import { Action } from "../../../components/ui/buttons.jsx";

//Icons
import {
  SquarePen,
  PackagePlus,
  PackageMinus,
  PackageOpen,
  Trash2,
} from "lucide-react";

//Functionality Action buttons
export default function Inventory() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);
  const openBatchContol = selectedID.length > 0; //Batch Contol Modal State
  const [pageControl, setPageControl] = useState(false);

  const isSmallMobile = useMediaQuery({ maxWidth: 375 });

  //Action Table functionality
  const HandleStockIn = (items, id) => {
    alert(`addStock ${items} ${id}`);
  };

  //view
  const HandleStockOut = (items, id) => {
    alert(`RemoveStock ${items}`);
  };

  //view
  const HandleEditAction = (items, id) => {
    alert(`Edit ${items}`);
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
    { key: "item", label: "Item" },
    { key: "sku", label: "SKU" },
    { key: "Category", label: "Category" },
    { key: "CurrentStock", label: "Stock " },
    { key: "Unit", label: "Unit" },
    { key: "MinStock", label: "Minimum " },
    { key: "Movement", label: "Movement " },
    { key: "Status", label: "Status" },
    { key: "Action", label: "Action" },
  ];

  // Sample fetch from database
  const data = [
    {
      id: 1,
      item: "Laptop - Dell Inspiron 15",
      sku: "DL-INS-15-001",
      Category: "Electronics",
      CurrentStock: 12,
      Unit: "pcs",
      MinStock: 5,
      Movement: "2025-08-28",
      Status: <InventoryStatus status="In Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("Laptop - Dell Inspiron 15", 1),
              icon: PackagePlus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleStockOut("Laptop - Dell Inspiron 15", 1),
              icon: PackageMinus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleEditAction("Laptop - Dell Inspiron 15", 1),
              icon: SquarePen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              to: "/batch-inventory/1",
              icon: PackageOpen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
    {
      id: 2,
      item: "Wireless Mouse - Logitech M185",
      sku: "LG-M185-002",
      Category: "Electronics",
      CurrentStock: 45,
      Unit: "pcs",
      MinStock: 20,
      Movement: "2025-08-30",
      Status: <InventoryStatus status="In Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("Wireless Mouse - Logitech M185", 2),
              icon: PackagePlus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () =>
                HandleStockOut("Wireless Mouse - Logitech M185", 2),
              icon: PackageMinus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () =>
                HandleEditAction("Wireless Mouse - Logitech M185", 2),
              icon: SquarePen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              to: "/batch-inventory/2",
              icon: PackageOpen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
    {
      id: 3,
      item: "Smartphone - iPhone 14",
      sku: "AP-IP14-006",
      Category: "Electronics",
      CurrentStock: 8,
      Unit: "pcs",
      MinStock: 5,
      Movement: "2025-08-31",
      Status: <InventoryStatus status="In Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("Smartphone - iPhone 14", 3),
              icon: PackagePlus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleStockOut("Smartphone - iPhone 14", 3),
              icon: PackageMinus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleEditAction("Smartphone - iPhone 14", 3),
              icon: SquarePen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              to: "/batch-inventory/3",
              icon: PackageOpen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
    {
      id: 4,
      item: "Rice - 5kg Bag",
      sku: "GR-RICE-5KG",
      Category: "Grocery",
      CurrentStock: 120,
      Unit: "kg",
      MinStock: 50,
      Movement: "2025-08-30",
      Status: <InventoryStatus status="In Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("Rice - 5kg Bag", 4),
              icon: PackagePlus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleStockOut("Rice - 5kg Bag", 4),
              icon: PackageMinus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleEditAction("Rice - 5kg Bag", 4),
              icon: SquarePen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              to: "/batch-inventory/4",
              icon: PackageOpen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
    {
      id: 5,
      item: "Cooking Oil - 1L Bottle",
      sku: "GR-OIL-1L",
      Category: "Grocery",
      CurrentStock: 80,
      Unit: "liters",
      MinStock: 30,
      Movement: "2025-08-29",
      Status: <InventoryStatus status="In Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("Cooking Oil - 1L Bottle", 5),
              icon: PackagePlus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleStockOut("Cooking Oil - 1L Bottle", 5),
              icon: PackageMinus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleEditAction("Cooking Oil - 1L Bottle", 5),
              icon: SquarePen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              to: "/batch-inventory/5",
              icon: PackageOpen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
    {
      id: 6,
      item: "Bananas",
      sku: "GR-BANANA-001",
      Category: "Grocery",
      CurrentStock: 200,
      Unit: "kg",
      MinStock: 100,
      Movement: "2025-08-31",
      Status: <InventoryStatus status="In Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("Bananas", 6),
              icon: PackagePlus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleStockOut("Bananas", 6),
              icon: PackageMinus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleEditAction("Bananas", 6),
              icon: SquarePen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              to: "/batch-inventory/6",
              icon: PackageOpen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
    {
      id: 7,
      item: "Office Chair - Ergonomic",
      sku: "CH-ERGO-010",
      Category: "Furniture",
      CurrentStock: 0,
      Unit: "pcs",
      MinStock: 2,
      Movement: "2025-08-27",
      Status: <InventoryStatus status="Out of Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("Office Chair - Ergonomic", 7),
              icon: PackagePlus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleStockOut("Office Chair - Ergonomic", 7),
              icon: PackageMinus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleEditAction("Office Chair - Ergonomic", 7),
              icon: SquarePen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              to: "/batch-inventory/7",
              icon: PackageOpen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
    {
      id: 8,
      item: "Dining Table - 6 Seater",
      sku: "TB-DINE-006",
      Category: "Furniture",
      CurrentStock: 1,
      Unit: "pcs",
      MinStock: 2,
      Movement: "2025-08-25",
      Status: <InventoryStatus status="Low Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("Dining Table - 6 Seater", 8),
              icon: PackagePlus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleStockOut("Dining Table - 6 Seater", 8),
              icon: PackageMinus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleEditAction("Dining Table - 6 Seater", 8),
              icon: SquarePen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              to: "/batch-inventory/8",
              icon: PackageOpen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
    {
      id: 9,
      item: "T-Shirt - Cotton (Large)",
      sku: "CL-TSHIRT-L",
      Category: "Clothing",
      CurrentStock: 50,
      Unit: "pcs",
      MinStock: 20,
      Movement: "2025-08-29",
      Status: <InventoryStatus status="In Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("T-Shirt - Cotton (Large)", 9),
              icon: PackagePlus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleStockOut("T-Shirt - Cotton (Large)", 9),
              icon: PackageMinus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleEditAction("T-Shirt - Cotton (Large)", 9),
              icon: SquarePen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              to: "/batch-inventory/9",
              icon: PackageOpen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
    {
      id: 10,
      item: "Jeans - Blue Denim",
      sku: "CL-JEANS-32",
      Category: "Clothing",
      CurrentStock: 15,
      Unit: "pcs",
      MinStock: 10,
      Movement: "2025-08-28",
      Status: <InventoryStatus status="In Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("Jeans - Blue Denim", 10),
              icon: PackagePlus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleStockOut("Jeans - Blue Denim", 10),
              icon: PackageMinus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleEditAction("Jeans - Blue Denim", 10),
              icon: SquarePen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              to: "/batch-inventory/10",
              icon: PackageOpen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
    {
      id: 11,
      item: "Jacket - Winter Coat",
      sku: "CL-JACKET-WT",
      Category: "Clothing",
      CurrentStock: 5,
      Unit: "pcs",
      MinStock: 8,
      Movement: "2025-08-27",
      Status: <InventoryStatus status="Low Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("Jacket - Winter Coat", 11),
              icon: PackagePlus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleStockOut("Jacket - Winter Coat", 11),
              icon: PackageMinus,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleEditAction("Jacket - Winter Coat", 11),
              icon: SquarePen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              to: "/batch-inventory/11",
              icon: PackageOpen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
  ];

  const EditBatch = () => {
    alert("clicked edit batch");
  };
  return (
    <Layout currentWebPage="Inventory">
      <MainWrapper>
        <div
          className={` relative flex-column h-full m-0 md:block rounded-2xl pb-27 bg-white shadow-md py-5  ${
            isSmallMobile ? `px-1` : `px-5`
          }`}
        >
          {/* Control Section */}
          <ControlLayout>
            <ButtonLayout hasExport={true} />
            <Searchbar />
          </ControlLayout>

          {/* Table Section */}
          <MobileTable
            columns={columns}
            data={data}
            setSelectedId={setSelectedID}
          />
          <Table columns={columns} data={data} setSelectedId={setSelectedID} />
        </div>
      </MainWrapper>

      {/* Batch Contol */}
      <BatchControl
        Count={selectedID.length}
        openBatchContol={openBatchContol}
        Buttons={BatchControlBtn}
      />
      {/* Page Controls (Mobile Layout only) */}
      <NavControl onClosed={() => setPageControl(false)} isOpen={pageControl} />
    </Layout>
  );
}
