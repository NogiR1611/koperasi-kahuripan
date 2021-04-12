import React from "react";
 
// components

import CardTableBagiSHU from "../components/card/CardTableBagiSHU.js";

export default function BagiSHU() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableBagiSHU color="light" />
        </div>
      </div>
    </>
  );
}