import { useState } from "react";
import { Link, useParams } from "react-router-dom";

// Page Layout component
import { Layout } from "@/components/Layouts/Layout.jsx";

import { useMediaQuery } from "react-responsive";
import NavControl from "@/components/Layouts/pageControlsMobile.jsx";
//Table Layout component
import Table from "@/components/Layouts/table.jsx";
import TableHeader from "@/components/Layouts/tableHeader.jsx";
import MobileTable from "@/components/ui/MobileTable.jsx";
import { OrderHistoryStatus } from "@/modules/orders/components/ui/OrderStatus.jsx";
import { Action } from "@/components/ui/buttons.jsx";
//Animation
import { motion, AnimatePresence } from "framer-motion";

//Icons
import { PackageSearch } from "lucide-react";

export default function SupplierHistory() {
  const id = useParams(); //Id selected

  //Mobile Layout breakpoint
  const isSmallMobile = useMediaQuery({ maxWidth: 375 });
  const [pageControl, setPageControl] = useState(false); //Page control mobile state modal
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

  //Page Controls
  const NavigationBack = id.id === "all" ? "/product-orders" : "/suppliers";

  //DataTableShowing
  const orderShowing =
    id.id === "all"
      ? orderData
      : orderData.filter((order) => order.supplierId === parseInt(id.id));

  return (
    <Layout currentWebPage="Order History">
      <div className="relative flex flex-col w-full px-5 pt-20 overflow-auto">
        {/* Control Section */}

        <TableHeader
          pageControl={pageControl}
          setPageControl={() => setPageControl(true)}
          hasFilter={true}
          hasExport={true}
          hasNavBack={true}
          BackNavigationLink={NavigationBack}
        />
        {/* Table Section */}
        <div className="block md:hidden">
          <MobileTable
            columns={columns}
            data={orderShowing}
            setSelectedId={null}
            selectedID={null}
          />
        </div>
        <div className="hidden md:block">
          <Table columns={columns} data={orderShowing} setSelectedId={null} />
        </div>
      </div>

      {/* Page Controls (Mobile Layout only) */}
      <NavControl
        onClosed={() => setPageControl(false)}
        isOpen={pageControl}
        hasExport={true}
        hasNavBack={true}
        BackNavigationLink={NavigationBack}
      />
    </Layout>
  );
}
