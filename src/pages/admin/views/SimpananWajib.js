import React from "react";
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
import {format} from "date-fns";
import NumberFormat from "react-number-format";
import SuccessMessage from "./../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../components/Notification/ErrorMessage.js";
 
// components

import CardTableSimpananWajib from "../components/card/CardTableSimpananWajib.js";
import client from "../../../client";

export default function SimpananWajib() {
  const [namaAnggota,setNamaAnggota] = React.useState(0);
  const [simpanan,setSimpanan] = React.useState(2);
  const [jumlahSimpanan,setJumlahSimpanan] = React.useState(18000);
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
              {Notification === "berhasil" ? <SuccessMessage /> : null}
              {Notification === "gagal" ? <ErrorMessage /> : null}
              <h3 className="text-center">Simpanan Wajib Bulan ini</h3>
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block">
                    <span className="text-gray-700 text-sm font-bold mb-2">Nama Anggota : </span>
                    <select className="form-select mt-1 block w-full rounded-lg" value={namaAnggota} onChange={ (e) => setNamaAnggota(e.target.value) } >
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
                    <select className="form-select mt-1 block w-full rounded-lg" value={simpanan} onChange={ (e) => setSimpanan(e.target.value) } >
                      {Tipe.map( (element,index) => {
                        return (
                          <option key={index} value={element.id}>{element.name}</option>
                        )
                      })}
                    </select>
                  </label>
                </div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Jumlah Simpanan : </label>
                <NumberFormat
                  thousandSeparator={true}
                  prefix={'Rp.'}
                  value={jumlahSimpanan}
                  onValueChange={ (values) => {
                    const {value} = values;
                    setJumlahSimpanan(value)} 
                }/>
                <label className="block text-gray-700 text-sm font-bold mb-2">Tanggal Bayar : </label>
                <input
                  type="date"
                  value={date}
                  onChange={ (e) => setDate(e.target.value) }
                />
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
          <CardTableSimpananWajib color="light" />
        </div>
      </div>
    </>
  );
}