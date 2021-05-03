import React from "react";
import moment from 'moment';
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
import SuccessMessage from "./../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../components/Notification/ErrorMessage.js";
import {DatetimePickerTrigger} from "rc-datetime-picker";
import {format} from "date-fns";
import client from "../../../client.js";
// components

import CardTableInventaris from "../components/card/CardTableInventaris.js";

export default function Inventaris() {
  const mmnt = moment();
  const [open,setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [namaBarang,setNamaBarang] = React.useState("");
  const [jumlah,setJumlah] = React.useState(0);
  const [date,setDate] = React.useState(format(new Date(),"yyyy-MM-dd"));
  const [kondisi,setKondisi] = React.useState("");
  const [posisi,setPosisi] = React.useState("");
  const [Notification,setNotification] = React.useState("");

  const onSubmit = () => {
    const data = {
      nama_inventaris : namaBarang,
      jumlah : jumlah,
      tanggal_pembelian : date,
      kondisi : kondisi,
      posisi : posisi
    };

    client.post('/api/inventaris',data)
    .then( res => {
      setNotification("berhasil");
      setOpen(false)
    })
    .catch( err => {
      setNotification("gagal");
      setOpen(false)
    });
  }

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
            <Modal open={open} onClose={onCloseModal}>
                <div className="w-full max-w-md">
                  <h3 className="text-center font-bold text-lg">Tambah Inventaris</h3>
                  <form className="bg-white px-8 pt-6 pb-8 mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nama Barang : </label>
                    <input type="text" value={namaBarang} onChange={ (e) => setNamaBarang(e.target.value) } name="" id="" />
                    <label className="block text-gray-700 text-sm font-bold mb-2">Jumlah : </label>
                    <input type="number" value={jumlah} onChange={ (e) => setJumlah(e.target.value) } name="" id="" />
                    <label className="block text-gray-700 text-sm font-bold mb-2">Tanggal Pembelian : </label>
                    <DatetimePickerTrigger
                      moment={mmnt}
                      onChange={moment => setDate(moment.format('YYYY-MM-DD'))}
                    >
                      <input
                        className="w-full"
                        type="text"
                        value={date}
                        readOnly
                      />
                    </DatetimePickerTrigger>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Kondisi : </label>
                    <input type="text" value={kondisi} onChange={ (e) => setKondisi(e.target.value) } name="" id="" />
                    <label className="block text-gray-700 text-sm font-bold mb-2">Posisi : </label>
                    <input type="text" value={posisi} onChange={ (e) => setPosisi(e.target.value) } name="" id="" />
                    <div className="flex items-center justify-between">
                      <button
                        className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={onSubmit}
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
            Tambah cuk
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
          {Notification === "berhasil" ? <SuccessMessage text="Inventaris Berhasil Ditambah" /> : null}
          {Notification === "gagal" ? <ErrorMessage text="'Maaf Inventaris Gagal Ditambah" /> : null}
          <CardTableInventaris color="light" />
        </div>
      </div>
    </>
  );
}