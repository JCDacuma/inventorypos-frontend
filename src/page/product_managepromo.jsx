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

//Animation
import { motion, AnimatePresence } from "framer-motion";

//Icons
import { SquarePen, Trash2, Undo2 } from "lucide-react";

export default function PromoManagement() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);

  //Batch Contol Modal State
  const openBatchContol = selectedID.length > 0;

  const isSmallMobile = useMediaQuery({ maxWidth: 375 });

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
      action: "Edit",
    },
    {
      id: 2,
      promo: "Holiday Mega Sale",
      discount: "25%",
      datestart: "2025-12-01",
      enddate: "2025-12-31",
      status: <PromoStatus status="Upcoming" />,
      action: "Edit",
    },
    {
      id: 3,
      promo: "Weekend Flash Deal",
      discount: "10%",
      datestart: "2025-09-07",
      enddate: "2025-09-08",
      status: <PromoStatus status="Inactive" />,
      action: "Edit",
    },
    {
      id: 4,
      promo: "Buy 1 Get 1 Free",
      discount: "50%",
      datestart: "2025-09-10",
      enddate: "2025-09-20",
      status: <PromoStatus status="Active" />,
      action: "Edit",
    },
    {
      id: 5,
      promo: "Summer Clearance",
      discount: "30%",
      datestart: "2025-06-01",
      enddate: "2025-06-30",
      status: <PromoStatus status="Ended" />,
      action: "Edit",
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
                <div className="flex justify-center align-middle items-center"></div>
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
