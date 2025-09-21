import { useState } from "react";
import { Link } from "react-router-dom";

// Page Layout component
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
import { ProductStatus } from "../../../components/ui/Status.jsx";
import { Action } from "../../../components/ui/buttons.jsx";

//Animation
import { motion, AnimatePresence } from "framer-motion";

//Icons
import { SquarePen, Trash2, Megaphone } from "lucide-react";

export default function ProductManagement() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);
  const openBatchContol = selectedID.length > 0; //Batch Contol Modal State

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
    <Layout currentWebPage="Product Management">
      <MainWrapper>
        <div
          className={` relative flex-column h-full m-0 md:block rounded-2xl pb-27 bg-white shadow-md py-5  ${
            isSmallMobile ? `px-1` : `px-5`
          }`}
        >
          {/* Control Section */}
          <ControlLayout>
            <ButtonLayout>
              <div className="flex justify-between gap-3 w-1/1">
                <div className="flex items-center justify-center align-middle">
                  <Link to={"/promo-management"}>
                    <motion.button
                      whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
                      whileHover={{ scale: 1.05, backgroundColor: "#3c2350" }}
                      className="flex px-4 py-2 text-sm text-white cursor-pointer bg-violet-400 rounded-3xl"
                    >
                      <Megaphone className={"h-5 w-5 mr-1"} />
                      Product Promo
                    </motion.button>
                  </Link>
                </div>
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
      <BatchControl
        Count={selectedID.length}
        Buttons={BatchControlBtn}
        openBatchContol={openBatchContol}
      />
    </Layout>
  );
}
