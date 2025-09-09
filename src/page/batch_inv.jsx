import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

export default function BatchInventory() {
  const isSmallMobile = useMediaQuery({ maxWidth: 375 });

  //Sample column
  const columns = [
    { key: "Batch No", label: "Product" },
    { key: "Expiry", label: "Expired Date" },
    { key: "Location", label: "Location" },
    { key: "Qty", label: "Qty" },
    { key: "Supplier", label: "Supplier" },
    { key: "Status", label: "Status" },
    { key: "Action", label: "Action" },
  ];

  //Sample fetch from database
  const data = [{}];

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
          <MobileTable columns={columns} data={data} />
          <Table columns={columns} data={data} />
        </div>
      </MainWrapper>
    </Layout>
  );
}
