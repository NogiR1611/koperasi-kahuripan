import React from "react";
import SuccessMessage from "./../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../components/Notification/ErrorMessage.js";
import NumberFormat from "react-number-format";
import {Modal} from "react-responsive-modal";
 
// components

import CardTableAngsuran from "../components/card/CardTableAngsuran.js";

export default function Angsuran() {
  const [anggota,setAnggota] = React.useState('');
  const [jumlahPinjaman,setJumlahPinjaman] = React.useState(0);
  const [angsuranPokok,setAngsuranPokok] = React.useState(0);
  const [jumlahAngsuran,setJumlahAngsuran] = React.useState(0);
  const [sisaPinjaman,setSisaPinjaman] = React.useState(0);
  const [Notification,setNotification] = React.useState('');
  const [item,setItem] = React.useState([]);
  const [kolektor,setkolektor] = React.useState('Fina');
  const [open,setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
        <Modal open={open} onClose={onCloseModal}>
            <div className="w-full max-w-md">
              {Notification === "berhasil" ? <SuccessMessage /> : null}
              {Notification === "gagal" ? <ErrorMessage /> : null}
              <h3 className="text-center">Data Angsuran</h3>
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block">
                    <span className="text-gray-700 text-sm font-bold mb-2">Nama Anggota : </span>
                    <select onChange={ (e) => setkolektor(e.target.value) } value={kolektor} className="form-select mt-1 block w-full">
                      <option value=""></option>
                      <option value=""></option>
                      <option value=""></option>
                    </select>
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Jumlah Pinjaman Bulan ini : 
                  </label>
                  <NumberFormat
                    thousandSeparator={true}
                    prefix={'Rp.'}
                    value={jumlahPinjaman}
                    onValueChange={ (values) => {
                      const {value} = values;
                      setJumlahPinjaman(value)} 
                  }/>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Anggsuran Pokok : 
                  </label>
                  <NumberFormat
                    thousandSeparator={true}
                    prefix={'Rp.'}
                    value={angsuranPokok}
                    onValueChange={ (values) => {
                      const {value} = values;
                      setAngsuranPokok(value)} 
                  }/>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Jumlah Angsuran : 
                  </label>
                  <NumberFormat
                    thousandSeparator={true}
                    prefix={'Rp.'}
                    value={jumlahAngsuran}
                    onValueChange={ (values) => {
                      const {value} = values;
                      setJumlahAngsuran(value)} 
                  }/>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Sisa Pinjaman Bulan ini : 
                  </label>
                  <NumberFormat
                    thousandSeparator={true}
                    prefix={'Rp.'}
                    value={sisaPinjaman}
                    onValueChange={ (values) => {
                      const {value} = values;
                      setSisaPinjaman(value)} 
                  }/>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tanggal Bayar : 
                  </label>
                  <input 
                    type="date"
                    name=""
                    value=""
                  />
                </div>
                <div className="mb-6">
                  <label className="block">
                    <span className="text-gray-700 text-sm font-bold mb-2">Kolektor : </span>
                    <select onChange={ (e) => setkolektor(e.target.value) } value={kolektor} className="form-select mt-1 block w-full">
                      <option value="Sadikin">Ny.Sadikin</option>
                      <option value="Neneng">Ny.Neneng</option>
                      <option value="Fina">Ny.Fina</option>
                    </select>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Tambah
                  </button>
                </div>
              </form>
            </div>
          </Modal>
          <button
            onClick={onOpenModal}
            className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-gray-700 hover:text-gray-200 py-2 px-4 rounded inline-flex items-center"
          >
            <img 
                src={require("./../../../assets/admin/icon/add.png").default}
                className="w-btn-add mr-1"
                alt=""
            />
            Tambah
          </button>
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
          <CardTableAngsuran color="light" />
        </div>
      </div>
    </>
  );
}