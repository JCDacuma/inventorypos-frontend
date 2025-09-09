import { useState } from "react";
import { Layout } from "../components/Layout";

export default function Dashboard() {
  const ClearlocalStorage = () => {
    localStorage.clear();
  };

  // Sidebar State
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Layout
      currentWebPage="Dashboard"
      style="items-center"
    >
      {/* Dito lagay yung page layout */}
      <div className="flex w-1/1 justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center m-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">📊 Dashboard</h1>
          <button
            className="p-4 bg-blue-400 rounded-2xl hover:bg-blue-900 text-white"
            onClick={ClearlocalStorage}
          >
            Clear localStorage
          </button>
        </div>
      </div>
    </Layout>
  );
}
