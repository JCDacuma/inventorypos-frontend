import { Info, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

export default function Status({
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
