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

//Table Layout component
import Table from "../components/Table";
import MobileTable from "../components/MobileTable";

//Animation
import { motion } from "framer-motion";

//Icons
import {
  SquarePen,
  PackagePlus,
  PackageMinus,
  PackageOpen,
  Undo2,
} from "lucide-react";

//Functionality Action buttons
export default function Inventory() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);
  console.log(selectedID);
  const Actions = ({ items, id }) => (
    <div className="flex justify-center items-center gap-4 ">
      <motion.button
        onClick={() => HandleStockIn(items, id)}
        animate={{ scale: [1, 1.07, 1] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="group bg-gray-200 p-2 shadow-lg rounded-[0.3rem] cursor-pointer hover:bg-gray-400"
      >
        <PackagePlus className="text-violet-500 h-5 w-5 stroke-[0.15rem] group-hover:text-violet-800 cursor-pointer" />
      </motion.button>

      <motion.button
        onClick={() => HandleStockOut(items, id)}
        animate={{ scale: [1, 1.07, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="group bg-gray-200 p-2 shadow-lg rounded-[0.3rem] cursor-pointer hover:bg-gray-400"
      >
        <PackageMinus className="text-violet-500 h-5 w-5 stroke-[0.15rem] group-hover:text-violet-800 cursor-pointer" />
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
        <SquarePen className="text-violet-500 h-5 w-5 stroke-[0.15rem] group-hover:text-violet-800 cursor-pointer" />
      </motion.button>
      <Link to={`/batch_inventory/${id}`}>
        <motion.button
          animate={{ scale: [1, 1.07, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="group bg-gray-200 p-2 shadow-lg rounded-[0.3rem] cursor-pointer hover:bg-gray-400"
        >
          <PackageOpen className="text-violet-500 h-5 w-5 stroke-[0.15rem] group-hover:text-violet-800 cursor-pointer" />
        </motion.button>
      </Link>
    </div>
  );

  //view
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

  //For Status
  const StatusDisplay = ({ status }) => {
    switch (status) {
      case "In Stock":
        return (
          <div className="flex justify-center items-center gap-1">
            <p>In Stock</p>
            <div className="h-2 w-2 rounded-4xl bg-green-600 mb-2"></div>
          </div>
        );
      case "Low Stock":
        return (
          <div className="flex justify-center items-center gap-1">
            <p>Low Stock</p>
            <div className="h-2 w-2 rounded-4xl bg-amber-500 mb-2"></div>
          </div>
        );
      case "Out of Stock":
        return (
          <div className="flex justify-center items-center gap-1">
            <p>Out of Stock</p>
            <div className="h-2 w-2 rounded-4xl bg-red-500 mb-2"></div>
          </div>
        );
      default:
        return <p></p>;
    }
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

  //Sample fetch from database
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
      Status: <StatusDisplay status="In Stock" />,
      Action: <Actions items="Laptop - Dell Inspiron 15" id={1} />,
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
      Status: <StatusDisplay status="In Stock" />,
      Action: <Actions items="Wireless Mouse - Logitech M185" id={2} />,
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
      Status: <StatusDisplay status="In Stock" />,
      Action: <Actions items="Smartphone - iPhone 14" id={3} />,
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
      Status: <StatusDisplay status="In Stock" />,
      Action: <Actions items="Rice - 5kg Bag" id={4} />,
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
      Status: <StatusDisplay status="In Stock" />,
      Action: <Actions items="Cooking Oil - 1L Bottle" id={5} />,
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
      Status: <StatusDisplay status="In Stock" />,
      Action: <Actions items="Bananas" id={6} />,
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
      Status: <StatusDisplay status="Out of Stock" />,
      Action: <Actions items="Office Chair - Ergonomic" id={7} />,
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
      Status: <StatusDisplay status="Low Stock" />,
      Action: <Actions items="Dining Table - 6 Seater" id={8} />,
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
      Status: <StatusDisplay status="In Stock" />,
      Action: <Actions items="T-Shirt - Cotton (Large)" id={9} />,
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
      Status: <StatusDisplay status="In Stock" />,
      Action: <Actions items="Jeans - Blue Denim" id={10} />,
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
      Status: <StatusDisplay status="Low Stock" />,
      Action: <Actions items="Jacket - Winter Coat" id={11} />,
    },
  ];

  const isSmallMobile = useMediaQuery({ maxWidth: 375 });

  return (
    <Layout currentWebPage="Inventory">
      <MainWrapper>
        <div
          className={`flex-column h-full m-0 md:block rounded-2xl pb-27 bg-white shadow-md py-5  ${
            isSmallMobile ? `px-1` : `px-5`
          }`}
        >
          {/* Control Section */}
          <ControlLayout>
            <ButtonLayout>
              <div className="flex gap-3 justify-between w-1/1">
                <div className="flex justify-center align-middle items-center">
                  {/* Page Button */}
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
    </Layout>
  );
}
