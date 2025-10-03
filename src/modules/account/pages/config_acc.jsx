import { useState } from "react";
import { Link } from "react-router-dom";

// Page Layout component
import { Layout } from "@/components/Layouts/Layout.jsx";
import { ActionStatus } from "@/modules/account/components/ui/accountStatus.jsx";
import { useMediaQuery } from "react-responsive";
import { Action } from "@/components/ui/buttons.jsx";
import NavControl from "@/components/Layouts/pageControlsMobile.jsx";

//Table Layout component
import Table from "@/components/Layouts/table.jsx";
import TableHeader from "@/components/Layouts/tableHeader.jsx";
import MobileTable from "@/components/ui/MobileTable.jsx";

//Animation
import { motion, AnimatePresence } from "framer-motion";

//Icons
import { CircleUser, SquarePen } from "lucide-react";

export default function ProductManagement() {
  //Selected Id
  const [pageControl, setPageControl] = useState(false);

  const isSmallMobile = useMediaQuery({ maxWidth: 375 });

  // Table Action functionality
  const HandleUpdateStatus = (id) => {
    alert(` id: ${id}`);
  };

  //Page Controls
  const PageBtnControls = [
    {
      BtnLabel: "My Account",
      iconControl: CircleUser,
      to: "/product-add",
    },
  ];

  // Sample fetch from database
  const columns = [
    { key: "FirstName", label: "First Name" },
    { key: "lastname", label: "Last Name" },
    { key: "username", label: "Username" },
    { key: "phonenumber", label: "Phonenumber" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status" },
    { key: "Action", label: "Action" },
  ];

  const data = [
    {
      id: 1,
      FirstName: "Juan",
      lastname: "Cruz",
      username: "juancruzUser",
      phonenumber: 639495689082,
      email: "juancruz34@gmail.com",
      status: <ActionStatus status="Active" />,
      Action: (
        <Action
          buttons={[
            {
              onClick: () => HandleUpdateStatus(1),
              icon: SquarePen,
              iconSize: `h-[1.2rem] w-[1.2rem]`,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Layout currentWebPage="Manage Account">
      <div className="relative flex flex-col w-full px-5 pt-20 overflow-auto">
        {/* Control Section */}
        <TableHeader
          pageControl={pageControl}
          setPageControl={() => setPageControl(true)}
          hasFilter={true}
          hasExport={true}
          Buttons={PageBtnControls}
        />

        {/* Table Section */}
        <div className="block md:hidden">
          <MobileTable columns={columns} data={data} setSelectedId={null} />
        </div>
        <div className="hidden md:block">
          <Table columns={columns} data={data} setSelectedId={null} />
        </div>
      </div>

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
