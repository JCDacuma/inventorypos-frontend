import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/index.css";

{
  /* ----- import Page ----- */
}
import Home from "./page/home.jsx";
import Dashboard from "./page/dashboard.jsx";
import InventoryReport from "./modules/inventory/pages/inventory_report.jsx";
import Inventory from "./modules/inventory/pages/inventory.jsx";
import BatchInventory from "./modules/inventory/pages/batch_inv.jsx";
import ProductOrders from "./modules/orders/pages/product_orders.jsx";
import CreateOrder from "./modules/orders/pages/order_create.jsx";
import RegisterUser from "./modules/account/pages/registerAccount.jsx";
import SalesReport from "./modules/pos/pages/sales_report.jsx";
import Settings from "./page/settings.jsx";
import Suppliers from "./modules/supplier/pages/suppliers.jsx";
import SupplierHistory from "./modules/orders/pages/order_history.jsx";
import RegisterSupplier from "./modules/supplier/pages/register_supplier.jsx";
import ProductManagement from "./modules/product/pages/product_manage.jsx";
import AddProduct from "./modules/product/pages/product_add.jsx";
import PromoManagement from "./modules/product/pages/product_managepromo.jsx";
import PointofSale from "./modules/pos/pages/point_of_sale.jsx";
import ConfigAccount from "./modules/account/pages/config_acc.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* First Page to show */}
        <Route path="/" element={<Home />}></Route>

        {/* Wrong path */}
        <Route path="*" element={<Navigate to="/" />}></Route>

        {/* Link Page */}
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/inventory-report" element={<InventoryReport />}></Route>
        <Route path="/inventory" element={<Inventory />}></Route>
        <Route path="/batch-inventory/:id" element={<BatchInventory />}></Route>
        <Route path="/product-orders" element={<ProductOrders />}></Route>
        <Route path="/create-order" element={<CreateOrder />}></Route>
        <Route path="/register-account" element={<RegisterUser />}></Route>
        <Route path="/sales-reports" element={<SalesReport />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/suppliers" element={<Suppliers />}></Route>
        <Route path="/order-history/:id" element={<SupplierHistory />}></Route>
        <Route path="/register-supplier" element={<RegisterSupplier />}></Route>
        <Route
          path="/product-management"
          element={<ProductManagement />}
        ></Route>
        <Route path="/product-add" element={<AddProduct />}></Route>
        <Route path="/promo-management" element={<PromoManagement />}></Route>
        <Route path="/point-of-sale" element={<PointofSale />}></Route>
        <Route path="/config-accounts" element={<ConfigAccount />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
