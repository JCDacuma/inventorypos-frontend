import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import NavControl from "@/components/Layouts/pageControlsMobile.jsx";
// Page Layout component
import { Layout } from "@/components/Layouts/Layout.jsx";

//Table Layout component
import TableHeader from "@/components/Layouts/tableHeader.jsx";
import Table from "@/components/Layouts/table.jsx";
import MobileTable from "@/components/ui/MobileTable.jsx";
import { InventoryStatus } from "@/modules/inventory/components/ui/inventoryStatus.jsx";
import { Action } from "@/components/ui/buttons.jsx";

//Icons
import {
  PackagePlus,
  PackageMinus,
  PackageOpen,
  ReplaceAll,
} from "lucide-react";

import { InventoryFetch } from "@/modules/inventory/api/inventoryApi.jsx";

//Functionality Action buttons
export default function Inventory() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);
  const [pageControl, setPageControl] = useState(false); //Page control mobile state modal
  const [products, setProducts] = useState(null);
  /* =========================== Fetching Table Data  ============================ */

  //functionality fetch
  const handleFetchProducts = useCallback(async () => {
    await InventoryFetch(setProducts);
  }, [setProducts]);

  //trigger fetch
  useEffect(() => {
    handleFetchProducts();
  }, [handleFetchProducts]);

  /* ================================ Table Data  ================================= */
  //Page Controls
  const PageBtnControls = [
    {
      BtnLabel: "Stock In",
      iconControl: PackagePlus,
      to: "/product-add/register",
    },
    {
      BtnLabel: "Stock Out",
      iconControl: PackageMinus,
      to: "/product-add/registers",
    },
    {
      BtnLabel: "Transfer",
      iconControl: ReplaceAll,
      to: "/product-add/registersss",
    },
  ];

  //Sample column
  const columns = [
    { key: "code", label: "Code" },
    { key: "item", label: "Item" },
    { key: "category", label: "Category" },
    { key: "currentStock", label: "Current Stock" },
    { key: "unit", label: "Unit" },
    { key: "minStock", label: "Reorder Level " },
    { key: "movement", label: "Last Movement " },
    { key: "status", label: "Status" },
    { key: "Action", label: "Action" },
  ];

  // fetched data mapping
  const data = useMemo(() => {
    if (products === null) {
      return null;
    } else if (Array.isArray(products) && products.length > 0) {
      return products.map((product) => ({
        id: product.id,
        item: product.name,
        code: product.code,
        category: product.category,
        currentStock: product.totalQuantity,
        unit: product.unit,
        minStock: product.reorder,
        movement: product.lastMovement,
        status: (
          <InventoryStatus
            status={product.totalQuantity}
            reorderLevel={product.reorder}
          />
        ),
        Action: (
          <Action
            buttons={[
              {
                to: "/batch-inventory/1",
                icon: PackageOpen,
                iconSize: `h-[1.2rem] w-[1.2rem]`,
                tooltip: `Open stocks`,
              },
            ]}
          />
        ),
      }));
    } else if (products === false) {
      return false;
    } else {
      return false;
    }
  }, [products]);

  /* ================================ Rendering Display  ================================= */
  return (
    <Layout currentWebPage="Inventory">
      <div className="relative flex flex-col w-full px-5 pt-20 overflow-auto">
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

      {/* Page Controls (Mobile Layout only) */}
      <NavControl
        onClosed={() => setPageControl(false)}
        isOpen={pageControl}
        hasExport
      />
    </Layout>
  );
}
