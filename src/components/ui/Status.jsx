import { Info, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

//Registration user Status
export function Status({
  type = "info",
  message = "Message here",
  style = "",
}) {
  let icon, classes;

  switch (type) {
    case "success":
      icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 opacity-90" />;
      classes = "ring-emerald-300/40 bg-emerald-400/10 text-emerald-900/90";
      break;
    case "warning":
      icon = <AlertTriangle className="w-5 h-5 text-amber-600 opacity-90" />;
      classes = "ring-amber-300/40 bg-amber-400/10 text-amber-900/90";
      break;
    case "error":
      icon = <AlertCircle className="w-5 h-5 text-rose-600 opacity-90" />;
      classes = "ring-rose-300/40 bg-rose-400/10 text-rose-900/90";
      break;
    default:
      icon = <Info className="w-5 h-5 text-blue-600 opacity-90" />;
      classes = "ring-blue-300/40 bg-blue-400/10 text-blue-900/90";
  }

  return (
    <div className={`flex items-center justify-center ${style}`}>
      <div
        className={`m-3
        w-full max-w-4xl rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg ring-1 p-4 ${classes} 
      `}
      >
        <div className="flex items-start gap-3">
          {icon}
          <div className="flex-1">
            {message && <p className="text-sm text-slate-800/90">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

//Product Status
export function ProductStatus({ status }) {
  switch (status) {
    case "Active":
      return (
        <div className="flex items-center justify-center gap-1">
          <span>Active</span>
          <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
        </div>
      );
    case "Inactive":
      return (
        <div className="flex items-center justify-center gap-1">
          <span>Inactive</span>
          <span className="inline-block w-2 h-2 bg-red-600 rounded-full"></span>
        </div>
      );
    default:
      return null;
  }
}

//Promo Status
export function PromoStatus({ status }) {
  switch (status) {
    case "Active":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>Active</p>
          <div className="w-2 h-2 mb-2 bg-green-600 rounded-4xl"></div>
        </div>
      );

    case "Upcoming":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>Upcoming</p>
          <div className="w-2 h-2 mb-2 rounded-4xl bg-cyan-600"></div>
        </div>
      );
    case "Ended":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>Ended</p>
          <div className="w-2 h-2 mb-2 bg-yellow-600 rounded-4xl"></div>
        </div>
      );
    case "Inactive":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>Inactive</p>
          <div className="w-2 h-2 mb-2 bg-red-600 rounded-4xl"></div>
        </div>
      );
    default:
      <p></p>;
  }
}

//Inventory Status
export function InventoryStatus({ status }) {
  switch (status) {
    case "In Stock":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>In Stock</p>
          <div className="w-2 h-2 mb-2 bg-green-600 rounded-4xl"></div>
        </div>
      );
    case "Low Stock":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>Low Stock</p>
          <div className="w-2 h-2 mb-2 rounded-4xl bg-amber-500"></div>
        </div>
      );
    case "Out of Stock":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>Out of Stock</p>
          <div className="w-2 h-2 mb-2 bg-red-500 rounded-4xl"></div>
        </div>
      );
    default:
      return <p></p>;
  }
}

//Inventory Status
export function BatchStockStatus({ status }) {
  switch (status) {
    case "Active":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>Active</p>
          <div className="w-2 h-2 mb-2 bg-green-600 rounded-4xl"></div>
        </div>
      );
    case "Expired":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>Expired</p>
          <div className="w-2 h-2 mb-2 rounded-4xl bg-cyan-500"></div>
        </div>
      );
    case "Low Stock":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>Low Stock</p>
          <div className="w-2 h-2 mb-2 rounded-4xl bg-amber-500"></div>
        </div>
      );
    case "Out of Stock":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>Out of Stock</p>
          <div className="w-2 h-2 mb-2 bg-red-500 rounded-4xl"></div>
        </div>
      );
    default:
      return <p></p>;
  }
}

//Order Management status
export function OrderManagementStatus({ status }) {
  switch (status) {
    case "Pending":
      return (
        <div className="flex items-center justify-center gap-1">
          <p className="font-semibold text-yellow-600">Pending</p>
          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-md"></div>
        </div>
      );
    case "Ordered":
      return (
        <div className="flex items-center justify-center gap-1">
          <p className="font-semibold text-blue-600">Ordered</p>
          <div className="w-3 h-3 bg-blue-500 rounded-full shadow-md"></div>
        </div>
      );
    case "In Transit":
      return (
        <div className="flex items-center justify-center gap-1">
          <p className="font-semibold text-indigo-600">In Transit</p>
          <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-md"></div>
        </div>
      );
    case "Partially Received":
      return (
        <div className="flex items-center justify-center gap-1">
          <p className="font-semibold text-orange-600">Partially Received</p>
          <div className="w-3 h-3 bg-orange-500 rounded-full shadow-md"></div>
        </div>
      );
    case "Received":
      return (
        <div className="flex items-center justify-center gap-1">
          <p className="font-semibold text-green-600">Received</p>
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-md"></div>
        </div>
      );
    case "Cancelled":
      return (
        <div className="flex items-center justify-center gap-1">
          <p className="font-semibold text-red-600">Cancelled</p>
          <div className="w-3 h-3 bg-red-500 rounded-full shadow-md"></div>
        </div>
      );
    case "Returned":
      return (
        <div className="flex items-center justify-center gap-1">
          <p className="font-semibold text-gray-700">Returned</p>
          <div className="w-3 h-3 bg-gray-600 rounded-full shadow-md"></div>
        </div>
      );
    default:
      return <p></p>;
  }
}

//Supplier Status
export function SupplierStatus({ status }) {
  switch (status) {
    case "Active":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>Active</p>
          <div className="w-2 h-2 mb-2 bg-green-600 rounded-4xl"></div>
        </div>
      );
    case "Inactive":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>Inactive</p>
          <div className="w-2 h-2 mb-2 bg-orange-500 rounded-4xl"></div>
        </div>
      );

    default:
      return <p></p>;
  }
}

//OrderHistoryStatus
export function OrderHistoryStatus({ status }) {
  switch (status) {
    case "Received":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>Recieved</p>
          <div className="w-2 h-2 mb-2 bg-green-600 rounded-4xl"></div>
        </div>
      );
    case "Cancelled":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>Cancelled</p>
          <div className="w-2 h-2 mb-2 bg-red-500 rounded-4xl"></div>
        </div>
      );
    case "Returned":
      return (
        <div className="flex items-center justify-center gap-1">
          <p>Returned</p>
          <div className="w-2 h-2 mb-2 rounded-4xl bg-cyan-500"></div>
        </div>
      );

    default:
      return <p></p>;
  }
}
