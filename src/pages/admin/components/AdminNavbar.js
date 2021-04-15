import React from "react";

import UserDropdown from "./dropdown/UserDropdown.js";

export default function Navbar() {
  React.useEffect(() => {
    let date = new Date();
    let parseDate = date.getDate();
    let thisDay = date.getDay();
    let parseMonth = date.getMonth();
    let parseYear = date.getFullYear();
    let month = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    let day = ["Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"];

    document.getElementById("date").innerHTML = day[thisDay] + "," + parseDate + " " + month[parseMonth] + " " + parseYear;
  });

  return (
    <>
      {/* Navbar */}
      <nav className="bg-lightBlue-600 top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
          
          </a>
          <div className="md:flex text-white flex-row lg:ml-auto mr-8">
              <span className="mr-1">
                <i className="fas fa-table"></i>
              </span>
            <p className="inline-block" id="date"></p>
          </div>
          {/* Form */}
          {/*
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
          */}
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}