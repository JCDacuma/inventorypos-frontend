import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Hamburger from "hamburger-react";
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
  LogOut,
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
        path: "/inventory-report",
      },
    ],
  },
  {
    title: "Point of Sale",
    icon: ShoppingCart,
    path: "/point-of-sale",
  },
  {
    title: "Product",
    icon: Package,
    children: [
      {
        title: "Manage Product",
        icon: Boxes,
        path: "/product-management",
        secondPath: "/promo-management",
      },
      {
        title: "Inventory",
        icon: Warehouse,
        path: "/inventory",
        secondPath: "/batch-inventory",
      },
      { title: "Suppliers", icon: ClipboardList, path: "/suppliers" },
      { title: "Orders", icon: Truck, path: "/product-orders" },
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
      { title: "Register Account", icon: UserPlus, path: "/register-account" },
      { title: "Config Account", icon: UserRoundPen, path: "/config-accounts" },
      { title: "Logout", icon: LogOut },
    ],
  },
];

const Sidebar = ({ SideBarMobileState }) => {
  const [openMenu, setOpenMenu] = useState([]);
  const [showFullSidebar, setShowSideBar] = useState(() => {
    //Initialize the last current state of sidebar
    const loadSideBar = JSON.parse(localStorage.getItem("sidebarState"));
    return loadSideBar !== null ? loadSideBar : false;
  });

  //Mobile SidebarState
  const [mobileSidebarState, setMobileSidebar] = useState(false);

  useEffect(() => {
    setMobileSidebar(SideBarMobileState);
  }, [SideBarMobileState]);

  //Current Page location path
  const location = useLocation();
  const secondLocation = "/" + location.pathname.split("/")[1];

  //Media Query for sidebar and navbar
  const isDesktop = useMediaQuery({ minWidth: 668 });
  const isSmallDesktop = useMediaQuery({ maxWidth: 1068 });
  const isMobile = useMediaQuery({ maxWidth: 667 });

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
    //Save State to localStorage
    localStorage.setItem("sidebarState", JSON.stringify(state));
  };

  //forced open if there is a child current selected
  const forcedOpenMenus = menuItems
    .filter(
      (item) =>
        item.children &&
        item.children.some(
          (child) =>
            child.path === location.pathname ||
            child.secondPath === secondLocation
        )
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
    <div
      className={` z-50 ${
        (showFullSidebar && isSmallDesktop) || (isMobile && !showFullSidebar)
          ? `absolute`
          : ``
      } `}
    >
      {isDesktop ? (
        <div
          className={`absolute flex items-baseline justify-baseline pl-[1rem] pt-4 border-b-2 border-violet-500  top-15  z-100 text-white bg-violet-800 transition-[width] duration-500 ease-in-out  ${
            showFullSidebar ? `w-62 h-20` : `w-23 h-17`
          }`}
        >
          <Hamburger
            size={24}
            duration={0.3}
            easing="ease-in"
            toggled={showFullSidebar}
            toggle={toggleSidebarview}
          />
        </div>
      ) : (
        ""
      )}

      {isDesktop ? (
        showFullSidebar ? (
          <div
            className={`bg-violet-800 h-screen shadow-lg flex flex-col  overflow-y-auto
    transition-[width] duration-500 ease-in-out z-50
    ${showFullSidebar ? "w-64" : "w-20"}`}
          >
            {/* ---- Links ---- */}
            <nav className="flex-1 p-3 space-y-2 text-sm mt-18">
              <div className="  flex  items-center text-white-50 ">
                <div className="flex items-center h-10"></div>
              </div>
              <div className="w-full  mt-5 mb-3"></div>

              {menuItems.map((item, index) => (
                <div key={index}>
                  {/* ---- If no dropdown ---- */}
                  {!item.children ? (
                    <Link
                      to={item.path}
                      className={`group flex items-center gap-2 p-2  rounded-lg cursor-pointer text-base ${
                        item.path === location.pathname ||
                        item.secondPath === secondLocation
                          ? "bg-gray-400/70 font-semibold text-white hover:bg-gray-200 hover:text-violet-400 hover:font-bold"
                          : "font-medium text-white hover:text-violet-400 hover:font-bold hover:bg-gray-200"
                      }`}
                    >
                      <item.icon
                        className={`w-5 h-5 stroke-2 group-hover:text-violet-400 group-hover:stroke-3 ${
                          item.path === location.pathname
                            ? "font-semibold text-white"
                            : "font-medium text-white "
                        }`}
                      />
                      <span className="ml-1">{item.title}</span>
                    </Link>
                  ) : (
                    /* ----- If there is a dropdown ---- */
                    <div>
                      <button
                        onClick={() => toggleMenu(item.title)}
                        className="group flex items-center justify-between w-full p-2 rounded-lg text-white hover:bg-gray-200 cursor-pointer"
                      >
                        <span className="flex items-center gap-3 text-base font-medium text-white group-hover:font-bold group-hover:text-violet-400">
                          <item.icon className="w-5 h-5 text-white group-hover:text-violet-400 group-hover:stroke-3" />
                          {item.title}
                        </span>
                        <span
                          className={`transform transition-transform duration-300 ease-in-out 
                            ${
                              isMenuOpen(item.title) ? "rotate-90" : "rotate-0"
                            }`}
                        >
                          <ChevronRight className="w-4 h-4 text-white group-hover:w-5 group-hover:h-5 group-hover:text-violet-400 group-hover:stroke-3" />
                        </span>
                      </button>

                      {/*-------- Child Menu  ------*/}
                      <div
                        className={`ml-8 mt-1 space-y-1 overflow-hidden transition-all duration-500 ease-in-out
                          ${
                            isMenuOpen(item.title)
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }
                        `}
                      >
                        {item.children.map((child, i) => (
                          <Link
                            key={i}
                            to={child.path}
                            className={`flex items-center gap-3 p-2 text-white rounded-lg cursor-pointer text-base ${
                              child.path === location.pathname ||
                              child.secondPath === secondLocation
                                ? "bg-gray-400/70 font-semibold text-white hover:bg-gray-200 hover:text-violet-400 hover:font-bold"
                                : "font-medium text-white hover:text-violet-400 hover:font-bold hover:bg-gray-200"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <child.icon className="w-5 h-5" />
                              {child.title}
                            </span>
                          </Link>
                        ))}
                        <div className="w-full border-b-2 border-violet-500 mt-1"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        ) : (
          <div
            className={`bg-violet-800 h-screen shadow-lg flex flex-col transition-[width] duration-500 ease-in-out z-50
    ${showFullSidebar ? "w-68" : "w-24"}
    overflow-y-auto overflow-x-visible [scrollbar-width:thin] [scrollbar-color:#8b5cf6_transparent]`}
          >
            {/* ---- Links ---- */}
            <nav className={`flex-1 py-4 px-4   text-sm mt-18 `}>
              <div className=" flex ml-4">
                {showFullSidebar ? (
                  ""
                ) : (
                  <div className="flex items-center h-10"></div>
                )}
              </div>

              {menuItems.map((item, index) => (
                <div key={index}>
                  {/* ---- If there is  no dropdown ---- */}
                  {!item.children ? (
                    <div className=" flex group mt-1 hover:font-bold">
                      <Link
                        to={item.path}
                        className={`group flex items-center gap-3 rounded-lg hover:bg-gray-200  cursor-pointer p-4  ${
                          item.path === location.pathname ||
                          item.secondPath === secondLocation
                            ? "bg-gray-400/70 font-medium"
                            : ""
                        }`}
                      >
                        <item.icon
                          className={`w-5 h-5 stroke-2 group-hover:text-violet-400 group-hover:stroke-2 ${
                            item.path === location.pathname
                              ? "font-semibold text-white"
                              : "font-medium text-white "
                          }`}
                        />
                      </Link>
                      {/* Tooltip (shows on hover) */}
                      <span className="absolute top-20 left-26 px-2 py-1 text-sm text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap  pointer-events-none">
                        {item.title}
                      </span>
                    </div>
                  ) : (
                    /* ----- kapag may dropdown ---- */
                    <div>
                      <button
                        onClick={() => toggleMenu(item.title)}
                        className="group  flex items-center justify-between w-full p-4 rounded-lg hover:bg-gray-200 hover:font-bold  cursor-pointer mt-2"
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-white group-hover:text-violet-400 group-hover:stroke-2" />
                        </span>
                        <span
                          className={`transform transition-transform duration-300 ease-in-out 
                            ${
                              isMenuOpen(item.title) ? "rotate-90" : "rotate-0"
                            }`}
                        >
                          <ChevronRight className="w-4 h-4 text-white group-hover:w-5 group-hover:h-5 group-hover:text-violet-400 group-hover:stroke-3" />
                        </span>
                        {/* Tooltip */}
                        <span className="absolute top-20 left-26 px-2 py-1 text-sm text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {item.title}
                        </span>
                      </button>

                      {/*-------- Child Menu with the link dropdown------*/}
                      {
                        <div
                          className={` mt-1 space-y-1 overflow-hidden transition-all duration-400 ease-in-out ${
                            isMenuOpen(item.title)
                              ? `max-h-90 `
                              : `max-h-0 capacity-0`
                          }`}
                        >
                          {item.children.map((child, i) => {
                            return (
                              <Link
                                key={i}
                                to={child.path}
                                className={`group block ${
                                  child.path === location.pathname ||
                                  child.secondPath === secondLocation
                                    ? "bg-gray-400/70 font-medium text-white hover:bg-gray-200 hover:text-violet-400 hover:font-bold"
                                    : "font-medium text-white hover:text-violet-400 hover:font-bold hover:bg-gray-200"
                                } items-center justify-between w-full p-4 rounded-lg hover:bg-gray-200`}
                              >
                                {/* Tooltip */}
                                <span className="absolute top-20 left-26  px-2 py-1 text-sm text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                  {child.title}
                                </span>
                                <span className="flex items-center gap-3">
                                  <child.icon className="w-5 h-5" />
                                </span>
                              </Link>
                            );
                          })}
                          <div className="w-1/1 border-b-2 border-violet-500 mt-1"></div>
                        </div>
                      }
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

      {/* ------- Mobile Sidebar ------- */}

      {isMobile && (
        <div
          className={`fixed top-0 left-0 h-screen w-68 bg-violet-800 shadow-lg flex flex-col overflow-y-auto
    transition-transform duration-500 ease-in-out z-50 
    ${mobileSidebarState ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* ---- Links ---- */}
          <nav className="flex-1 p-3 space-y-2 text-sm mt-13">
            <div className="w-full border-b-2 border-violet-500 mt-5 mb-3"></div>

            {menuItems.map((item, index) => (
              <div key={index}>
                {/* ---- kapag walang dropdown ---- */}
                {!item.children ? (
                  <Link
                    to={item.path}
                    className={`group flex items-center gap-2 p-2  rounded-lg cursor-pointer text-base ${
                      item.path === location.pathname
                        ? "bg-gray-400/70 font-semibold text-white hover:bg-gray-200 hover:text-violet-400 hover:font-bold"
                        : "font-medium text-white hover:text-violet-400 hover:font-bold hover:bg-gray-200"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 stroke-2 group-hover:text-violet-400 group-hover:stroke-3 ${
                        item.path === location.pathname
                          ? "font-semibold text-white"
                          : "font-medium text-white "
                      }`}
                    />
                    <span className="ml-1">{item.title}</span>
                  </Link>
                ) : (
                  /* ----- kapag may dropdown ---- */
                  <div>
                    <button
                      onClick={() => toggleMenu(item.title)}
                      className="group flex items-center justify-between w-full p-2 rounded-lg text-white hover:bg-gray-200 cursor-pointer"
                    >
                      <span className="flex items-center gap-3 text-base font-medium text-white group-hover:font-bold group-hover:text-violet-400">
                        <item.icon className="w-5 h-5 text-white group-hover:text-violet-400 group-hover:stroke-3" />
                        {item.title}
                      </span>
                      <span
                        className={`transform transition-transform duration-300 ease-in-out 
                            ${
                              isMenuOpen(item.title) ? "rotate-90" : "rotate-0"
                            }`}
                      >
                        <ChevronRight className="w-4 h-4 text-white group-hover:w-5 group-hover:h-5 group-hover:text-violet-400 group-hover:stroke-3" />
                      </span>
                    </button>

                    {/*-------- Child Menu  ------*/}
                    <div
                      className={`ml-8 mt-1 space-y-1 overflow-hidden transition-all duration-500 ease-in-out
                          ${
                            isMenuOpen(item.title)
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }
                        `}
                    >
                      {item.children.map((child, i) => (
                        <Link
                          key={i}
                          to={child.path}
                          className={`flex items-center gap-3 p-2 text-white rounded-lg cursor-pointer text-base ${
                            child.path === location.pathname
                              ? "bg-gray-400/70 font-semibold text-white hover:bg-gray-200 hover:text-violet-400 hover:font-bold"
                              : "font-medium text-white hover:text-violet-400 hover:font-bold hover:bg-gray-200"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <child.icon className="w-5 h-5" />
                            {child.title}
                          </span>
                        </Link>
                      ))}
                      <div className="w-full border-b-2 border-violet-500 mt-1"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
