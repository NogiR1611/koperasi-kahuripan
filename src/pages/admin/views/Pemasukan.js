import React from "react";
 
// components

import CardTablePemasukan from "../components/card/CardTablePemasukan.js";

export default function Pemasukan() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTablePemasukan color="light" />
        </div> 
      </div>
    </>
  );
}