import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Page Layout component
import { Layout } from "@/components/Layouts/Layout.jsx";
import { ActionStatus } from "@/modules/account/components/ui/accountStatus.jsx";
import { EditStatusModal } from "@/modules/account/components/Layouts/userEditStatusModal.jsx";
import UserRole from "@/modules/account/components/Layouts/UserRoleModal.jsx";
import { Action } from "@/components/ui/buttons.jsx";
import NavControl from "@/components/Layouts/pageControlsMobile.jsx";

//Table Layout component
import Table from "@/components/Layouts/table.jsx";
import TableHeader from "@/components/Layouts/tableHeader.jsx";
import MobileTable from "@/components/ui/MobileTable.jsx";

//Animation
import { motion, AnimatePresence } from "framer-motion";
import { SweetAlert } from "@/utils/sweetalert.jsx";
//Icons
import { CircleUser, SquarePen, UserLock, UserRoundCheck } from "lucide-react";
//Api
import {
  AccountAPIFetch,
  EditAccount,
} from "@/modules/account/api/accountAPI.jsx";
import { RoleAPIFetch } from "@/modules/account/api/roleAPI.jsx";

export default function ProductManagement() {
  //Selected Id
  const [pageControl, setPageControl] = useState(false);
  const [isModalEditOpen, setOpenModalEdit] = useState(false); //modal edit
  const [isModalAddRoleOpen, setModalAddRoleOpen] = useState(false); //modal edit
  const [AccountData, setAccount] = useState([]); //data send by api array object
  const [roles, setRoles] = useState([]);
  const [accountEditing, setAccEditing] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const fetchAccount = async () => {
    await AccountAPIFetch(setAccount);
  };

  const fetchRoles = async () => {
    await RoleAPIFetch(setRoles);
  };

  useEffect(() => {
    fetchAccount();
    fetchRoles();
  }, []);

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
    { key: "fullName", label: "Full Name" },
    { key: "username", label: "Username" },
    { key: "phonenumber", label: "Phonenumber" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    { key: "Action", label: "Action" },
  ];

  const data = AccountData.map((account) => ({
    id: account.id,
    fullName: `${account.firstName} ${account.lastname}`,
    username: account.username,
    phonenumber: account.phonenumber,
    email: account.email,
    role: account.rolename,
    status: <ActionStatus status={account.status} />,
    Action: (
      <Action
        buttons={[
          {
            onClick: () => HandleUpdateStatus(account),
            icon: SquarePen,
            tooltip: "Edit Item",
            iconSize: `h-[1.2rem] w-[1.2rem]`,
          },
          {
            onClick: () => UpdateStatus(account),
            icon: account.status === "Active" ? UserLock : UserRoundCheck,
            tooltip: "Deactivate",
            iconSize: `h-[1.2rem] w-[1.2rem]`,
          },
        ]}
        disabled={submitting}
      />
    ),
  }));

  // Update Role Account
  const HandleUpdateStatus = (account) => {
    setAccEditing(account);
    setOpenModalEdit(true);
  };

  // Change Account Status
  const UpdateStatus = async (selected) => {
    if (submitting) return;
    const action = selected.status === "Active" ? "Deactivate" : "Activate";

    const result = await SweetAlert.Confirm(
      `${action} Account`,
      `Are you sure you want to ${action.toLowerCase()} this account?`
    );

    if (!result.isConfirmed) return;
    setSubmitting(true);

    const request = {
      account_status: selected.status === "Active" ? "Inactive" : "Active",
    };

    await EditAccount(request, selected.id);
    await fetchAccount();
    setSubmitting(false);
  };

  return (
    <Layout currentWebPage="Account">
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

      <EditStatusModal
        isOpen={isModalEditOpen}
        onClosed={() => setOpenModalEdit(false)}
        accountEditing={accountEditing}
        setModalAddRoleOpen={() => setModalAddRoleOpen(true)}
        roles={roles}
        fetchRoles={fetchRoles}
        fetchAccount={fetchAccount}
      />

      <UserRole
        isOpen={isModalAddRoleOpen}
        onClosed={() => setModalAddRoleOpen(false)}
        Roles={roles}
        RoleAPIFetch={fetchRoles}
      />
    </Layout>
  );
}
