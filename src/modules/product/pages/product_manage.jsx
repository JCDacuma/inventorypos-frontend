import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SweetAlert } from "@/utils/sweetalert.jsx";

// Page Layout component
import { Layout } from "@/components/Layouts/Layout.jsx";
import BatchControl from "@/components/Layouts/BatchControl.jsx";
import NavControl from "@/components/Layouts/pageControlsMobile.jsx";
import BatchEditProduct from "@/modules/product/components/ui/productBatchEditModal.jsx";
import AddCategoryModal from "@/modules/product/components/ui/productCategoryModal.jsx";
import UnitModal from "@/modules/product/components/ui/productUnitModal.jsx";
import ProductSupplierModal from "@/modules/product/components/ui/productSupplierModal.jsx";
import BatchAssignSupplierModal from "@/modules/product/components/ui/productBatchAssign.jsx";

//Table Layout component
import Table from "@/components/Layouts/table.jsx";
import TableHeader from "@/components/Layouts/tableHeader.jsx";
import MobileTable from "@/components/ui/MobileTable.jsx";
import {
  ProductStatus,
  SupplierChips,
} from "@/modules/product/components/ui/productStatus.jsx";
import { Action } from "@/components/ui/buttons.jsx";
import { Image } from "@/components/Layouts/image.jsx";

//Icons
import {
  SquarePen,
  Trash2,
  CirclePlus,
  ArchiveRestore,
  Truck,
} from "lucide-react";

//api
import {
  FetchProduct,
  updateProduct,
  BulkEditProduct,
} from "@/modules/product/api/productApi.jsx";
import { CategoryFetch } from "@/modules/product/api/categoryApi.jsx";
import { FetchUnit } from "@/modules/product/api/unitApi.jsx";

export default function ProductManagement() {
  const [pageControl, setPageControl] = useState(false); //Page control mobile state modal
  //fetched product
  const [products, setProducts] = useState([]);
  const [onSubmit, setOnSubmit] = useState(false);

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

  //Sample columns
  const columns = [
    { key: "Select", label: "" },
    { key: "productimage", label: "Image" },
    { key: "productcode", label: "Code" },
    { key: "productname", label: "Name" },
    { key: "category", label: "Category" },
    { key: "suppliercount", label: "Total Suppliers" },
    { key: "rawprice", label: "Raw Price" },
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
  ];

  //table data
  const Tabledata = useMemo(() => {
    return products.map((item) => ({
      id: item.id,
      productcode: item.product_code,
      productimage: <Image src={item.product_image} />,
      productname: item.productname,
      category: item.category_name,
      suppliercount: <SupplierChips counts={item.supplierCount} />,
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
              tooltip: "Edit product",
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () =>
                HandleOpenSupplier(item.id, item.productname, "SingleAssign"),
              icon: Truck,
              tooltip: "Assign supplier",
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () =>
                HandleArchivedDelete(item.id, "singleFn", "Archive"),
              icon: ArchiveRestore,
              tooltip: "Archive product",
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
            {
              onClick: () =>
                HandleArchivedDelete(item.id, "singleFn", "Delete"),
              icon: Trash2,
              tooltip: "Delete product",
              iconSize: "h-[1.2rem] w-[1.2rem]",
            },
          ]}
        />
      ),
    }));
  }, [products]);

  // ---------- Fetching category and unit Functionality ------------
  const [modalCategory, setModalCategory] = useState(false);
  const [modalUnit, setModalUnit] = useState(false);

  const [category, setCategory] = useState([]);
  const [units, setUnits] = useState([]);

  const FetchCategoryApi = async () => {
    await CategoryFetch(setCategory);
  };

  const FetchUnitApi = async () => {
    await FetchUnit(setUnits);
  };

  //---------------- Batch functionality --------------------
  const [selectedID, setSelectedID] = useState([]); //batch edit selected id
  const openBatchContol = selectedID.length > 0; //Batch Contol Modal State
  const [openEditBatch, setOpenEditBatch] = useState(false);

  //BatchControls
  const BatchControlBtn = [
    {
      btnLabel: "Edit",
      color: "bg-violet-500 ",
      icon: SquarePen,
      padding: "py-2 px-6",
      function: () => setOpenEditBatch(true),
    },
    {
      btnLabel: "Assign",
      color: "bg-[#2596be]/[0.69]",
      icon: Truck,
      padding: "py-2 px-6",
      function: () => HandleOpenSupplier(selectedID, "Products", "GroupAssign"),
    },

    {
      btnLabel: "Archieve",
      color: "bg-[#B36401]/[0.69]",
      icon: ArchiveRestore,
      padding: "py-2 px-6",
      function: () => HandleArchivedDelete(selectedID, "groupFn", "Archive"),
    },
    {
      btnLabel: "Delete",
      color: "bg-[#910B0B]/[0.69]",
      icon: Trash2,

      padding: "py-2 px-6",
      function: () => HandleArchivedDelete(selectedID, "groupFn", "Delete"),
    },
  ];

  // --------------- Archive and Delete -------------------
  const HandleArchivedDelete = async (id, fnType, actionType) => {
    if (onSubmit) return;

    const isArchive = actionType === "Archive";
    const actionText = isArchive ? "archive" : "delete";
    const actionTitle = isArchive ? "Archiving" : "Deleting";
    const isPlural = id.length > 1 ? "s" : "";

    // Confirm Action
    const result = await SweetAlert.Confirm(
      `${actionTitle} Product${isPlural}`,
      `Are you sure you want to ${actionText} the selected product${isPlural} ?`
    );
    if (!result.isConfirmed) return;

    // Group Function (Bulk)
    if (fnType === "groupFn") {
      if (!Array.isArray(id) || id.length === 0) {
        SweetAlert.info(
          "No Products Selected",
          `Please select at least one product to ${actionText}.`
        );
        return;
      }

      const request = {
        product_status: isArchive ? "Archived" : "Deleted",
      };

      setOnSubmit(true);
      try {
        await BulkEditProduct(id, request, FetchProducts);
        SweetAlert.success(
          isArchive ? "Archived" : "Deleted",
          `Selected product${isPlural} have been ${
            isArchive ? "archived" : "deleted"
          } successfully.`
        );
      } finally {
        setOnSubmit(false);
      }
      return;
    }

    // Single Function
    if (fnType === "singleFn") {
      const request = {
        id,
        status: isArchive ? "Archived" : "Deleted",
      };

      setOnSubmit(true);
      try {
        await updateProduct(request, FetchProducts);
        SweetAlert.success(
          `Successfully ${isArchive ? "archived" : "deleted"} product`,
          `The product has been ${
            isArchive ? "archived" : "deleted"
          } successfully.`
        );
      } finally {
        setOnSubmit(false);
      }
      return;
    }

    //  Unknown Function or Action Type
    SweetAlert.info(
      "Invalid Action",
      "Unknown function or action type. Please try again."
    );
  };

  // ------------ Product Supplier Functionality -----------------
  const [supplierModal, setOpenSupplierModal] = useState(false);
  const [batchSupplierModal, setBatchSupplierModal] = useState(false);
  const [selectedProductId, setProductId] = useState({
    id: null,
    productname: "",
  });

  //open product supplier modal
  const HandleOpenSupplier = (id, productname, assignType) => {
    if (!["SingleAssign", "GroupAssign"].includes(assignType)) return;

    setProductId({
      id: id,
      productname: productname,
      actionType: assignType,
    });

    if (assignType === "SingleAssign") {
      setOpenSupplierModal(true);
    } else if (assignType === "GroupAssign") {
      setBatchSupplierModal(true);
    }
  };

  // --------------- Rendering Functionality -------------------
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

      <BatchEditProduct
        isOpen={openEditBatch}
        onClosed={() => setOpenEditBatch(false)}
        //functionality
        FetchProducts={FetchProducts}
        FetchCategory={FetchCategoryApi}
        FetchUnit={FetchUnitApi}
        setOpenUnit={() => {
          setOpenEditBatch(false);
          setModalUnit(true);
        }}
        setOpenCategory={() => {
          setOpenEditBatch(false);
          setModalCategory(true);
        }}
        //Data
        selectedId={selectedID}
        category={category}
        units={units}
      />

      {/* Page Controls (Mobile Layout only) */}
      <NavControl
        onClosed={() => setPageControl(false)}
        isOpen={pageControl}
        hasExport={true}
        Buttons={PageBtnControls}
      />

      {/* Modal Unit and Category */}
      <AddCategoryModal
        onClosed={() => {
          setModalCategory(false);
          setOpenEditBatch(true);
        }}
        isOpen={modalCategory}
        refetch={FetchCategoryApi}
        fetchedCategory={category}
      />

      <UnitModal
        onClosed={() => {
          setModalUnit(false);
          setOpenEditBatch(true);
        }}
        isOpen={modalUnit}
        refetch={FetchUnitApi}
        FetchUnit={units}
      />

      {/* --------------  Supplier Modal  ------------------ */}
      <ProductSupplierModal
        onClosed={() => setOpenSupplierModal(false)}
        isOpen={supplierModal}
        productId={selectedProductId}
        fetchProducts={FetchProducts}
      />

      <BatchAssignSupplierModal
        onClosed={() => setBatchSupplierModal(false)}
        isOpen={batchSupplierModal}
        product={selectedProductId}
        fetchProducts={FetchProducts}
      />
    </Layout>
  );
}
