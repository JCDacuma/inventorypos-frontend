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
import { OrderManagementStatus } from "../components/Status.jsx";

import { Action } from "../components/buttons.jsx";
//Animation
import { motion, AnimatePresence } from "framer-motion";

//Icons
import {
  ListEnd,
  PackageSearch,
  X,
  Package,
  ClipboardClock,
} from "lucide-react";

export default function PromoManagement() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);

  //Batch Contol Modal State
  const openBatchContol = selectedID.length > 0;
  //Mobile Layout breakpoint
  const isSmallMobile = useMediaQuery({ maxWidth: 375 });

  //Show HistoryProduct

  //Action Table functionality
  const HandleUpdateStatus = (items, id) => {
    alert(`update ${items} id: ${id}`);
  };

  const HandleViewOrder = (items, id) => {
    alert(`view ${items} id: ${id}`);
  };

  const HandleCancel = (items, id) => {
    alert(`remove ${items} id: ${id}`);
  };

  const columns = [
    { key: "Select", label: "" },
    { key: "orderId", label: "Order" },
    { key: "supplier", label: "Supplier" },
    { key: "dateorder", label: "OrderDate" },
    { key: "arrival", label: "Arrival" },
    { key: "totalItem", label: "Items" },
    { key: "total", label: "Total" },
    { key: "status", label: "Status" },
    { key: "Action", label: "Action" },
  ];

  const orderData = [
    {
      id: 1,
      orderId: "ORD-2025-0001",
      supplier: "Dell Supplier Inc.",
      dateorder: "2025-09-01",
      arrival: "2025-09-15",
      totalItem: 25,
      total: `₱${250000}`,
      status: <OrderManagementStatus status="Received" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleUpdateStatus("ORD-2025-0001", 1),
              icon: ListEnd,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleViewOrder("ORD-2025-0001", 1),
              icon: PackageSearch,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleCancel("ORD-2025-0001", 1),
              icon: X,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
    {
      id: 2,
      orderId: "ORD-2025-0002",
      supplier: "Tech Distributors Ltd.",
      dateorder: "2025-09-03",
      arrival: "2025-09-18",
      totalItem: 18,
      total: `₱${145000}`,
      status: <OrderManagementStatus status="In Transit" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleUpdateStatus("ORD-2025-0002", 2),
              icon: ListEnd,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleViewOrder("ORD-2025-0002", 2),
              icon: PackageSearch,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleCancel("ORD-2025-0002", 2),
              icon: X,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
    {
      id: 3,
      orderId: "ORD-2025-0003",
      supplier: "Logitech Distribution",
      dateorder: "2025-09-05",
      arrival: "2025-09-20",
      totalItem: 12,
      total: `₱${78000}`,
      status: <OrderManagementStatus status="Pending" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleUpdateStatus("ORD-2025-0003", 3),
              icon: ListEnd,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleViewOrder("ORD-2025-0003", 3),
              icon: PackageSearch,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleCancel("ORD-2025-0003", 3),
              icon: X,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
    {
      id: 4,
      orderId: "ORD-2025-0004",
      supplier: "Apple Authorized Dist.",
      dateorder: "2025-09-08",
      arrival: "2025-09-25",
      totalItem: 40,
      total: `₱${520000}`,
      status: <OrderManagementStatus status="Ordered" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleUpdateStatus("ORD-2025-0004", 4),
              icon: ListEnd,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleViewOrder("ORD-2025-0004", 4),
              icon: PackageSearch,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleCancel("ORD-2025-0004", 4),
              icon: X,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
    {
      id: 5,
      orderId: "ORD-2025-0005",
      supplier: "Samsung Electronics",
      dateorder: "2025-09-10",
      arrival: "2025-09-28",
      totalItem: 30,
      total: `₱${310000}`,
      status: <OrderManagementStatus status="Partially Received" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleUpdateStatus("ORD-2025-0005", 5),
              icon: ListEnd,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleViewOrder("ORD-2025-0005", 5),
              icon: PackageSearch,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
            {
              onClick: () => HandleCancel("ORD-2025-0005", 5),
              icon: X,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Layout currentWebPage="Order Management">
      <MainWrapper>
        <div
          className={` relative flex-column h-full m-0 md:block rounded-2xl pb-27 bg-white shadow-md py-5  ${
            isSmallMobile ? `px-1` : `px-5`
          }`}
        >
          {/* Control Section */}
          <ControlLayout>
            <ButtonLayout>
              <div className="flex gap-3 justify-between w-1/1 items-center ">
                <div className="flex justify-center gap-2 align-middle items-center"></div>
                <div className="flex justify-center items-end gap-3 ">
                  <motion.button
                    whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
                    whileHover={{ scale: 1.05, backgroundColor: "#3c2350" }}
                    className="bg-violet-400 text-white flex text-sm py-2 px-4 rounded-3xl cursor-pointer"
                  >
                    <Package className={"h-5 w-5 mr-1"} />
                    Create
                  </motion.button>
                  <Link to={"/order-history/all"}>
                    <motion.button
                      whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
                      whileHover={{ scale: 1.05, backgroundColor: "#3c2350" }}
                      className="bg-violet-400 text-white flex text-sm py-2 px-4 rounded-3xl cursor-pointer"
                    >
                      <ClipboardClock className={"h-5 w-5 mr-1"} />
                      Records
                    </motion.button>
                  </Link>

                  {/* Exportation button */}
                  <ExportButton />
                </div>
              </div>
            </ButtonLayout>
            <Searchbar />
          </ControlLayout>

          {/* Table Section */}
          <MobileTable
            columns={columns}
            data={orderData}
            setSelectedId={setSelectedID}
          />
          <Table
            columns={columns}
            data={orderData}
            setSelectedId={setSelectedID}
          />
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
              <ListEnd
                className={` ${isSmallMobile ? `h-5 w-5` : `h-6 w-6`} `}
              />
              Assign
            </button>
            <button
              className={`bg-[#910B0B]/[0.69] flex gap-1 text-white   py-2 px-4 rounded-2xl cursor-pointer shadow-md shadow-gray-500 ${
                isSmallMobile ? `text-sm` : `text-md`
              }`}
            >
              <X className={` ${isSmallMobile ? `h-5 w-5` : `h-6 w-6`} `} />
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
