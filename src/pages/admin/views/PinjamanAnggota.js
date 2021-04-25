import React from "react";
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
import timestamp from "time-stamp";
import NumberFormat from "react-number-format";
import SuccessMessage from "./../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../components/Notification/ErrorMessage.js";
import client from "../../../client";
// components

import CardTablePinjamanAnggota from "../components/card/CardTablePinjamanAnggota.js";

export default function PinjamanAnggota() {
  const [open,setOpen] = React.useState(false);
  const [Users,setUsers] = React.useState([]);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [name,setName] = React.useState(0);
  const [jumlahPinjaman,setJumlahPinjaman] = React.useState(null);
  const [date,setDate] = React.useState(timestamp("YYYY-MM-DD HH:mm:ss"));
  const [Notification,setNotification] = React.useState("");

  const addPinjaman = () => {
    const data = {
      user_id : name,
      amount : jumlahPinjaman,
      borrowed_at : date,
    }

    client.post('/api/pinjaman',data)
    .then(res => {
      setNotification("berhasil")
    })
    .catch(err => {
      setNotification("gagal")
    })
  }
  
  React.useEffect(() => {
    client.get('/api/user')
    .then( res => {
      const {data} = res.data;
      setUsers(data);
    })
    .catch( err => console.log(err))
  },[])

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
        <Modal open={open} onClose={onCloseModal}>
            <div className="w-full max-w-md">
              {Notification === "berhasil" ? <SuccessMessage text="Data Berhasil di tambahkan" /> : null}
              {Notification === "gagal" ? <ErrorMessage text="Mohon Lengkapi Formulir Anda" /> : null}
              <h3 className="text-center font-bold text-lg">Pinjaman Anggota</h3>
              <form className="bg-white px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block">
                    <span className="text-gray-700 font-bold mb-2">Nama Anggota : </span>
                        <select className="form-select mt-1 block w-full" onChange={(e) => setName(e.target.value)}>
                          <option className="text-gray-500" selected>Pilih Nama Anggota</option>
                          {Users.map( (element,index) => {
                            return (
                                <option key={index} value={element.id}>{element.name}</option>
                            )
                          })
                        }
                      </select>
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">Jumlah Pinjaman : </label>
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
                  <label className="block text-gray-700 font-bold mb-2">Tanggal Pinjam : </label>
                  <input
                    className="w-full"
                    type="date"
                    value={date}
                    onChange={ (e) => setDate(e.target.value) }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={addPinjaman}
                    className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
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