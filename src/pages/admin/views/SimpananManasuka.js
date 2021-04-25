import React from "react";
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
import {format} from "date-fns";
import NumberFormat from "react-number-format";
import SuccessMessage from "./../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../components/Notification/ErrorMessage.js";
 
// components

import CardTableSimpananManasuka from "../components/card/CardTableSimpananManasuka.js";
import client from "../../../client";

export default function SimpananManasuka() {
  const [namaAnggota,setNamaAnggota] = React.useState(0);
  const [simpanan,setSimpanan] = React.useState(0);
  const [jumlahSimpanan,setJumlahSimpanan] = React.useState(0);
  const [Users,setUsers] = React.useState([]);
  const [Tipe,setTipe] = React.useState([]);
  const [Notification,setNotification] = React.useState("");
  const [date,setDate] = React.useState(format(new Date(),"yyyy-MM-dd"));
  const [open,setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const addSimpanan = () => {
    const data = {
      user_id : namaAnggota,
      amount : jumlahSimpanan,
      type_id : simpanan,
      created_at : date
    }

    client.post('/api/simpanan',data)
    .then( res => {
      setNotification("berhasil");
    })
    .catch( err => {
      setNotification("gagal");
    });
  }

  React.useEffect(() => {
    client.get('/api/user')
    .then( res => {
      const {data} = res.data;
      setUsers(data);
    })
    .catch( err => console.log(err));

    client.get('/api/simpanan_tipe')
    .then( res => {
      setTipe(res.data);
    })
    .catch(err => console.log(err));

  },[]);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
        <Modal open={open} onClose={onCloseModal}>
            <div className="w-full max-w-md">
              {Notification === "berhasil" ? <SuccessMessage text="Data Berhasil Ditambahkan" /> : null}
              {Notification === "gagal" ? <ErrorMessage text="Mohon Lengkapi Formulir Anda" /> : null}
              <h3 className="text-center font-bold text-lg">Simpanan Manasuka Bulan ini</h3>
              <form className="bg-white px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block">
                    <span className="text-gray-700 text-sm font-bold mb-2">Nama Anggota : </span>
                    <select className="form-select mt-1 block w-full rounded-lg" onChange={ (e) => setNamaAnggota(e.target.value) } >
                      <option className="text-gray-500" selected>Pilih Nama Anggota</option>
                      {Users.map( (element,index) => {
                        return (
                          <option key={index} value={element.id}>{element.name}</option>
                        )
                      })}
                    </select>
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block">
                    <span className="text-gray-700 text-sm font-bold mb-2">Jenis Simpanan : </span>
                    <select className="form-select mt-1 block w-full rounded-lg" onChange={ (e) => setSimpanan(e.target.value) }>
                      <option className="text-gray-500" selected>Pilih Jenis Simpanan</option>
                      {Tipe.map( (element,index) => {
                        return (
                          <option key={index} value={element.id}>{element.name}</option>
                        )
                      })}
                    </select>
                  </label>
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Jumlah Simpanan : </label>
                  <NumberFormat
                    thousandSeparator={true}
                    prefix={'Rp.'}
                    value={jumlahSimpanan}
                    onValueChange={ (values) => {
                      const {value} = values;
                      setJumlahSimpanan(value)} 
                  }/>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Tanggal Bayar : </label>
                  <input
                    type="date"
                    value={date}
                    onChange={ (e) => setDate(e.target.value) }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={addSimpanan}
                  >
                    Simpan
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
          <CardTableSimpananManasuka color="light"/>
        </div>
      </div>
    </>
  );
}