import React from "react";
 
// components

import CardTableSimpanan from "../components/card/CardTableSimpanan.js";

export default function PenarikanTunai() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableSimpanan color="light" title="Penarikan Tunai" />
        </div>
      </div>
    </>
  );
}