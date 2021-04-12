import React from "react";
 
// components

import CardTableSimpanan from "../components/card/CardTableTotalSimpanan.js";

export default function SimpananWajib() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableSimpanan color="light" title="Simpanan Wajib" />
        </div>
      </div>
    </>
  );
}