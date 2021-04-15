import React from "react";
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
import SuccessMessage from "./../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../components/Notification/ErrorMessage.js";
 
// components

import CardTableInventaris from "../components/card/CardTableInventaris.js";

export default function Inventaris() {
  const [open,setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [Notification,setNotification] = React.useState("");

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
        <Modal open={open} onClose={onCloseModal}>
            <div className="w-full max-w-md">
              {Notification === "berhasil" ? <SuccessMessage /> : null}
              {Notification === "gagal" ? <ErrorMessage /> : null}
              <h3 className="text-center">Tambah Inventaris</h3>
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Nama Barang : </label>
                <input type="text" name="" id="" />
                <label className="block text-gray-700 text-sm font-bold mb-2">Jumlah : </label>
                <input type="number" name="" id="" />
                <label className="block text-gray-700 text-sm font-bold mb-2">Tanggal Pembelian : </label>
                <input type="date" name="tanggal_bayar" />
                <label className="block text-gray-700 text-sm font-bold mb-2">Kondisi : </label>
                <input type="text" name="" id="" />
                <label className="block text-gray-700 text-sm font-bold mb-2">Posisi : </label>
                <input type="text" name="" id="" />
                <div className="flex items-center justify-between">
                  <button className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
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
          <button
              className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-blue-700 hover:text-gray-200 py-2 px-4 ml-4 rounded inline-flex items-center"
              type="button"
          >
          <img 
              src={require("./../../../assets/admin/icon/pdf.png").default}
              className="w-btn-add mr-1"
              alt=""
          />
            Generate PDF
          </button>
          <CardTableInventaris color="light" />
        </div>
      </div>
    </>
  );
}