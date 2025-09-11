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

//Icons
import { SquarePen, Trash2, Megaphone } from "lucide-react";

export default function ProductManagement() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);
  const openBatchContol = selectedID.length > 0; //Batch Contol Modal State

  const isSmallMobile = useMediaQuery({ maxWidth: 375 });

  //Status State
  const Action = ({ items, id }) => (
    <div className="flex justify-center items-center gap-4">
      <motion.button
        onClick={() => HandleEditAction(items, id)}
        animate={{ scale: [1, 1.07, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="group bg-gray-200 p-2 shadow-lg rounded-[0.3rem] cursor-pointer hover:bg-gray-400"
      >
        <SquarePen className="text-violet-500 h-[1rem] w-[1rem] stroke-[0.15rem] group-hover:text-violet-800 cursor-pointer" />
      </motion.button>

      <motion.button
        onClick={() => HandleEditAction(items, id)}
        animate={{ scale: [1, 1.07, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="group bg-gray-200 p-2 shadow-lg rounded-[0.3rem] cursor-pointer hover:bg-gray-400"
      >
        <Trash2 className="text-violet-500 h-[1rem] w-[1rem] stroke-[0.15rem] group-hover:text-violet-800 cursor-pointer" />
      </motion.button>
    </div>
  );

  const StatusState = ({ status }) => {
    switch (status) {
      case "Active":
        return (
          <div className="flex justify-center items-center gap-1">
            <p>Active</p>
            <div className="w-2 h-2 rounded-4xl bg-green-600 mb-2"></div>
          </div>
        );
      case "Inactive":
        return (
          <div className="flex justify-center items-center gap-1">
            <p>Inactive</p>
            <div className="w-2 h-2 rounded-4xl bg-red-600 mb-2"></div>
          </div>
        );
      default:
        <p></p>;
    }
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
      status: <StatusState status="Active" />,
      action: <Action items="Laptop - Dell Inspiron 15" id={1} />,
    },
    {
      id: 2,
      product: "Wireless Mouse - Logitech M185",
      category: "Electronics",
      unit: "₱900",
      status: <StatusState status="Inactive" />,
      action: <Action items="Wireless Mouse - Logitech M185" id={2} />,
    },
    {
      id: 3,
      product: "Smartphone - iPhone 14",
      category: "Electronics",
      unit: "₱65000",
      status: <StatusState status="Active" />,
      action: <Action items="Smartphone - iPhone 14" id={3} />,
    },
    {
      id: 4,
      product: "Rice - 5kg Bag",
      category: "Grocery",
      unit: "₱500",
      status: <StatusState status="Active" />,
      action: <Action items="Rice - 5kg Bag" id={4} />,
    },
    {
      id: 5,
      product: "Cooking Oil - 1L Bottle",
      category: "Grocery",
      unit: "₱120",
      status: <StatusState status="Active" />,
      action: <Action items="Cooking Oil - 1L Bottle" id={5} />,
    },
    {
      id: 6,
      product: "Bananas (1kg)",
      category: "Grocery",
      unit: "₱120",
      status: <StatusState status="Active" />,
      action: <Action items="Bananas (1kg)" id={6} />,
    },
    {
      id: 7,
      product: "Office Chair - Ergonomic",
      category: "Furniture",
      unit: "₱1500",
      status: <StatusState status="Active" />,
      action: <Action items="Office Chair - Ergonomic" id={7} />,
    },
    {
      id: 8,
      product: "Dining Table - 6 Seater",
      category: "Furniture",
      unit: "₱4500",
      status: <StatusState status="Active" />,
      action: <Action items="Dining Table - 6 Seater" id={8} />,
    },
    {
      id: 9,
      product: "T-Shirt - Cotton (Large)",
      category: "Clothing",
      unit: "₱220",
      status: <StatusState status="Active" />,
      action: <Action items="T-Shirt - Cotton (Large)" id={9} />,
    },
    {
      id: 10,
      product: "Jeans - Blue Denim",
      category: "Clothing",
      unit: "₱345",
      status: <StatusState status="Active" />,
      action: <Action items="Jeans - Blue Denim" id={10} />,
    },
    {
      id: 11,
      product: "Jacket - Winter Coat",
      category: "Clothing",
      unit: "₱590",
      status: <StatusState status="Active" />,
      action: <Action items="Jacket - Winter Coat" id={11} />,
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
