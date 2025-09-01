import Sidebar from "../components/sidebar";
import Table from "../components/Table";
import MobileTable from "../components/MobileTable";

export default function Inventory() {
  const columns = [
    { key: "col1", label: "col1" },
    { key: "col2", label: "col2" },
  ];

  const data = [{ col1: "row1", col2: "row2" }];

  return (
    <div className="w-full min-h-screen bg-gray-100 flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full h-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            📊 Inventory Page
          </h1>
          <MobileTable />
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}
