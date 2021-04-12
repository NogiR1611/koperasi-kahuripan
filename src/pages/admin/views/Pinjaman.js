import React from "react";
 
// components
import CardTableDataPeminjaman from "../components/card/CardTableDataPeminjaman.js";

export default function Pinjaman() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableDataPeminjaman color="light" />
        </div>
      </div>
    </>
  );
}