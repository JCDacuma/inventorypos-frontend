import { useState } from "react";
import Table from "../components/Table";
import MobileTable from "../components/MobileTable";

import { Warehouse } from "lucide-react";
import { Layout, MainWrapper } from "../components/Layout";
export default function SalesReport() {
  //Sample column
  const columns = [
    { key: "item", label: "Item" },
    { key: "sku", label: "SKU" },
    { key: "quantity", label: "Quantity" },
    { key: "price", label: "Price" },

    { key: "category", label: "Category" },
  ];

  //Sample fetch from database
  const data = [
    {
      item: "Apple iPhone 14",
      sku: "IP14-256BLK",
      quantity: 15,
      price: "$799",

      category: "Electronics",
    },
    {
      item: "Samsung Galaxy S23",
      sku: "SGS23-128WHT",
      quantity: 10,
      price: "$699",

      category: "Electronics",
    },
    {
      item: "Sony WH-1000XM5",
      sku: "SONYXM5-BLK",
      quantity: 8,
      price: "$349",

      category: "Audio",
    },
    {
      item: "Logitech MX Master 3S",
      sku: "LOGIMX3S-GRY",
      quantity: 20,
      price: "$99",

      category: "Accessories",
    },
    {
      item: "Apple MacBook Air M2",
      sku: "MBAIR-M2-13",
      quantity: 5,
      price: "$1199",

      category: "Computers",
    },
    {
      item: "Dell XPS 13",
      sku: "DELLXPS13-9310",
      quantity: 7,
      price: "$999",

      category: "Computers",
    },
    {
      item: "Bose QuietComfort 45",
      sku: "BOSEQC45-BLK",
      quantity: 12,
      price: "$329",

      category: "Audio",
    },
    {
      item: "Google Pixel 7",
      sku: "PIXEL7-128BLK",
      quantity: 9,
      price: "$599",

      category: "Electronics",
    },
    {
      item: "Anker PowerCore 10000",
      sku: "ANKERPC-10000",
      quantity: 30,
      price: "$25",

      category: "Accessories",
    },
    {
      item: "HP Envy 15",
      sku: "HPENVY15-2023",
      quantity: 4,
      price: "$1099",

      category: "Computers",
    },
    {
      item: "JBL Flip 6",
      sku: "JBLFLIP6-BLU",
      quantity: 18,
      price: "$129",

      category: "Audio",
    },
    {
      item: "Apple AirPods Pro 2",
      sku: "AIRPODSPRO2",
      quantity: 25,
      price: "$249",

      category: "Audio",
    },
    {
      item: "Samsung T7 SSD 1TB",
      sku: "SAMT7-1TB",
      quantity: 14,
      price: "$119",

      category: "Accessories",
    },
    {
      item: "Microsoft Surface Pro 9",
      sku: "SURFPRO9-256",
      quantity: 6,
      price: "$1299",

      category: "Computers",
    },
    {
      item: "Canon EOS M50 Mark II",
      sku: "CANONM50M2",
      quantity: 3,
      price: "$699",

      category: "Electronics",
    },
  ];

  return (
    <Layout currentWebPage="Sales Report">
      <MainWrapper>
          <MobileTable columns={columns} data={data} />
          <Table columns={columns} data={data} />
      </MainWrapper>
    </Layout>
  );
}
