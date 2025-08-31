import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

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
  const [showFullSidebar, setShowSideBar] = useState(() => {
    //Initialize the last current state of sidebar
    const loadSideBar = JSON.parse(localStorage.getItem("sidebarState"));
    return loadSideBar !== null ? loadSideBar : true;
  });
  const location = useLocation();

  //Media Query for sidebar and navbar
  const isDesktop = useMediaQuery({ minWidth: 668 });
  const isSmallMobile = useMediaQuery({ maxWidth: 567 });

  //Change sidebar state flag
  const toggleSidebarview = () => {
    let state;
    if (showFullSidebar !== null) {
      state = showFullSidebar ? false : true;
      setShowSideBar(state);
    } else {
      state = true;
      setShowSideBar(true);
    }

    //Save to localStorage
    localStorage.setItem("sidebarState", JSON.stringify(state));
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
    <div className={` `}>
      {isDesktop ? (
        showFullSidebar ? (
          <div className="bg-gray-100 h-screen shadow-lg flex flex-col overflow-y-auto w-68">
            {/* ----  Profile Section ---- */}
            <div className="p-4 flex flex-col items-center border-b border-gray-300">
              <div className="relative flex justify-center items-center">
                <div className="w-16 h-16 rounded-lg bg-gray-300 mb-2" />
                {showFullSidebar ? (
                  <ChevronLeft
                    onClick={toggleSidebarview}
                    className="cursor-pointer absolute left-36 2xl:left-35 w-5 h-5"
                  />
                ) : (
                  ""
                )}
              </div>

              <h2 className="text-center font-semibold text-base">
                COMPANY NAME POINT OF SALES WITH INVENTORY
              </h2>
              <p className="text-sm text-gray-600">Logged in User: Full Name</p>
            </div>

            {/* ---- Links ---- */}
            <nav className="flex-1 p-3 space-y-2 text-sm">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {/* ---- kapag walang dropdown ---- */}
                  {!item.children ? (
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer text-base ${
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
                        <span className="flex items-center gap-3 text-base">
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
                                } items-center justify-between w-full p-2 rounded-lg hover:bg-gray-200 text-base`}
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
        ) : (
          <div className="bg-gray-100 h-screen shadow-lg flex flex-col overflow-y-auto w-20">
            {/* ----  Profile Section ---- */}
            <div className="p-4 flex flex-col items-center border-b border-gray-300">
              <div className="relative flex justify-center items-center">
                <div className="w-11 h-11 rounded-lg bg-gray-300 mb-2" />
                {showFullSidebar ? (
                  ""
                ) : (
                  <ChevronRight
                    onClick={toggleSidebarview}
                    className="cursor-pointer absolute left-11.5 w-4 h-4"
                  />
                )}
              </div>
            </div>

            {/* ---- Links ---- */}
            <nav className="flex-1 p-3 space-y-2 text-sm">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {/* ---- kapag walang dropdown ---- */}
                  {!item.children ? (
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 rounded-lg hover:bg-gray-200 cursor-pointer p-4 ${
                        item.path === location.pathname
                          ? "bg-gray-300 font-medium "
                          : ""
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                    </Link>
                  ) : (
                    /* ----- kapag may dropdown ---- */
                    <div>
                      <button
                        onClick={() => toggleMenu(item.title)}
                        className="flex items-center justify-between w-full p-4 rounded-lg hover:bg-gray-200 cursor-pointer"
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
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
                        <div className="ml-0 mt-1 space-y-1">
                          {item.children.map((child, i) => {
                            return (
                              <Link
                                key={i}
                                to={child.path}
                                className={`block ${
                                  child.path === location.pathname
                                    ? "bg-gray-300 font-medium"
                                    : ""
                                } items-center justify-between w-full p-4 rounded-lg hover:bg-gray-200`}
                              >
                                <span className="flex items-center gap-3">
                                  <child.icon className="w-5 h-5" />
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
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Sidebar;
