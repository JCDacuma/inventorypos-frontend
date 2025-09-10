import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

//Page Layout
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
  Undo2,
  PackagePlus,
  PackageMinus,
  SquarePen,
  ReplaceAll,
} from "lucide-react";

export default function BatchInventory() {
  const isSmallMobile = useMediaQuery({ maxWidth: 375 });
  const { id } = useParams(); // selected item showing

  //Item Selected
  const [selectedID, setSelectedID] = useState([]);

  //Action button functionality
  const ActionBatch = () => (
    <div className="flex justify-center items-center gap-4">
      <motion.button
        whileHover={{ backgroundColor: "#9d9d9d", color: "#b15eff" }}
        animate={{ scale: [1, 1.07, 1] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="group bg-gray-200 p-2 shadow-lg rounded-[0.3rem] cursor-pointer text-violet-500"
      >
        <PackagePlus className="text-violet-500 h-5 w-5 stroke-[0.15rem] group-hover:text-violet-800 cursor-pointer" />
      </motion.button>

      <motion.button
        whileHover={{ backgroundColor: "#9d9d9d", color: "#b15eff" }}
        animate={{ scale: [1, 1.07, 1] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="group bg-gray-200 p-2 shadow-lg rounded-[0.3rem] cursor-pointer text-violet-500"
      >
        <PackageMinus className="text-violet-500 h-5 w-5 stroke-[0.15rem] group-hover:text-violet-800 cursor-pointer" />
      </motion.button>

      <motion.button
        whileHover={{ backgroundColor: "#9d9d9d", color: "#b15eff" }}
        animate={{ scale: [1, 1.07, 1] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="group bg-gray-200 p-2 shadow-lg rounded-[0.3rem] cursor-pointer text-violet-500"
      >
        <SquarePen className="text-violet-500 h-5 w-5 stroke-[0.15rem] group-hover:text-violet-800 cursor-pointer" />
      </motion.button>

      <motion.button
        whileHover={{ backgroundColor: "#9d9d9d", color: "#b15eff" }}
        animate={{ scale: [1, 1.07, 1] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="group bg-gray-200 p-2 shadow-lg rounded-[0.3rem] cursor-pointer text-violet-500"
      >
        <ReplaceAll className="text-violet-500 h-5 w-5 stroke-[0.15rem] group-hover:text-violet-800 cursor-pointer" />
      </motion.button>
    </div>
  );

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
      Status: "In Stock",
      Action: <ActionBatch itemBatch="LAP-2025-1009-001" id={1} />,
      itemId: 1,
    },
    {
      id: 2,
      BatchNo: "LAP-2025-1009-002",
      Expiry: "2026-06-30",
      Location: "Warehouse B",
      Qty: 7,
      Supplier: "Tech Distributors Ltd.",
      Status: "In Stock",
      Action: <ActionBatch itemBatch="LAP-2025-1009-002" id={2} />,
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
      Status: "In Stock",
      Action: <ActionBatch itemBatch="MOU-2025-1009-001" id={3} />,
      itemId: 2,
    },
    {
      id: 4,
      BatchNo: "MOU-2025-1009-002",
      Expiry: "2027-05-15",
      Location: "Warehouse C",
      Qty: 20,
      Supplier: "Global Peripherals",
      Status: "In Stock",
      Action: <ActionBatch itemBatch="MOU-2025-1009-002" id={4} />,
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
      Status: "In Stock",
      Action: <ActionBatch itemBatch="IPH-2025-1009-001" id={5} />,
      itemId: 3,
    },
    {
      id: 6,
      BatchNo: "IPH-2025-1009-002",
      Expiry: "2029-06-30",
      Location: "Warehouse B",
      Qty: 4,
      Supplier: "Tech Mobile Traders",
      Status: "In Stock",
      Action: <ActionBatch itemBatch="IPH-2025-1009-002" id={6} />,
      itemId: 3,
    },

    // Batches for Rice - 5kg Bag (id: 4)
    {
      id: 7,
      BatchNo: "RICE-2025-1009-01",
      Expiry: "2026-02-15",
      Location: "Warehouse Grain-1",
      Qty: 80,
      Supplier: "Agro Supplier",
      Status: "In Stock",
      Action: <ActionBatch itemBatch="RICE-2025-1009-01" id={7} />,
      itemId: 4,
    },
    {
      id: 8,
      BatchNo: "RICE-2025-1009-02",
      Expiry: "2026-04-10",
      Location: "Warehouse Grain-2",
      Qty: 40,
      Supplier: "Farmers Coop",
      Status: "In Stock",
      Action: <ActionBatch itemBatch="RICE-2025-1009-02" id={8} />,
      itemId: 4,
    },

    // Batches for Cooking Oil - 1L Bottle (id: 5)
    {
      id: 9,
      BatchNo: "OIL-2025-1009-01",
      Expiry: "2026-09-01",
      Location: "Warehouse C",
      Qty: 50,
      Supplier: "Food Essentials Ltd.",
      Status: "In Stock",
      Action: <ActionBatch itemBatch="OIL-2025-1009-01" id={9} />,
      itemId: 5,
    },
    {
      id: 10,
      BatchNo: "OIL-2025-1009-02",
      Expiry: "2026-11-15",
      Location: "Warehouse D",
      Qty: 30,
      Supplier: "Agri Traders",
      Status: "In Stock",
      Action: <ActionBatch itemBatch="OIL-2025-1009-02" id={10} />,
      itemId: 5,
    },

    // Batches for Bananas (id: 6)
    {
      id: 11,
      BatchNo: "BAN-2025-1009-01",
      Expiry: "2025-09-15",
      Location: "Cold Storage A",
      Qty: 120,
      Supplier: "Tropical Fruits Co.",
      Status: "In Stock",
      Action: <ActionBatch itemBatch="BAN-2025-1009-01" id={11} />,
      itemId: 6,
    },
    {
      id: 12,
      BatchNo: "BAN-2025-1009-02",
      Expiry: "2025-09-20",
      Location: "Cold Storage B",
      Qty: 80,
      Supplier: "Farm Fresh Traders",
      Status: "In Stock",
      Action: <ActionBatch itemBatch="BAN-2025-1009-02" id={12} />,
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
      Status: "Out of Stock",
      Action: <ActionBatch itemBatch="CHAIR-2025-1009-01" id={13} />,
      itemId: 7,
    },
    {
      id: 14,
      BatchNo: "CHAIR-2025-1009-02",
      Expiry: "2031-06-30",
      Location: "Warehouse Furniture-2",
      Qty: 0,
      Supplier: "Furniture Makers Inc.",
      Status: "Out of Stock",
      Action: <ActionBatch itemBatch="CHAIR-2025-1009-02" id={14} />,
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
      Status: "Low Stock",
      Action: <ActionBatch itemBatch="TABLE-2025-1009-01" id={15} />,
      itemId: 8,
    },
    {
      id: 16,
      BatchNo: "TABLE-2025-1009-02",
      Expiry: "2033-05-30",
      Location: "Warehouse Furniture-2",
      Qty: 0,
      Supplier: "Classic Woodworks",
      Status: "Low Stock",
      Action: <ActionBatch itemBatch="TABLE-2025-1009-02" id={16} />,
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
      Status: "In Stock",
      Action: <ActionBatch itemBatch="TSHIRT-2025-1009-01" id={17} />,
      itemId: 9,
    },
    {
      id: 18,
      BatchNo: "TSHIRT-2025-1009-02",
      Expiry: "2028-06-30",
      Location: "Warehouse Clothing-2",
      Qty: 20,
      Supplier: "Fashion Supplies Inc.",
      Status: "In Stock",
      Action: <ActionBatch itemBatch="TSHIRT-2025-1009-02" id={18} />,
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
      Status: "In Stock",
      Action: <ActionBatch itemBatch="JEANS-2025-1009-01" id={19} />,
      itemId: 10,
    },
    {
      id: 20,
      BatchNo: "JEANS-2025-1009-02",
      Expiry: "2030-06-30",
      Location: "Warehouse Clothing-2",
      Qty: 5,
      Supplier: "Blue Denim Co.",
      Status: "In Stock",
      Action: <ActionBatch itemBatch="JEANS-2025-1009-02" id={20} />,
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
      Status: "Low Stock",
      Action: <ActionBatch itemBatch="JACKET-2025-1009-01" id={21} />,
      itemId: 11,
    },
    {
      id: 22,
      BatchNo: "JACKET-2025-1009-02",
      Expiry: "2030-05-30",
      Location: "Warehouse Clothing-2",
      Qty: 3,
      Supplier: "Cozy Apparel Co.",
      Status: "Low Stock",
      Action: <ActionBatch itemBatch="JACKET-2025-1009-02" id={22} />,
      itemId: 11,
    },
  ];

  //Sample fetch from database
  //Temporary Code
  const filteredData = batchData.filter(
    (Bdata) => Bdata.itemId === parseInt(id)
  );

  return (
    <Layout currentWebPage="Stock By Batch">
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
                className=" hidden sm:flex text-violet-500 mt-2 justify-center items-center font-semibold gap-1 cursor-pointer"
              >
                <Undo2 /> Back
              </motion.button>
            </Link>
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
          <MobileTable columns={columns} data={filteredData} />
          <Table
            columns={columns}
            data={filteredData}
            setSelectedId={setSelectedID}
          />
        </div>
      </MainWrapper>
    </Layout>
  );
}
