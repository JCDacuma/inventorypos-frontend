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
import { ProductStatus } from "@/components/ui/Status.jsx";
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
    {
      id: 2,
      product: "Wireless Mouse - Logitech M185",
      category: "Electronics",
      price: "₱900",
      status: <ProductStatus status="Inactive" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Wireless Mouse - Logitech M185", 2),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleRemove("Wireless Mouse - Logitech M185", 2),
              icon: Trash2,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 3,
      product: "Smartphone - iPhone 14",
      category: "Electronics",
      price: "₱65000",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Smartphone - iPhone 14", 3),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleRemove("Smartphone - iPhone 14", 3),
              icon: Trash2,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 4,
      product: "Rice - 5kg Bag",
      category: "Grocery",
      price: "₱500",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Rice - 5kg Bag", 4),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleRemove("Rice - 5kg Bag", 4),
              icon: Trash2,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 5,
      product: "Cooking Oil - 1L Bottle",
      category: "Grocery",
      price: "₱120",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Cooking Oil - 1L Bottle", 5),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleRemove("Cooking Oil - 1L Bottle", 5),
              icon: Trash2,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 6,
      product: "Bananas (1kg)",
      category: "Grocery",
      price: "₱120",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Bananas (1kg)", 6),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleRemove("Bananas (1kg)", 6),
              icon: Trash2,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 7,
      product: "Office Chair - Ergonomic",
      category: "Furniture",
      price: "₱1500",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Office Chair - Ergonomic", 7),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleRemove("Office Chair - Ergonomic", 7),
              icon: Trash2,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 8,
      product: "Dining Table - 6 Seater",
      category: "Furniture",
      price: "₱4500",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Dining Table - 6 Seater", 8),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleRemove("Dining Table - 6 Seater", 8),
              icon: Trash2,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 9,
      product: "T-Shirt - Cotton (Large)",
      category: "Clothing",
      price: "₱220",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("T-Shirt - Cotton (Large)", 9),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleRemove("T-Shirt - Cotton (Large)", 9),
              icon: Trash2,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 10,
      product: "Jeans - Blue Denim",
      category: "Clothing",
      price: "₱345",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Jeans - Blue Denim", 10),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleRemove("Jeans - Blue Denim", 10),
              icon: Trash2,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 11,
      product: "Jacket - Winter Coat",
      category: "Clothing",
      price: "₱590",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Jacket - Winter Coat", 11),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleRemove("Jacket - Winter Coat", 11),
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
            setSelectedId={setSelectedID}
          />
        </div>
        <div className="hidden md:block">
          <Table columns={columns} data={data} setSelectedId={setSelectedID} />
        </div>
      </div>

      {/* Batch Contol */}
      <BatchControl
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
