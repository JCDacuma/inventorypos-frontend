import { Layout } from "../Layouts/Layout";

export default function PointofSale() {
  return (
    <Layout currentWebPage="Point of Sale" style="items-center">
      {/*Dito lagay yung page layout*/}
      <div className="flex w-1/1  justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center m-6 ">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            📊 PointofSale Page
          </h1>
        </div>
      </div>
    </Layout>
  );
}
