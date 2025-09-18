import { useState } from "react";
import { Link, useParams } from "react-router-dom";

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

//Table Layout component
import Table from "../../../components/ui/Table.jsx";
import MobileTable from "../../../components/ui/MobileTable.jsx";
import { OrderHistoryStatus } from "../../../components/ui/Status.jsx";
import { Action } from "../../../components/ui/buttons.jsx";
//Animation
import { motion, AnimatePresence } from "framer-motion";

//Icons
import { PackageSearch, Undo2 } from "lucide-react";

export default function Suppliers() {
  const id = useParams(); //Id selected

  //Mobile Layout breakpoint
  const isSmallMobile = useMediaQuery({ maxWidth: 375 });

  //Handle View Product functionality Action
  const HandleViewProduct = (items, id) => {
    alert(`Edit ${items} id: ${id}`);
  };

  const columns = [
    { key: "order", label: "Order" },
    { key: "supplier", label: "Supplier" },
    { key: "dateorder", label: "DateOrder" },
    { key: "arrival", label: "Arrival" },
    { key: "items", label: "Items" },
    { key: "totalamount", label: "Total" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  // Sample Orders Data
  const orderData = [
    {
      id: 1,
      order: "ORD-2025-0001",
      supplier: "Dell Supplier Inc.",
      dateorder: "2025-09-01",
      arrival: "2025-09-05",
      items: "1 item",
      totalamount: "₱60,000",
      status: <OrderHistoryStatus status="Received" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleViewProduct("ORD-2025-0001", 1),
              icon: PackageSearch,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      supplierId: 1,
    },
    {
      id: 2,
      order: "ORD-2025-0002",
      supplier: "Logitech Distribution",
      dateorder: "2025-09-03",
      arrival: "2025-09-06",
      items: "1 item",
      totalamount: "₱45,000",
      status: <OrderHistoryStatus status="Cancelled" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleViewProduct("ORD-2025-0002", 2),
              icon: PackageSearch,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      supplierId: 2,
    },
    {
      id: 3,
      order: "ORD-2025-0003",
      supplier: "Apple Authorized Dist.",
      dateorder: "2025-09-05",
      arrival: "2025-09-10",
      items: "1 item",
      totalamount: "₱325,000",
      status: <OrderHistoryStatus status="Returned" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleViewProduct("ORD-2025-0003", 3),
              icon: PackageSearch,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      supplierId: 3,
    },
    {
      id: 4,
      order: "ORD-2025-0004",
      supplier: "Grocery Trading Corp.",
      dateorder: "2025-09-07",
      arrival: "2025-09-08",
      items: "2 items",
      totalamount: "₱94,000",
      status: <OrderHistoryStatus status="Received" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleViewProduct("ORD-2025-0004", 4),
              icon: PackageSearch,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      supplierId: 4,
    },
    {
      id: 5,
      order: "ORD-2025-0005",
      supplier: "Furniture World Supply",
      dateorder: "2025-09-09",
      arrival: "2025-09-12",
      items: "2 items",
      totalamount: "₱55,000",
      status: <OrderHistoryStatus status="Received" />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleViewProduct("ORD-2025-0005", 5),
              icon: PackageSearch,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
      supplierId: 5,
    },
  ];

  //DataTableShowing
  const orderShowing =
    id.id === "all"
      ? orderData
      : orderData.filter((order) => order.supplierId === parseInt(id.id));

  return (
    <Layout currentWebPage="Order History">
      <MainWrapper>
        <div
          className={` relative flex-column h-full m-0 md:block rounded-2xl pb-27 bg-white shadow-md py-5  ${
            isSmallMobile ? `px-1` : `px-5`
          }`}
        >
          {/* Control Section */}
          <ControlLayout>
            <ButtonLayout>
              <Link to={id.id === "all" ? "/product-orders" : "/suppliers"}>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05, color: "#3c2350" }}
                  className="items-center justify-center hidden gap-1 mt-2 font-semibold cursor-pointer  sm:flex text-violet-500"
                >
                  <Undo2 /> Back
                </motion.button>
              </Link>

              <div className="flex items-center justify-between gap-3 w-1/1 ">
                <div className="flex items-center justify-center gap-2 align-middle"></div>
                <div className="flex items-end justify-center gap-2 ">
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
            data={orderShowing}
            setSelectedId={null}
          />
          <Table columns={columns} data={orderShowing} setSelectedId={null} />
        </div>
      </MainWrapper>
    </Layout>
  );
}
