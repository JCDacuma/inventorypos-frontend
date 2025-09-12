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
import { PromoStatus } from "../components/Status.jsx";
import { Action } from "../components/buttons.jsx";
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
              <div className="flex gap-3 justify-between w-1/1">
                {/* Back button */}
                <Link to={"/product-management"}>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05, color: "#3c2350" }}
                    className=" hidden sm:flex text-violet-500 mt-2 justify-center items-center font-semibold gap-1 cursor-pointer"
                  >
                    <Undo2 /> Back
                  </motion.button>
                </Link>
                <div className="flex justify-center gap-2 align-middle items-center">
                  <motion.button
                    whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
                    whileHover={{ scale: 1.05, backgroundColor: "#3c2350" }}
                    className="bg-violet-400 text-white flex text-sm py-2 px-4 rounded-3xl cursor-pointer"
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
              Assign
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
