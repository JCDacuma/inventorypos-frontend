import React from "react";
import ButtonLayout from "@/components/Layouts/pageControlButtons.jsx";
import Searchbar from "@/components/ui/Searchbar.jsx";

export default function TableHeader({
  pageControl,
  setPageControl,
  Buttons = [],
  hasFilter = false,
  hasExport = false,
  hasNavBack = false,
  BackNavigationLink = "",
}) {
  return (
    <header className="flex flex-col items-end justify-between w-full gap-3 py-4 lg:items-center lg:flex-row ">
      <ButtonLayout
        isOpenMobile={pageControl}
        OpenMobileControl={setPageControl}
        hasNavBack={hasNavBack}
        hasExport={hasExport}
        BackNavigationLink={BackNavigationLink}
        Buttons={Buttons}
      />

      <Searchbar hasFilter={hasFilter} />
    </header>
  );
}
