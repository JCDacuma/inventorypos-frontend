import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

// Page Layout component
import { Layout } from "@/components/Layouts/Layout.jsx";
import ButtonLayout from "@/components/Layouts/pageControlButtons.jsx";
import { useMediaQuery } from "react-responsive";
import BatchControl from "@/components/Layouts/BatchControl.jsx";
import NavControl from "@/components/Layouts/pageControlsMobile.jsx";

//Table Layout component
import Table from "@/components/Layouts/table.jsx";
import TableHeader from "@/components/Layouts/tableHeader.jsx";
import MobileTable from "@/components/ui/MobileTable.jsx";
import { ProductStatus } from "@/modules/product/components/ui/productStatus.jsx";
import { Action } from "@/components/ui/buttons.jsx";
import { Image } from "@/components/Layouts/image.jsx";

//Animation
import { motion, AnimatePresence } from "framer-motion";

//Icons
import {
  SquarePen,
  Trash2,
  Megaphone,
  CirclePlus,
  ArchiveRestore,
} from "lucide-react";

//api
import { FetchProduct } from "@/modules/product/api/productApi.jsx";

export default function ProductManagement() {
  //Selected Id
  const [selectedID, setSelectedID] = useState([]);
  const openBatchContol = selectedID.length > 0; //Batch Contol Modal State
  const [pageControl, setPageControl] = useState(false); //Page control mobile state modal

  //fetched product
  const [products, setProducts] = useState([]);

  const isSmallMobile = useMediaQuery({ maxWidth: 375 });
  const navigation = useNavigate();

  //fetch product
  const FetchProducts = async () => {
    await FetchProduct(setProducts);
  };

  useEffect(() => {
    FetchProducts();
  }, [FetchProduct]);

  // Table Action functionality
  //edit prouct
  const HandleEdit = (id) => {
    navigation(`/product-add/${id}`);
  };

  //soft remove
  const HandleRemove = (items, id) => {
    alert(`remove ${items} id: ${id}`);
  };

  const Archieved = () => {};

  //BatchControls
  const BatchControlBtn = [
    {
      btnLabel: "Edit",
      color: "bg-violet-500 ",
      icon: SquarePen,
      padding: "py-2 px-6",
    },
    {
      btnLabel: "Remove",
      color: "bg-[#910B0B]/[0.69]",
      icon: Trash2,
      padding: "py-2 px-6",
    },
  ];

  //Sample columns
  const columns = [
    { key: "Select", label: "" },
    { key: "productimage", label: "Image" },
    { key: "productcode", label: "Code" },
    { key: "productname", label: "Name" },
    { key: "category", label: "Category" },
    { key: "rawprice", label: "Raw Price" },
    { key: "markupprice", label: "Mark up" },
    { key: "sellingprice", label: "Selling Price" },
    { key: "taxable", label: "tax" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  //Page Controls
  const PageBtnControls = [
    {
      BtnLabel: "Add Product",
      iconControl: CirclePlus,
      to: "/product-add/register",
    },
    {
      BtnLabel: "Promo",
      iconControl: Megaphone,
      to: "/promo-management",
    },
  ];

  //table data
  const Tabledata = useMemo(() => {
    return products.map((item) => ({
      id: item.id,
      productcode: item.product_code,
      productimage: <Image src={item.product_image} />,
      productname: item.productname,
      category: item.category_name,
      rawprice: `₱ ${item.raw_price}`,
      markupprice: `% ${item.markup_price}`,
      sellingprice: `₱ ${item.selling_price}`,
      taxable: item.taxable ? "Yes" : "No",
      status: <ProductStatus status={item.product_status} />,
      action: (
        <Action
          buttons={[
            {
              onClick: () => HandleEdit(item.id),
              icon: SquarePen,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => Archieved(),
              icon: ArchiveRestore,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () => HandleRemove(item.id, item.productname),
              icon: Trash2,
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    }));
  }, [products]);

  return (
    <Layout currentWebPage="Manage Product">
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
          <MobileTable
            columns={columns}
            data={Tabledata}
            selectedID={selectedID}
            setSelectedId={setSelectedID}
          />
        </div>
        <div className="hidden md:block">
          <Table
            columns={columns}
            data={Tabledata}
            setSelectedId={setSelectedID}
            selectedID={selectedID}
          />
        </div>
      </div>

      {/* Batch Contol */}
      <BatchControl
        clearId={() => setSelectedID([])}
        Count={selectedID.length}
        Buttons={BatchControlBtn}
        openBatchContol={openBatchContol}
      />

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
