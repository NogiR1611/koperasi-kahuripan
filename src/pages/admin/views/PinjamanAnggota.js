import React from "react";
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
import NumberFormat from "react-number-format";
import SuccessMessage from "./../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../components/Notification/ErrorMessage.js";
// components

import CardTablePinjamanAnggota from "../components/card/CardTablePinjamanAnggota.js";

export default function PinjamanAnggota() {
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
              <h3 className="text-center">Pinjaman Anggota</h3>
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block">
                    <span className="text-gray-700 font-bold mb-2">Nama Anggota : </span>
                    <select className="form-select mt-1 block w-full">
                      <option></option>
                      <option></option>
                      <option></option>
                    </select>
                  </label>
                  <label className="block text-gray-700 font-bold">Jumlah Pinjaman : </label>
                  <NumberFormat thousandSeparator={true} prefix={'Rp.'} />
                  <label className="block text-gray-700 font-bold">Provisi : </label>
                  <NumberFormat thousandSeparator={true} prefix={'Rp.'} />
                  <label className="block text-gray-700 font-bold">Sukarela : </label>
                  <NumberFormat thousandSeparator={true} prefix={'Rp.'} />
                  <label className="block text-gray-700 font-bold">Keterangan : </label>
                  <textarea cols="25" rows="5" name="jumlah pinjaman" id="" />
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
          <CardTablePinjamanAnggota color="light" />
        </div>
      </div>
    </>
  );
}