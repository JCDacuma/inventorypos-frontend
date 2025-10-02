import React from "react";
import ButtonLayout from "@/components/Layouts/pageControlButtons.jsx";
import Searchbar from "@/components/ui/Searchbar.jsx";
import { useMediaQuery } from "react-responsive";

export default function TableHeader({
  pageControl,
  setPageControl,
  Buttons = [],
  hasFilter = false,
  hasExport = false,
  hasNavBack = false,
  BackNavigationLink = "",
}) {
  const isSmallDesktop = useMediaQuery({ minWidth: 1200 });
  const HeaderLayout =
    Buttons.length > 1 || hasNavBack
      ? isSmallDesktop
        ? "flex-row items-center "
        : "flex-col items-end "
      : " flex-col lg:flex-row";

  const searchLayout =
    Buttons.length > 1
      ? hasFilter
        ? isSmallDesktop
          ? "justify-end lg:w-[40%]"
          : "justify-between"
        : "justify-end"
      : hasFilter
      ? isSmallDesktop
        ? "justify-end lg:w-[100%]"
        : "justify-between"
      : "justify-end";

  return (
    <header
      className={`flex  justify-between w-full gap-3 py-4  ${HeaderLayout} `}
    >
      <ButtonLayout
        isOpenMobile={pageControl}
        OpenMobileControl={setPageControl}
        hasNavBack={hasNavBack}
        hasExport={hasExport}
        BackNavigationLink={BackNavigationLink}
        Buttons={Buttons}
      />

      <Searchbar hasFilter={hasFilter} searchLayout={searchLayout} />
    </header>
  );
}
