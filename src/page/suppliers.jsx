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
import { SupplierStatus } from "../components/Status.jsx";
import { Action } from "../components/buttons.jsx";

//Animation
import { motion, AnimatePresence } from "framer-motion";

//Icons
import { SquarePen, Eye, OctagonMinus, TruckElectric } from "lucide-react";

export default function Suppliers() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);

  //Batch Contol Modal State
  const openBatchContol = selectedID.length > 0;

  const isSmallMobile = useMediaQuery({ maxWidth: 375 });

  const HandleEdit = (items, id) => {
    alert(`Edit ${items} id: ${id}`);
  };

  const HandleInactive = (items, id) => {
    alert(`UpdateInactive ${items} id: ${id}`);
  };

  const columns = [
    { key: "Select", label: "" },
    { key: "suppliername", label: "Supplier" },
    { key: "contactperson", label: "Contact" },
    { key: "phonenumber", label: "Phone" },
    { key: "vatregistered", label: "VatRegister" },
    { key: "shippingfee", label: "ShippingFee" },
    { key: "status", label: "Status" },
    { key: "Action", label: "Action" },
  ];

  const supplierData = [
    {
      id: 1,
      suppliername: "Dell Supplier Inc.",
      contactperson: "John Smith",
      phonenumber: "+63 912 345 6789",
      vatregistered: "Yes",
      shippingfee: "₱2,500",
      status: <SupplierStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Dell Supplier Inc.", 1),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/1",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Dell Supplier Inc.", 1),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 2,
      suppliername: "Tech Distributors Ltd.",
      contactperson: "Emily Davis",
      phonenumber: "+63 917 222 3344",
      vatregistered: "No",
      shippingfee: "₱1,800",
      status: <SupplierStatus status="Inactive" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Tech Distributors Ltd.", 2),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/2",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Tech Distributors Ltd.", 2),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 3,
      suppliername: "Logitech Distribution",
      contactperson: "Michael Lee",
      phonenumber: "+63 918 555 7788",
      vatregistered: "Yes",
      shippingfee: "₱1,200",
      status: <SupplierStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Logitech Distribution", 3),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/3",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Logitech Distribution", 3),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 4,
      suppliername: "Apple Authorized Dist.",
      contactperson: "Sophia Tan",
      phonenumber: "+63 915 111 2233",
      vatregistered: "Yes",
      shippingfee: "₱3,000",
      status: <SupplierStatus status="Inactive" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Apple Authorized Dist.", 4),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/4",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Apple Authorized Dist.", 4),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 5,
      suppliername: "Samsung Electronics",
      contactperson: "David Kim",
      phonenumber: "+63 916 777 8899",
      vatregistered: "No",
      shippingfee: "₱2,200",
      status: <SupplierStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Samsung Electronics", 5),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/5",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Samsung Electronics", 5),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 6,
      suppliername: "Grocery Trading Corp.",
      contactperson: "Maria Lopez",
      phonenumber: "+63 913 444 5566",
      vatregistered: "Yes",
      shippingfee: "₱900",
      status: <SupplierStatus status="Inactive" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Grocery Trading Corp.", 6),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/6",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Grocery Trading Corp.", 6),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 7,
      suppliername: "Furniture World Supply",
      contactperson: "James Rodriguez",
      phonenumber: "+63 919 888 3344",
      vatregistered: "No",
      shippingfee: "₱1,500",
      status: <SupplierStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Furniture World Supply", 7),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/7",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Furniture World Supply", 7),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
    {
      id: 8,
      suppliername: "Clothing Hub Dist.",
      contactperson: "Anna Garcia",
      phonenumber: "+63 914 222 7788",
      vatregistered: "Yes",
      shippingfee: "₱1,000",
      status: <SupplierStatus status="Inactive" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit("Clothing Hub Dist.", 8),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              to: "/order-history/8",
              icon: Eye,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleInactive("Clothing Hub Dist.", 8),
              icon: OctagonMinus,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Layout currentWebPage="Manage Supplier">
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
                <div className="flex justify-center items-end gap-2 ">
                  <Link to={"/register-supplier"}>
                    <motion.button
                      whileTap={{ scale: 0.9, backgroundColor: "#6d00c5" }}
                      whileHover={{ scale: 1.05, backgroundColor: "#3c2350" }}
                      className="bg-violet-400 text-white flex text-sm py-2 px-4 rounded-3xl cursor-pointer"
                    >
                      <TruckElectric className={"h-5 w-5 mr-1"} />
                      Register Supplier
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
            data={supplierData}
            setSelectedId={setSelectedID}
          />
          <Table
            columns={columns}
            data={supplierData}
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
              <SquarePen
                className={` ${isSmallMobile ? `h-5 w-5` : `h-6 w-6`} `}
              />
              update
            </button>
            <button
              className={`bg-[#910B0B]/[0.69] flex gap-1 text-white   py-2 px-4 rounded-2xl cursor-pointer shadow-md shadow-gray-500 ${
                isSmallMobile ? `text-sm` : `text-md`
              }`}
            >
              <OctagonMinus
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
