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
      icon = <CheckCircle2 className="h-5 w-5 text-emerald-600 opacity-90" />;
      classes = "ring-emerald-300/40 bg-emerald-400/10 text-emerald-900/90";
      break;
    case "warning":
      icon = <AlertTriangle className="h-5 w-5 text-amber-600 opacity-90" />;
      classes = "ring-amber-300/40 bg-amber-400/10 text-amber-900/90";
      break;
    case "error":
      icon = <AlertCircle className="h-5 w-5 text-rose-600 opacity-90" />;
      classes = "ring-rose-300/40 bg-rose-400/10 text-rose-900/90";
      break;
    default:
      icon = <Info className="h-5 w-5 text-blue-600 opacity-90" />;
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
        <div className="flex justify-center items-center gap-1">
          <p>Active</p>
          <div className="w-2 h-2 rounded-4xl bg-green-600 mb-2"></div>
        </div>
      );
    case "Inactive":
      return (
        <div className="flex justify-center items-center gap-1">
          <p>Inactive</p>
          <div className="w-2 h-2 rounded-4xl bg-red-600 mb-2"></div>
        </div>
      );
    default:
      <p></p>;
  }
}

//Promo Status
export function PromoStatus({ status }) {
  switch (status) {
    case "Active":
      return (
        <div className="flex justify-center items-center gap-1">
          <p>Active</p>
          <div className="w-2 h-2 rounded-4xl bg-green-600 mb-2"></div>
        </div>
      );

    case "Upcoming":
      return (
        <div className="flex justify-center items-center gap-1">
          <p>Upcoming</p>
          <div className="w-2 h-2 rounded-4xl bg-cyan-600 mb-2"></div>
        </div>
      );
    case "Ended":
      return (
        <div className="flex justify-center items-center gap-1">
          <p>Ended</p>
          <div className="w-2 h-2 rounded-4xl bg-yellow-600 mb-2"></div>
        </div>
      );
    case "Inactive":
      return (
        <div className="flex justify-center items-center gap-1">
          <p>Inactive</p>
          <div className="w-2 h-2 rounded-4xl bg-red-600 mb-2"></div>
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
        <div className="flex justify-center items-center gap-1">
          <p>In Stock</p>
          <div className="h-2 w-2 rounded-4xl bg-green-600 mb-2"></div>
        </div>
      );
    case "Low Stock":
      return (
        <div className="flex justify-center items-center gap-1">
          <p>Low Stock</p>
          <div className="h-2 w-2 rounded-4xl bg-amber-500 mb-2"></div>
        </div>
      );
    case "Out of Stock":
      return (
        <div className="flex justify-center items-center gap-1">
          <p>Out of Stock</p>
          <div className="h-2 w-2 rounded-4xl bg-red-500 mb-2"></div>
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
        <div className="flex justify-center items-center gap-1">
          <p>Active</p>
          <div className="h-2 w-2 rounded-4xl bg-green-600 mb-2"></div>
        </div>
      );
    case "Expired":
      return (
        <div className="flex justify-center items-center gap-1">
          <p>Expired</p>
          <div className="h-2 w-2 rounded-4xl bg-cyan-500 mb-2"></div>
        </div>
      );
    case "Low Stock":
      return (
        <div className="flex justify-center items-center gap-1">
          <p>Low Stock</p>
          <div className="h-2 w-2 rounded-4xl bg-amber-500 mb-2"></div>
        </div>
      );
    case "Out of Stock":
      return (
        <div className="flex justify-center items-center gap-1">
          <p>Out of Stock</p>
          <div className="h-2 w-2 rounded-4xl bg-red-500 mb-2"></div>
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
        <div className="flex justify-center items-center gap-1">
          <p className="text-yellow-600 font-semibold">Pending</p>
          <div className="h-3 w-3 rounded-full bg-yellow-500 shadow-md"></div>
        </div>
      );
    case "Ordered":
      return (
        <div className="flex justify-center items-center gap-1">
          <p className="text-blue-600 font-semibold">Ordered</p>
          <div className="h-3 w-3 rounded-full bg-blue-500 shadow-md"></div>
        </div>
      );
    case "In Transit":
      return (
        <div className="flex justify-center items-center gap-1">
          <p className="text-indigo-600 font-semibold">In Transit</p>
          <div className="h-3 w-3 rounded-full bg-indigo-500 shadow-md"></div>
        </div>
      );
    case "Partially Received":
      return (
        <div className="flex justify-center items-center gap-1">
          <p className="text-orange-600 font-semibold">Partially Received</p>
          <div className="h-3 w-3 rounded-full bg-orange-500 shadow-md"></div>
        </div>
      );
    case "Received":
      return (
        <div className="flex justify-center items-center gap-1">
          <p className="text-green-600 font-semibold">Received</p>
          <div className="h-3 w-3 rounded-full bg-green-500 shadow-md"></div>
        </div>
      );
    case "Cancelled":
      return (
        <div className="flex justify-center items-center gap-1">
          <p className="text-red-600 font-semibold">Cancelled</p>
          <div className="h-3 w-3 rounded-full bg-red-500 shadow-md"></div>
        </div>
      );
    case "Returned":
      return (
        <div className="flex justify-center items-center gap-1">
          <p className="text-gray-700 font-semibold">Returned</p>
          <div className="h-3 w-3 rounded-full bg-gray-600 shadow-md"></div>
        </div>
      );
    default:
      return <p></p>;
  }
}
