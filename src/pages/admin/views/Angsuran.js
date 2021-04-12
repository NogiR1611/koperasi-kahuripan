import React from "react";
 
// components

import CardTableAngsuran from "../components/card/CardTableAngsuran.js";

export default function Angsuran() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableAngsuran color="light" />
        </div>
      </div>
    </>
  );
}