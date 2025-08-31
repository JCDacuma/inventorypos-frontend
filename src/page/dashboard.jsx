import Sidebar from "../components/sidebar";

export default function Dashboard() {
  return (
    <div>
      <div className="flex items-center  min-h-screen bg-gray-100">
        <Sidebar />
        {/*Dito lagay yung page layout*/}
        <div className="flex w-1/1  justify-center">
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center m-6 ">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              📊 Dashboard
            </h1>
            <p className="text-gray-500"> dashboard page</p>
          </div>
        </div>
      </div>
    </div>
  );
}
