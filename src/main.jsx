import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/index.css";

{
  /* ----- import Page ----- */
}
import Home from "./page/home.jsx";
import Dashboard from "./page/dashboard.jsx";
import InventoryReport from "./page/inventory_report.jsx";
import Inventory from "./page/inventory.jsx";
import BatchInventory from "./page/batch_inv.jsx";
import ProductOrders from "./page/product_orders.jsx";
import RegisterAccount from "./page/register_acc.jsx";
import SalesReport from "./page/sales_report.jsx";
import Settings from "./page/settings.jsx";
import Suppliers from "./page/suppliers.jsx";
import SupplierHistory from "./page/supplier_history.jsx";
import ProductManagement from "./page/product_manage.jsx";
import PromoManagement from "./page/product_managepromo.jsx";
import PointofSale from "./page/point_of_sale.jsx";
import ConfigAccount from "./page/config_acc.jsx";

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
        <Route path="/register-account" element={<RegisterAccount />}></Route>
        <Route path="/sales-reports" element={<SalesReport />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/suppliers" element={<Suppliers />}></Route>
        <Route
          path="/suppliers-history/:id"
          element={<SupplierHistory />}
        ></Route>
        <Route
          path="/product-management"
          element={<ProductManagement />}
        ></Route>
        <Route path="/promo-management" element={<PromoManagement />}></Route>
        <Route path="/point-of-sale" element={<PointofSale />}></Route>
        <Route path="/config-accounts" element={<ConfigAccount />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
