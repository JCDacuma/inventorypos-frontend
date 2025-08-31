import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Package,
  Boxes,
  Truck,
  ClipboardList,
  Settings,
  Users,
  UserPlus,
  UserRoundPen,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BanknoteArrowDown,
  Warehouse,
  NotebookTabs,
} from "lucide-react";

/* ----- Links ---- */
const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Reports",
    icon: FileText,
    children: [
      { title: "Sales Report", icon: BanknoteArrowDown, path: "/salesreport" },
      {
        title: "Inventory Report",
        icon: NotebookTabs,
        path: "/inventoryreport",
      },
    ],
  },
  {
    title: "Point Of Sale",
    icon: ShoppingCart,
    path: "/pointOfSale",
  },
  {
    title: "Product",
    icon: Package,
    children: [
      { title: "Manage Product", icon: Boxes, path: "/productmanagement" },
      { title: "Inventory", icon: Warehouse, path: "/inventory" },
      { title: "Suppliers", icon: ClipboardList, path: "/suppliers" },
      { title: "Orders", icon: Truck, path: "/productorders" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    title: "Config Account",
    icon: Users,
    children: [
      { title: "Register Account", icon: UserPlus, path: "/registeraccount" },
      { title: "Config Account", icon: UserRoundPen, path: "/configaccounts" },
    ],
  },
];

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState([]);
  const [showFullSidebar, setShowSideBar] = useState(false);
  const location = useLocation();

  //Open sidebar, On process pa
  const toggleSidebarview = () => {
    setShowSideBar((prev) => !prev);
  };

  //forced open if there is a child current selected
  const forcedOpenMenus = menuItems
    .filter(
      (item) =>
        item.children &&
        item.children.some((child) => child.path === location.pathname)
    )
    .map((item) => item.title);

  // manual opening of dropdown
  const toggleMenu = (menu) => {
    // prevent menu from closing if there is child active, menu means the title of the selected child
    if (forcedOpenMenus.includes(menu)) return;

    //update state of the menu
    setOpenMenu((prev) =>
      prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]
    );
  };

  //Check if the menu is in acitve state
  const isMenuOpen = (menu) =>
    openMenu.includes(menu) || forcedOpenMenus.includes(menu);

  return (
    <div className="w-64 bg-gray-100 h-screen shadow-lg flex flex-col overflow-y-auto">
      {/* ----  Profile Section ---- */}
      <div className="p-4 flex flex-col items-center border-b border-gray-300">
        <div className="relative flex justify-center items-center">
          <div className="w-16 h-16 rounded-lg bg-gray-300 mb-2" />
          {showFullSidebar ? (
            <ChevronRight
              onClick={toggleSidebarview}
              className="cursor-pointer absolute left-27 2xl:left-30 w-5 h-5"
            />
          ) : (
            <ChevronLeft
              onClick={toggleSidebarview}
              className="cursor-pointer absolute left-27 2xl:left-30 w-5 h-5"
            />
          )}
        </div>

        <h2 className="text-center font-semibold text-sm">
          COMPANY NAME POINT OF SALES WITH INVENTORY
        </h2>
        <p className="text-xs text-gray-600">Logged in User: Full Name</p>
      </div>

      {/* ---- Links ---- */}
      <nav className="flex-1 p-3 space-y-2 text-sm">
        {menuItems.map((item, index) => (
          <div key={index}>
            {/* ---- kapag walang dropdown ---- */}
            {!item.children ? (
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer ${
                  item.path === location.pathname
                    ? "bg-gray-300 font-medium"
                    : ""
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </Link>
            ) : (
              /* ----- kapag may dropdown ---- */
              <div>
                <button
                  onClick={() => toggleMenu(item.title)}
                  className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {item.title}
                  </span>
                  <span>
                    {isMenuOpen(item.title) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </span>
                </button>

                {/*-------- Child Menu ng link na may dropdown ------*/}
                {isMenuOpen(item.title) && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child, i) => {
                      return (
                        <Link
                          key={i}
                          to={child.path}
                          className={`block ${
                            child.path === location.pathname
                              ? "bg-gray-300 font-medium"
                              : ""
                          } items-center justify-between w-full p-2 rounded-lg hover:bg-gray-200`}
                        >
                          <span className="flex items-center gap-3">
                            <child.icon className="w-5 h-5" />
                            {child.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
