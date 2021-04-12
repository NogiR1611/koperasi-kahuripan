import React from "react";

import CardTableRekap from "../components/card/CardTableRekap.js";

export default function Rekap() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableRekap color="light" />
        </div>
      </div>
    </>
  );
}