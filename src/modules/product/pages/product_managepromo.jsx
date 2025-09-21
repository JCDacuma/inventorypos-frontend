import { useState } from "react";
import { Link } from "react-router-dom";

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
import BatchControl from "../../../components/Layouts/BatchControl.jsx";

//Table Layout component
import Table from "../../../components/ui/Table.jsx";
import MobileTable from "../../../components/ui/MobileTable.jsx";
import { PromoStatus } from "../../../components/ui/Status.jsx";
import { Action } from "../../../components/ui/buttons.jsx";
//Animation
import { motion, AnimatePresence } from "framer-motion";

//Icons
import { SquarePen, Trash2, Undo2, Eye, Tag } from "lucide-react";

export default function PromoManagement() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);

  //Batch Contol Modal State
  const openBatchContol = selectedID.length > 0;

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
    <Layout currentWebPage="Promo Management">
      <MainWrapper>
        <div
          className={` relative flex-column h-full m-0 md:block rounded-2xl pb-27 bg-white shadow-md py-5  ${
            isSmallMobile ? `px-1` : `px-5`
          }`}
        >
          {/* Control Section */}
          <ControlLayout>
            <ButtonLayout>
              <div className="flex justify-between gap-3 w-1/1">
                {/* Back button */}
                <Link to={"/product-management"}>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05, color: "#3c2350" }}
                    className="items-center justify-center hidden gap-1 mt-2 font-semibold cursor-pointer sm:flex text-violet-500"
                  >
                    <Undo2 /> Back
                  </motion.button>
                </Link>
                <div className="flex items-center justify-center gap-2 align-middle">
                  <motion.button
                    whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
                    whileHover={{ scale: 1.05, backgroundColor: "#3c2350" }}
                    className="flex px-4 py-2 text-sm text-white cursor-pointer bg-violet-400 rounded-3xl"
                  >
                    <Tag className={"h-5 w-5 "} />
                    Add Promo
                  </motion.button>
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
            data={data}
            setSelectedId={setSelectedID}
          />
          <Table columns={columns} data={data} setSelectedId={setSelectedID} />
        </div>
      </MainWrapper>

      {/* Batch Contol */}
      <BatchControl
        Count={selectedID.length}
        openBatchContol={openBatchContol}
        Buttons={BatchControlBtn}
      />
    </Layout>
  );
}
