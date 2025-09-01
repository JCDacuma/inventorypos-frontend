export default function MobileTable() {
  return (
    <div className="flex flex-col gap-3 md:hidden">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">row1 col1</h2>
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
            success
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-700">row1 col2</p>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          <div className="flex-1 min-w-[120px]">
            <dt className="text-slate-500">Column3</dt>
            <dd className="font-medium text-slate-800">row1 col3</dd>
          </div>
          <div className="flex-1 min-w-[120px]">
            <dt className="text-slate-500">Column5</dt>
            <dd className="font-medium text-slate-800">row1 col5</dd>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">row2 col1</h2>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
            pending
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-700">row2 col2</p>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          <div className="flex-1 min-w-[120px]">
            <dt className="text-slate-500">Column3</dt>
            <dd className="font-medium text-slate-800">row2 col3</dd>
          </div>
          <div className="flex-1 min-w-[120px]">
            <dt className="text-slate-500">Column5</dt>
            <dd className="font-medium text-slate-800">row2 col5</dd>
          </div>
        </div>
      </div>
    </div>
  );
}
