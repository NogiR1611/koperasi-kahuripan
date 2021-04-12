import React from "react";
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
 
// components

import CardTableKolektor from "../components/card/CardTableKolektor.js";

export default function Kolektor() { 
  const [open,setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
        <Modal open={open} onClose={onCloseModal}>
            <div className="w-full max-w-md">
              <h3 className="text-center">Daftar Kolektor</h3>
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block">
                    <span className="text-gray-700 text-sm font-bold mb-2">Nama Anggota</span>
                    <select className="form-select mt-1 block w-full rounded-lg">
                      <option>Ny.Sadikin</option>
                      <option>Ny.Neneng</option>
                      <option>Ny.Fina</option>
                    </select>
                  </label>
                </div>  
                <div className="mb-6">
                  <label className="text-gray-700 text-sm font-bold mb-2">Tanggal Bergabung Menjadi Anggota : </label>
                  <input className="w-full rounded-lg border-2" type="date" id="registration_date" name="registration_date" />
                </div>
                <div className="flex items-center justify-between">
                  <button className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Tambah
                  </button>
                </div>
              </form>
            </div>
          </Modal>
          <button
            className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-gray-700 hover:text-gray-200 py-2 px-4 rounded inline-flex items-center"
            onClick={onOpenModal}
          >
            <img 
                src={require("./../../../assets/admin/icon/add.png").default}
                className="w-btn-add mr-1"
                alt=""
            />
            Tambah
          </button>
          <CardTableKolektor color="light" />
        </div>
      </div>
    </>
  );
}