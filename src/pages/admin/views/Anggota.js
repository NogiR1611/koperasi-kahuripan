import React from "react";
import 'react-responsive-modal/styles.css';
import anggotaPDF from "./../GeneratorPDF/AnggotaPdf.js";
import SuccessMessage from "./../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../components/Notification/ErrorMessage.js";
import {Modal} from "react-responsive-modal";
// components

import CardTableAnggota from "../components/card/CardTableAnggota.js";
import axios from "axios";
import client from "../../../client";

export default function Anggota() {
  const [anggota,setAnggota] = React.useState('');
  const [Notification,setNotification] = React.useState('');
  const [item,setItem] = React.useState([]);
  const [kolektor,setkolektor] = React.useState('Fina');
  const [open,setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const addAnggota = () => {
    let data = {
      nama_anggota : anggota,
      kolektor : kolektor
    };
    client.post('anggota/tambah',data)
    .then( res => {
      setNotification("berhasil");
    })
    .catch( err => {
      setNotification("gagal");
    });
  }

  React.useEffect(() => {
    client.get('anggota/lihat')
    .then( res => {
        const {data} = res.data;
        setItem(data);
    })
    .catch( err => {
        console.log(err);
    })
  },[]);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4"> 
          <Modal open={open} onClose={onCloseModal}>
            <div className="w-full max-w-md">
              {Notification === "berhasil" ? <SuccessMessage /> : null}
              {Notification === "gagal" ? <ErrorMessage /> : null}
              <h3 className="text-center">Daftar Anggota</h3>
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nama Anggota : 
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={ e => setAnggota(e.target.value) }
                    id="nama_anggota"
                    name="nama_anggota"
                    type="text"
                    placeholder="Nama Anggota" 
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
                    onClick={addAnggota}
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
            onClick={ () => anggotaPDF(item)}
          >
            <img 
                src={require("./../../../assets/admin/icon/pdf.png").default}
                className="w-btn-add mr-1"
                alt=""
            />
            Generate PDF
          </button>
          <CardTableAnggota color="light" />
        </div>
      </div>
    </>
  );
}