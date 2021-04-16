import React from "react";
 
// components

import CardTableBagiSHU from "../components/card/CardTableBagiSHU.js";

export default function BagiSHU() {

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <button
              className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-blue-700 hover:text-gray-200 py-2 px-4 ml-4 mb-2 rounded inline-flex items-center"
              type="button"
            >
            <img 
              src={require("./../../../assets/admin/icon/pdf.png").default}
              className="w-btn-add mr-1"
              alt=""
            />
            Generate PDF
          </button>
          <CardTableBagiSHU color="light" />
        </div>
      </div>
    </>
  );
}