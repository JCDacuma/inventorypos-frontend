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
import { ProductStatus } from "../components/Status.jsx";
import { Action } from "../components/buttons.jsx";

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

  //Sample columns
  const columns = [
    { key: "Select", label: "" },
    { key: "product", label: "Product" },
    { key: "category", label: "Category" },
    { key: "unit", label: "Price" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  // Sample fetch from database
  const data = [
    {
      id: 1,
      product: "Laptop - Dell Inspiron 15",
      category: "Electronics",
      unit: "₱6000",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Laptop - Dell Inspiron 15", 1),
              icon: SquarePen,
            },
            {
              onClick: () => HandleRemove("Laptop - Dell Inspiron 15", 1),
              icon: Trash2,
            },
          ]}
        />
      ),
    },
    {
      id: 2,
      product: "Wireless Mouse - Logitech M185",
      category: "Electronics",
      unit: "₱900",
      status: <ProductStatus status="Inactive" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Wireless Mouse - Logitech M185", 2),
              icon: SquarePen,
            },
            {
              onClick: () => HandleRemove("Wireless Mouse - Logitech M185", 2),
              icon: Trash2,
            },
          ]}
        />
      ),
    },
    {
      id: 3,
      product: "Smartphone - iPhone 14",
      category: "Electronics",
      unit: "₱65000",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Smartphone - iPhone 14", 3),
              icon: SquarePen,
            },
            {
              onClick: () => HandleRemove("Smartphone - iPhone 14", 3),
              icon: Trash2,
            },
          ]}
        />
      ),
    },
    {
      id: 4,
      product: "Rice - 5kg Bag",
      category: "Grocery",
      unit: "₱500",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Rice - 5kg Bag", 4),
              icon: SquarePen,
            },
            {
              onClick: () => HandleRemove("Rice - 5kg Bag", 4),
              icon: Trash2,
            },
          ]}
        />
      ),
    },
    {
      id: 5,
      product: "Cooking Oil - 1L Bottle",
      category: "Grocery",
      unit: "₱120",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Cooking Oil - 1L Bottle", 5),
              icon: SquarePen,
            },
            {
              onClick: () => HandleRemove("Cooking Oil - 1L Bottle", 5),
              icon: Trash2,
            },
          ]}
        />
      ),
    },
    {
      id: 6,
      product: "Bananas (1kg)",
      category: "Grocery",
      unit: "₱120",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Bananas (1kg)", 6),
              icon: SquarePen,
            },
            {
              onClick: () => HandleRemove("Bananas (1kg)", 6),
              icon: Trash2,
            },
          ]}
        />
      ),
    },
    {
      id: 7,
      product: "Office Chair - Ergonomic",
      category: "Furniture",
      unit: "₱1500",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Office Chair - Ergonomic", 7),
              icon: SquarePen,
            },
            {
              onClick: () => HandleRemove("Office Chair - Ergonomic", 7),
              icon: Trash2,
            },
          ]}
        />
      ),
    },
    {
      id: 8,
      product: "Dining Table - 6 Seater",
      category: "Furniture",
      unit: "₱4500",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Dining Table - 6 Seater", 8),
              icon: SquarePen,
            },
            {
              onClick: () => HandleRemove("Dining Table - 6 Seater", 8),
              icon: Trash2,
            },
          ]}
        />
      ),
    },
    {
      id: 9,
      product: "T-Shirt - Cotton (Large)",
      category: "Clothing",
      unit: "₱220",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("T-Shirt - Cotton (Large)", 9),
              icon: SquarePen,
            },
            {
              onClick: () => HandleRemove("T-Shirt - Cotton (Large)", 9),
              icon: Trash2,
            },
          ]}
        />
      ),
    },
    {
      id: 10,
      product: "Jeans - Blue Denim",
      category: "Clothing",
      unit: "₱345",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Jeans - Blue Denim", 10),
              icon: SquarePen,
            },
            {
              onClick: () => HandleRemove("Jeans - Blue Denim", 10),
              icon: Trash2,
            },
          ]}
        />
      ),
    },
    {
      id: 11,
      product: "Jacket - Winter Coat",
      category: "Clothing",
      unit: "₱590",
      status: <ProductStatus status="Active" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Jacket - Winter Coat", 11),
              icon: SquarePen,
            },
            {
              onClick: () => HandleRemove("Jacket - Winter Coat", 11),
              icon: Trash2,
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
              <div className="flex gap-3 justify-between w-1/1">
                <div className="flex justify-center align-middle items-center">
                  <Link to={"/promo-management"}>
                    <motion.button
                      whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
                      whileHover={{ scale: 1.05, backgroundColor: "#3c2350" }}
                      className="bg-violet-400 text-white flex text-sm py-2 px-4 rounded-3xl cursor-pointer"
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
