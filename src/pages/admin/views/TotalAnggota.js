import React from "react";
 
// components

import CardTableTotalAnggota from "../components/card/CardTableTotalAnggota.js";

export default function KasAnggota() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableTotalAnggota color="light" />
          <label className="block text-gray-700 text-sm font-bold mb-2">Total : </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">Anggota Masuk : </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">Anggota Keluar : </label>
        </div>
      </div>
    </>
  );
}