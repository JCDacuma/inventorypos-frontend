import { useState } from "react";
import { Link } from "react-router-dom";

// Page Layout component
import { Layout, MainWrapper } from "@/components/Layouts/Layout.jsx";

import { useMediaQuery } from "react-responsive";

import BatchControl from "@/components/Layouts/BatchControl.jsx";
import NavControl from "@/components/Layouts/pageControlsMobile.jsx";

//Table Layout component
import Table from "@/components/Layouts/table.jsx";
import TableHeader from "@/components/Layouts/tableHeader.jsx";
import MobileTable from "@/components/ui/MobileTable.jsx";
import { PromoStatus } from "@/modules/product/components/ui/productStatus.jsx";
import { Action } from "@/components/ui/buttons.jsx";
//Animation
import { motion, AnimatePresence } from "framer-motion";

//Icons
import { SquarePen, Trash2, Eye, Tag } from "lucide-react";

export default function PromoManagement() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);

  //Batch Contol Modal State
  const openBatchContol = selectedID.length > 0;
  const [pageControl, setPageControl] = useState(false); //Page control mobile state modal

  const isSmallMobile = useMediaQuery({ maxWidth: 375 });

  const HandleEdit = (id, items) => {
    alert(`edit ${items} id: ${id}`);
  };

  const HandleViewProduct = (id, items) => {
    alert(`view ${items} id: ${id}`);
  };

  const HandleRemove = (id, items) => {
    alert(`remove ${items} id: ${id}`);
  };

  //BatchControls
  const BatchControlBtn = [
    {
      btnLabel: "Assign",
      color: "bg-violet-500 ",
      icon: SquarePen,
      padding: "py-2 px-6",
    },
    {
      btnLabel: "Remove",
      color: "bg-[#910B0B]/[0.69]",
      icon: Trash2,
      padding: "py-2 px-6",
    },
  ];

  //Page Controls
  const PageBtnControls = [
    {
      BtnLabel: "Add Promo",
      iconControl: Tag,
    },
  ];

  const columns = [
    { key: "Select", label: "" },
    { key: "promo", label: "Promo" },
    { key: "discount", label: "Discount" },
    { key: "datestart", label: "LaunchDate" },
    { key: "enddate", label: "EndDate" },
    { key: "status", label: "Status" },
    { key: "Action", label: "Action" },
  ];

  const data = [
    {
      id: 1,
      promo: "Back-to-School Sale",
      discount: "15%",
      datestart: "2025-09-01",
      enddate: "2025-09-15",
      status: <PromoStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Back-to-School Sale", 1),
              icon: SquarePen,
              iconSize: `h-4 w-4`,
            },
            {
              onClick: () => HandleViewProduct("Back-to-School Sale", 1),
              icon: Eye,
              iconSize: `h-4 w-4`,
            },
            {
              onClick: () => HandleRemove("Back-to-School Sale", 1),
              icon: Trash2,
              iconSize: `h-4 w-4`,
            },
          ]}
        />
      ),
    },
    {
      id: 2,
      promo: "Holiday Mega Sale",
      discount: "25%",
      datestart: "2025-12-01",
      enddate: "2025-12-31",
      status: <PromoStatus status="Upcoming" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Holiday Mega Sale", 2),
              icon: SquarePen,
              iconSize: `h-4 w-4`,
            },
            {
              onClick: () => HandleViewProduct("Holiday Mega Sale", 2),
              icon: Eye,
              iconSize: `h-4 w-4`,
            },
            {
              onClick: () => HandleRemove("Holiday Mega Sale", 2),
              icon: Trash2,
              iconSize: `h-4 w-4`,
            },
          ]}
        />
      ),
    },
    {
      id: 3,
      promo: "Weekend Flash Deal",
      discount: "10%",
      datestart: "2025-09-07",
      enddate: "2025-09-08",
      status: <PromoStatus status="Inactive" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Weekend Flash Deal", 3),
              icon: SquarePen,
              iconSize: `h-4 w-4`,
            },
            {
              onClick: () => HandleViewProduct("Weekend Flash Deal", 3),
              icon: Eye,
              iconSize: `h-4 w-4`,
            },
            {
              onClick: () => HandleRemove("Weekend Flash Deal", 3),
              icon: Trash2,
              iconSize: `h-4 w-4`,
            },
          ]}
        />
      ),
    },
    {
      id: 4,
      promo: "Buy 1 Get 1 Free",
      discount: "50%",
      datestart: "2025-09-10",
      enddate: "2025-09-20",
      status: <PromoStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Buy 1 Get 1 Free", 4),
              icon: SquarePen,
              iconSize: `h-4 w-4`,
            },
            {
              onClick: () => HandleViewProduct("Buy 1 Get 1 Free", 4),
              icon: Eye,
              iconSize: `h-4 w-4`,
            },
            {
              onClick: () => HandleRemove("Buy 1 Get 1 Free", 4),
              icon: Trash2,
              iconSize: `h-4 w-4`,
            },
          ]}
        />
      ),
    },
    {
      id: 5,
      promo: "Summer Clearance",
      discount: "30%",
      datestart: "2025-06-01",
      enddate: "2025-06-30",
      status: <PromoStatus status="Ended" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Summer Clearance", 5),
              icon: SquarePen,
              iconSize: `h-4 w-4`,
            },
            {
              onClick: () => HandleViewProduct("Summer Clearance", 5),
              icon: Eye,
              iconSize: `h-4 w-4`,
            },
            {
              onClick: () => HandleRemove("Summer Clearance", 5),
              icon: Trash2,
              iconSize: `h-4 w-4`,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Layout currentWebPage="Promo">
      <div className="relative flex flex-col w-full px-5 pt-20 overflow-auto">
        {/* Control Section */}
        <TableHeader
          pageControl={pageControl}
          setPageControl={() => setPageControl(true)}
          hasFilter={true}
          hasExport={true}
          hasNavBack={true}
          BackNavigationLink="/product-management"
          Buttons={PageBtnControls}
        />

        {/* Table Section */}
        <div className="block md:hidden">
          <MobileTable
            columns={columns}
            data={data}
            setSelectedId={setSelectedID}
          />
        </div>
        <div className="hidden md:block">
          <Table columns={columns} data={data} setSelectedId={setSelectedID} />
        </div>
      </div>

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
        hasNavBack={true}
        BackNavigationLink={"/product-management"}
      />
    </Layout>
  );
}
