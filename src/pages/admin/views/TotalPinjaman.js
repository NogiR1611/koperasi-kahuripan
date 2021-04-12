import React from "react";
 
// components

import CardTableTotalPinjaman from "../components/card/CardTableTotalPinjaman.js";

export default function TotalPinjaman() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableTotalPinjaman color="light" title="Simpanan Wajib" />
        </div>
      </div>
    </>
  );
}