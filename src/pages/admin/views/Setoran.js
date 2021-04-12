import React from "react";
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
import NumberFormat from "react-number-format";

// components 

import CardTableSetoran from "../components/card/CardTableSetoran.js";

export default function Setoran() {
  const [open,setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
        <Modal open={open} onClose={onCloseModal}>
            <div className="w-full max-w-md">
              <h3 className="text-center">Setoran Harian</h3>
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block">
                    <span className="text-gray-700 text-sm font-bold mb-2">Nama Anggota : </span>
                    <select className="form-select mt-1 block w-full">
                      <option></option>
                      <option></option>
                      <option></option>
                    </select>
                  </label>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Jumlah Setoran : </label>
                  <NumberFormat thousandSeparator={true} prefix={'Rp.'} />
                  <label className="block text-gray-700 text-sm font-bold mb-2">Jumlah Denda : </label>
                  <NumberFormat thousandSeparator={true} prefix={'Rp.'} />
                  <label className="block text-gray-700 text-sm font-bold mb-2">Tanggal Bayar : </label>
                  <input type="date" name="tanggal_bayar" />
                </div>
                <div className="flex items-center justify-between">
                  <button className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Setor
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
          <CardTableSetoran color="light" />
        </div>
      </div>
    </>
  );
}