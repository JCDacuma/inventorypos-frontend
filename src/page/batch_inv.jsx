import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

//Page Layout
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
import { BatchStockStatus } from "../components/Status.jsx";
import { Action } from "../components/buttons.jsx";

//Animation
import { motion, AnimatePresence } from "framer-motion";

//Icons
import {
  Undo2,
  PackagePlus,
  PackageMinus,
  SquarePen,
  ReplaceAll,
  Trash2,
  Blocks,
} from "lucide-react";

export default function BatchInventory() {
  const isSmallMobile = useMediaQuery({ maxWidth: 375 });
  const { id } = useParams(); // selected item showing

  //Item Selected
  const [selectedID, setSelectedID] = useState([]);
  const openBatchContol = selectedID.length > 0; //Batch Contol Modal State

  const HandleStockIn = (items, id) => {
    alert(`stockIn ${items} id: ${id}`);
  };

  const HandleStockOut = (items, id) => {
    alert(`StockOut ${items} id: ${id}`);
  };

  const HandleEdit = (items, id) => {
    alert(`Edit ${items} id: ${id}`);
  };

  const HandleTransfer = (items, id) => {
    alert(`Transfer ${items} id: ${id}`);
  };

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
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("LAP-2025-1009-001", 1),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("LAP-2025-1009-001", 1),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("LAP-2025-1009-001", 1),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("LAP-2025-1009-001", 1),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
      itemId: 1,
    },
    {
      id: 2,
      BatchNo: "LAP-2025-1009-002",
      Expiry: "2026-06-30",
      Location: "Warehouse B",
      Qty: 7,
      Supplier: "Tech Distributors Ltd.",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("LAP-2025-1009-002", 2),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("LAP-2025-1009-002", 2),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("LAP-2025-1009-002", 2),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("LAP-2025-1009-002", 2),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
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
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("MOU-2025-1009-001", 3),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("MOU-2025-1009-001", 3),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("MOU-2025-1009-001", 3),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("MOU-2025-1009-001", 3),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
      itemId: 2,
    },
    {
      id: 4,
      BatchNo: "MOU-2025-1009-002",
      Expiry: "2027-05-15",
      Location: "Warehouse C",
      Qty: 20,
      Supplier: "Global Peripherals",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("MOU-2025-1009-002", 4),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("MOU-2025-1009-002", 4),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("MOU-2025-1009-002", 4),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("MOU-2025-1009-002", 4),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
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
      Status: <BatchStockStatus status="Low Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("IPH-2025-1009-001", 5),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("IPH-2025-1009-001", 5),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("IPH-2025-1009-001", 5),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("IPH-2025-1009-001", 5),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
      itemId: 3,
    },
    {
      id: 6,
      BatchNo: "IPH-2025-1009-002",
      Expiry: "2029-06-30",
      Location: "Warehouse B",
      Qty: 4,
      Supplier: "Tech Mobile Traders",
      Status: <BatchStockStatus status="Low Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("IPH-2025-1009-002", 6),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("IPH-2025-1009-002", 6),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("IPH-2025-1009-002", 6),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("IPH-2025-1009-002", 6),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
      itemId: 3,
    },

    // Batches for Rice Bag - 50kg (id: 4)
    {
      id: 7,
      BatchNo: "RICE-2025-1009-01",
      Expiry: "2026-02-15",
      Location: "Warehouse Grain-1",
      Qty: 80,
      Supplier: "Agro Supplier",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("RICE-2025-1009-01", 7),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("RICE-2025-1009-01", 7),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("RICE-2025-1009-01", 7),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("RICE-2025-1009-01", 7),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
      itemId: 4,
    },
    {
      id: 8,
      BatchNo: "RICE-2025-1009-02",
      Expiry: "2026-09-10",
      Location: "Warehouse Grain-2",
      Qty: 70,
      Supplier: "Food Supplies Ltd.",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("RICE-2025-1009-02", 8),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("RICE-2025-1009-02", 8),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("RICE-2025-1009-02", 8),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("RICE-2025-1009-02", 8),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
      itemId: 4,
    },

    // Batches for Milk - 1L Pack (id: 5)
    {
      id: 9,
      BatchNo: "MILK-2025-1009-01",
      Expiry: "2025-09-20",
      Location: "Warehouse Dairy-1",
      Qty: 40,
      Supplier: "Dairy Fresh Ltd.",
      Status: <BatchStockStatus status="Expiring Soon" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("MILK-2025-1009-01", 9),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("MILK-2025-1009-01", 9),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("MILK-2025-1009-01", 9),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("MILK-2025-1009-01", 9),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
      itemId: 5,
    },
    {
      id: 10,
      BatchNo: "MILK-2025-1009-02",
      Expiry: "2025-09-25",
      Location: "Warehouse Dairy-2",
      Qty: 35,
      Supplier: "Happy Cows Dairy",
      Status: <BatchStockStatus status="Expiring Soon" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("MILK-2025-1009-02", 10),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("MILK-2025-1009-02", 10),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("MILK-2025-1009-02", 10),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("MILK-2025-1009-02", 10),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
      itemId: 5,
    },

    // Batches for Bread - Whole Wheat (id: 6)
    {
      id: 11,
      BatchNo: "BREAD-2025-1009-01",
      Expiry: "2025-09-14",
      Location: "Warehouse Bakery-1",
      Qty: 50,
      Supplier: "Bakery House",
      Status: <BatchStockStatus status="Expired" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("BREAD-2025-1009-01", 11),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("BREAD-2025-1009-01", 11),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("BREAD-2025-1009-01", 11),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("BREAD-2025-1009-01", 11),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
      itemId: 6,
    },
    {
      id: 12,
      BatchNo: "BREAD-2025-1009-02",
      Expiry: "2025-09-16",
      Location: "Warehouse Bakery-2",
      Qty: 60,
      Supplier: "Golden Bakes",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("BREAD-2025-1009-02", 12),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("BREAD-2025-1009-02", 12),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("BREAD-2025-1009-02", 12),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("BREAD-2025-1009-02", 12),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
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
      Status: <BatchStockStatus status="Out of Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("CHAIR-2025-1009-01", 13),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("CHAIR-2025-1009-01", 13),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("CHAIR-2025-1009-01", 13),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("CHAIR-2025-1009-01", 13),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
      itemId: 7,
    },
    {
      id: 14,
      BatchNo: "CHAIR-2025-1009-02",
      Expiry: "2031-06-30",
      Location: "Warehouse Furniture-2",
      Qty: 0,
      Supplier: "Furniture Makers Inc.",
      Status: <BatchStockStatus status="Out of Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("CHAIR-2025-1009-02", 14),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("CHAIR-2025-1009-02", 14),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("CHAIR-2025-1009-02", 14),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("CHAIR-2025-1009-02", 14),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
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
      Status: <BatchStockStatus status="Low Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("TABLE-2025-1009-01", 15),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("TABLE-2025-1009-01", 15),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("TABLE-2025-1009-01", 15),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("TABLE-2025-1009-01", 15),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
      itemId: 8,
    },
    {
      id: 16,
      BatchNo: "TABLE-2025-1009-02",
      Expiry: "2033-05-30",
      Location: "Warehouse Furniture-2",
      Qty: 0,
      Supplier: "Classic Woodworks",
      Status: <BatchStockStatus status="Out of Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("TABLE-2025-1009-02", 16),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("TABLE-2025-1009-02", 16),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("TABLE-2025-1009-02", 16),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("TABLE-2025-1009-02", 16),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
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
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("TSHIRT-2025-1009-01", 17),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("TSHIRT-2025-1009-01", 17),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("TSHIRT-2025-1009-01", 17),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("TSHIRT-2025-1009-01", 17),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
      itemId: 9,
    },
    {
      id: 18,
      BatchNo: "TSHIRT-2025-1009-02",
      Expiry: "2028-06-30",
      Location: "Warehouse Clothing-2",
      Qty: 20,
      Supplier: "Fashion Supplies Inc.",
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("TSHIRT-2025-1009-02", 18),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("TSHIRT-2025-1009-02", 18),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("TSHIRT-2025-1009-02", 18),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("TSHIRT-2025-1009-02", 18),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
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
      Status: <BatchStockStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("JEANS-2025-1009-01", 19),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("JEANS-2025-1009-01", 19),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("JEANS-2025-1009-01", 19),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("JEANS-2025-1009-01", 19),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
      itemId: 10,
    },
    {
      id: 20,
      BatchNo: "JEANS-2025-1009-02",
      Expiry: "2030-06-30",
      Location: "Warehouse Clothing-2",
      Qty: 5,
      Supplier: "Blue Denim Co.",
      Status: <BatchStockStatus status="Low Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("JEANS-2025-1009-02", 20),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("JEANS-2025-1009-02", 20),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("JEANS-2025-1009-02", 20),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("JEANS-2025-1009-02", 20),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
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
      Status: <BatchStockStatus status="Low Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("JACKET-2025-1009-01", 21),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("JACKET-2025-1009-01", 21),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("JACKET-2025-1009-01", 21),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("JACKET-2025-1009-01", 21),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
      itemId: 11,
    },
    {
      id: 22,
      BatchNo: "JACKET-2025-1009-02",
      Expiry: "2030-05-30",
      Location: "Warehouse Clothing-2",
      Qty: 3,
      Supplier: "Cozy Apparel Co.",
      Status: <BatchStockStatus status="Low Stock" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleStockIn("JACKET-2025-1009-02", 22),
              icon: PackagePlus,
            },
            {
              onClick: () => HandleStockOut("JACKET-2025-1009-02", 22),
              icon: PackageMinus,
            },
            {
              onClick: () => HandleEdit("JACKET-2025-1009-02", 22),
              icon: SquarePen,
            },
            {
              onClick: () => HandleTransfer("JACKET-2025-1009-02", 22),
              icon: ReplaceAll,
            },
          ]}
        />
      ),
      itemId: 11,
    },
  ];

  //Sample fetch from database
  //Temporary Code
  const filteredData = batchData.filter(
    (Bdata) => Bdata.itemId === parseInt(id)
  );

  return (
    <Layout currentWebPage="Stock by batch">
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
                <div className="flex justify-center items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
                    whileHover={{ scale: 1.05, backgroundColor: "#3c2350" }}
                    className="bg-violet-400 text-white flex text-sm py-2 px-4 rounded-3xl cursor-pointer"
                  >
                    <Blocks className={"h-5 w-5 "} />
                    Add Stock
                  </motion.button>
                  <ExportButton />
                </div>
              </div>
            </ButtonLayout>
            <Searchbar />
          </ControlLayout>
          {/* Table Section */}
          <MobileTable
            columns={columns}
            data={filteredData}
            setSelectedId={setSelectedID}
          />
          <Table
            columns={columns}
            data={filteredData}
            setSelectedId={setSelectedID}
          />
        </div>
      </MainWrapper>

      {/* Batch Contol */}
      <AnimatePresence>
        {openBatchContol ? (
          <BatchControl Count={selectedID.length}>
            <button
              className={`bg-violet-500 flex gap-1 text-white py-2 px-6 rounded-2xl cursor-pointer ${
                isSmallMobile ? `text-sm` : `text-md`
              }`}
            >
              <SquarePen
                className={` ${isSmallMobile ? `h-5 w-5` : `h-6 w-6`} `}
              />
              Edit
            </button>
            <button
              className={`bg-[#910B0B]/[0.69] flex gap-1 text-white   py-2 px-4 rounded-2xl cursor-pointer ${
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
