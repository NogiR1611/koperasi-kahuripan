import React from "react";
 
// components

import CardTablePengeluaran from "../components/card/CardTablePengeluaran.js";

export default function Pengeluaran() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTablePengeluaran color="light" />
        </div>
      </div>
    </>
  );
}