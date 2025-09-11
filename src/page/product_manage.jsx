import { useState } from "react";
import { Link } from "react-router-dom";

// Page Layout component
import {
  Layout,
  MainWrapper,
  ButtonLayout,
  ControlLayout,
} from "../components/Layout";
import { useMediaQuery } from "react-responsive";
import ExportButton from "../components/export_buttons";
import Searchbar from "../components/Searchbar.jsx";
import BatchControl from "../components/ModalContol.jsx";

//Table Layout component
import Table from "../components/Table";
import MobileTable from "../components/MobileTable";

//Animation
import { motion, AnimatePresence } from "framer-motion";

export default function ProductManagement() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);
  const openBatchContol = selectedID.length > 0; //Batch Contol Modal State

  const isSmallMobile = useMediaQuery({ maxWidth: 375 });

  const Action = () => <div></div>;
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
      unit: "$1200",
      status: "",
      action: "",
    },
    {
      id: 2,
      product: "Wireless Mouse - Logitech M185",
      category: "Electronics",
      unit: "$25",
      status: "",
      action: "",
    },
    {
      id: 3,
      product: "Smartphone - iPhone 14",
      category: "Electronics",
      unit: "$999",
      status: "",
      action: "",
    },
    {
      id: 4,
      product: "Rice - 5kg Bag",
      category: "Grocery",
      unit: "$15",
      status: "",
      action: "",
    },
    {
      id: 5,
      product: "Cooking Oil - 1L Bottle",
      category: "Grocery",
      unit: "$4",
      status: "",
      action: "",
    },
    {
      id: 6,
      product: "Bananas (1kg)",
      category: "Grocery",
      unit: "$2",
      status: "",
      action: "",
    },
    {
      id: 7,
      product: "Office Chair - Ergonomic",
      category: "Furniture",
      unit: "$150",
      status: "",
      action: "",
    },
    {
      id: 8,
      product: "Dining Table - 6 Seater",
      category: "Furniture",
      unit: "$450",
      status: "",
      action: "",
    },
    {
      id: 9,
      product: "T-Shirt - Cotton (Large)",
      category: "Clothing",
      unit: "$20",
      status: "",
      action: "",
    },
    {
      id: 10,
      product: "Jeans - Blue Denim",
      category: "Clothing",
      unit: "$45",
      status: "",
      action: "",
    },
    {
      id: 11,
      product: "Jacket - Winter Coat",
      category: "Clothing",
      unit: "$90",
      status: "",
      action: "",
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
