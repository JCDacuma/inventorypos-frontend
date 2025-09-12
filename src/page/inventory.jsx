import { useState } from "react";
import { Link } from "react-router-dom";

// Page Layout component
import {
  Layout,
  MainWrapper,
  ButtonLayout,
  ControlLayout,
} from "../Layouts/Layout";
import { useMediaQuery } from "react-responsive";
import { ExportButton } from "../components/buttons.jsx";
import Searchbar from "../components/Searchbar.jsx";
import { BatchControl } from "../Layouts/ModalContol.jsx";

//Table Layout component
import Table from "../components/Table";
import MobileTable from "../components/MobileTable";
import { InventoryStatus } from "../components/Status.jsx";
import { Action } from "../components/buttons.jsx";

//Animation
import { motion, AnimatePresence } from "framer-motion";

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
            },
            {
              onClick: () => HandleStockOut("Laptop - Dell Inspiron 15", 1),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEditAction("Laptop - Dell Inspiron 15", 1),
              icon: SquarePen,
            },
            { to: "/batch-inventory/1", icon: PackageOpen },
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
            },
            {
              onClick: () =>
                HandleStockOut("Wireless Mouse - Logitech M185", 2),
              icon: PackageMinus,
            },
            {
              onClick: () =>
                HandleEditAction("Wireless Mouse - Logitech M185", 2),
              icon: SquarePen,
            },
            { to: "/batch-inventory/2", icon: PackageOpen },
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
            },
            {
              onClick: () => HandleStockOut("Smartphone - iPhone 14", 3),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEditAction("Smartphone - iPhone 14", 3),
              icon: SquarePen,
            },
            { to: "/batch-inventory/3", icon: PackageOpen },
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
            },
            {
              onClick: () => HandleStockOut("Rice - 5kg Bag", 4),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEditAction("Rice - 5kg Bag", 4),
              icon: SquarePen,
            },
            { to: "/batch-inventory/4", icon: PackageOpen },
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
            },
            {
              onClick: () => HandleStockOut("Cooking Oil - 1L Bottle", 5),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEditAction("Cooking Oil - 1L Bottle", 5),
              icon: SquarePen,
            },
            { to: "/batch-inventory/5", icon: PackageOpen },
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
            { onClick: () => HandleStockIn("Bananas", 6), icon: PackagePlus },
            { onClick: () => HandleStockOut("Bananas", 6), icon: PackageMinus },
            { onClick: () => HandleEditAction("Bananas", 6), icon: SquarePen },
            { to: "/batch-inventory/6", icon: PackageOpen },
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
            },
            {
              onClick: () => HandleStockOut("Office Chair - Ergonomic", 7),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEditAction("Office Chair - Ergonomic", 7),
              icon: SquarePen,
            },
            { to: "/batch-inventory/7", icon: PackageOpen },
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
            },
            {
              onClick: () => HandleStockOut("Dining Table - 6 Seater", 8),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEditAction("Dining Table - 6 Seater", 8),
              icon: SquarePen,
            },
            { to: "/batch-inventory/8", icon: PackageOpen },
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
            },
            {
              onClick: () => HandleStockOut("T-Shirt - Cotton (Large)", 9),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEditAction("T-Shirt - Cotton (Large)", 9),
              icon: SquarePen,
            },
            { to: "/batch-inventory/9", icon: PackageOpen },
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
            },
            {
              onClick: () => HandleStockOut("Jeans - Blue Denim", 10),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEditAction("Jeans - Blue Denim", 10),
              icon: SquarePen,
            },
            { to: "/batch-inventory/10", icon: PackageOpen },
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
            },
            {
              onClick: () => HandleStockOut("Jacket - Winter Coat", 11),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEditAction("Jacket - Winter Coat", 11),
              icon: SquarePen,
            },
            { to: "/batch-inventory/11", icon: PackageOpen },
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
            <ButtonLayout>
              <div className="flex gap-3 justify-between w-1/1">
                <div className="flex justify-center align-middle items-center"></div>
                {/* Exportation button */}
                <ExportButton />
              </div>
            </ButtonLayout>
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
      <AnimatePresence>
        {openBatchContol ? (
          <BatchControl Count={selectedID.length}>
            <button
              className={`bg-violet-500 flex gap-1 text-white py-2 px-6 rounded-2xl cursor-pointer shadow-md shadow-gray-500 ${
                isSmallMobile ? `text-sm` : `text-md`
              }`}
            >
              <SquarePen
                className={` ${isSmallMobile ? `h-5 w-5` : `h-6 w-6`} `}
              />
              Edit
            </button>
            <button
              className={`bg-[#910B0B]/[0.69] flex gap-1 text-white   py-2 px-4 rounded-2xl cursor-pointer shadow-md shadow-gray-500 ${
                isSmallMobile ? `text-sm` : `text-md`
              }`}
            >
              <Trash2
                className={` ${isSmallMobile ? `h-5 w-5` : `h-6 w-6`} `}
              />
              Remove
            </button>
          </BatchControl>
        ) : (
          ""
        )}
      </AnimatePresence>
    </Layout>
  );
}
