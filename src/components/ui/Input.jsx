export default function Input({ 
    type = "text",
    placeholder = "Type here..." 
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-2xl border pl-9 border-slate-300 bg-white py-2.5 pr-10 text-sm shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
    />
  );
}
