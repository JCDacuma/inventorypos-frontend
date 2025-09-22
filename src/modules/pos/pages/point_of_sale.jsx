import { Layout } from "@/components/Layouts/Layout";

export default function PointofSale() {
  return (
    <Layout currentWebPage="Point of Sale" style="items-center">
      {/*Dito lagay yung page layout*/}
      <div className="flex justify-center w-1/1">
        <div className="w-full max-w-md p-8 m-6 text-center bg-white shadow-lg rounded-2xl ">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            📊 PointofSale Page
          </h1>
        </div>
      </div>
    </Layout>
  );
}
