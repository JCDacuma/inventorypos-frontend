import { useState } from "react";
import { Link } from "react-router-dom";

// Page Layout component
import {
  Layout,
  MainWrapper,
  ControlLayout,
} from "../../../components/Layouts/Layout.jsx";
import ButtonLayout from "@/components/Layouts/pageControlButtons.jsx";
import { useMediaQuery } from "react-responsive";
import Searchbar from "../../../components/ui/Searchbar.jsx";
import BatchControl from "../../../components/Layouts/BatchControl.jsx";
import NavControl from "@/components/Layouts/pageControlsMobile.jsx";
//Table Layout component
import Table from "../../../components/ui/Table.jsx";
import MobileTable from "../../../components/ui/MobileTable.jsx";
import { OrderManagementStatus } from "../../../components/ui/Status.jsx";

import { Action } from "../../../components/ui/buttons.jsx";

//Icons
import {
  ListEnd,
  PackageSearch,
  X,
  Package,
  ClipboardClock,
} from "lucide-react";

export default function ProductOrders() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);

  const openBatchContol = selectedID.length > 0; //Batch Contol Modal State
  const [pageControl, setPageControl] = useState(false); //Page control mobile state modal
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

  //BatchControls
  const BatchControlBtn = [
    {
      btnLabel: "Edit",
      color: "bg-violet-500 ",
      icon: ListEnd,
      padding: "py-2 px-6",
    },
    {
      btnLabel: "Remove",
      color: "bg-[#910B0B]/[0.69]",
      icon: X,
      padding: "py-2 px-6",
    },
  ];

  //Page Controls
  const PageBtnControls = [
    { BtnLabel: "Create", iconControl: Package, to: "/create-order" },
    {
      BtnLabel: "Records",
      iconControl: ClipboardClock,
      to: "/order-history/all",
    },
  ];

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
            <ButtonLayout
              Buttons={PageBtnControls}
              hasExport={true}
              //Mobile page control state
              isOpenMobile={pageControl}
              OpenMobileControl={() => setPageControl(true)}
            />
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
      <BatchControl
        Count={selectedID.length}
        openBatchContol={openBatchContol}
        Buttons={BatchControlBtn}
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
