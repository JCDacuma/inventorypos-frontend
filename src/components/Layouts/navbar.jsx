import { useEffect, useState } from "react";
import { icons, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useMediaQuery } from "react-responsive";

export default function Navbar({ page, mobileSideBarState, setSideBarMobile }) {
  const [isOpen, setIsOpen] = useState(false);

  //SidebarState
  useEffect(() => {
    setSideBarMobile(isOpen);
  }, [isOpen]);

  //Screen Size
  const isDesktop = useMediaQuery({ minWidth: 668 });
  const IsSmallMobile = useMediaQuery({ maxWidth: 468 });

  // Nav items
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full shadow-md bg-violet-600 z-53">
      <div className="">
        <div className="flex items-center justify-between w-screen h-16 mr-20">
          {/* Logo / Brand */}
          <div className="flex items-center gap-4 ml-5 align-content-center">
            <div
              className={`${
                IsSmallMobile ? `h-9 w-10` : `h-10 w-11`
              } border-1 border-white rounded-[0.1rem]`}
            ></div>
            <div
              className={`flex-shrink-0 ${
                IsSmallMobile
                  ? `text-[1.3rem] font-medium`
                  : `text-2xl  font-semibold`
              }  text-white`}
            >
              <p>{page}</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className={`${isDesktop ? `hidden` : ``}`}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mr-2 text-white hover:text-violet-200 focus:outline-none"
            >
              {
                <Hamburger
                  size={24}
                  duration={0.3}
                  easing="ease-in"
                  toggled={isOpen}
                />
              }
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
