import React from "react";
import SuccessMessage from "./../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../components/Notification/ErrorMessage.js";
import NumberFormat from "react-number-format";
import currencyFormatter from "currency-formatter";
import {Modal} from "react-responsive-modal";
import timestamp from "time-stamp";
import client from "../../../client";
 
// components

import CardTableAngsuran from "../components/card/CardTableAngsuran.js";

export default function Angsuran() {
  const [userId,setUserId] = React.useState(0);
  const [pinjamanId,setPinjamanId] = React.useState(0);
  const [jumlahAngsuran,setJumlahAngsuran] = React.useState(null);
  const [date,setDate] = React.useState(timestamp("YYYY-MM-DD HH:mm:ss"));
  const [kolektor,setkolektor] = React.useState(null);
  const [Notification,setNotification] = React.useState('');
  const [Items,setItems] = React.useState([]);
  const [open,setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const addAngsuran = () => {
    const data = {
      user_id : userId,
      amount : jumlahAngsuran,
      pinjaman_id : pinjamanId,
      paid_at : date
    };

    /*
    const reduceAmount = {
      id : pinjamanId,
      user_id : userId,
      amount : jumlahPinjaman-jumlahAngsuran      
    }
    */
   
    client.post('/api/angsuran',data)
    .then( res => {
      setNotification("berhasil");
    })
    .catch( err => {
      setNotification("gagal");
    })
  }

  React.useEffect(()=>{
    client.get('/api/pinjaman?with=user')
    .then( res => {
      const {data} = res.data;
      setItems(data);
    })
    .catch( err => console.log(err))
  },[])

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
        <Modal open={open} onClose={onCloseModal}>
            <div className="w-full max-w-md">
              {Notification === "berhasil" ? <SuccessMessage text="Data Berhasil Ditambah" /> : null}
              {Notification === "gagal" ? <ErrorMessage text="Mohon Lengkapi Formulir Anda" /> : null}
              <h3 className="text-center font-bold text-lg">Data Angsuran</h3>
              <form className="bg-white px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block">
                    <span className="text-gray-700 text-sm font-bold mb-2">Nama Peminjam : </span>
                    <select className="form-select mt-1 block w-full" value={userId} onChange={ (e) => setUserId(e.target.value) }>
                      <option className="text-gray-500" selected>Pilih Nama</option>
                      {Items.map( (element,index) => {
                        return (
                          <option key={index} value={element.user.id}>{element.user.name}</option>
                        )
                      })}
                    </select>
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block"> 
                    <span className="text-gray-700 text-sm font-bold mb-2">Nominal awal pinjaman : </span>
                    <select className="form-select mt-1 block w-full" value={pinjamanId} onChange={ (e) => setPinjamanId(e.target.value) }>
                      <option className="text-gray-500" selected>Pilih Nama dan Nominal</option>
                      {Items.map( (element,index) => {
                        return (
                          <option key={index} value={element.id}>
                            {element.user.name} - {currencyFormatter.format(element.amount,{ code : 'IDR' })}
                          </option>
                        )
                      })}
                    </select>
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Jumlah Angsuran : 
                  </label>
                  <NumberFormat
                    className="block w-full"
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
                    Tanggal Bayar : 
                  </label>
                  <input 
                    className="w-full"
                    type="date"
                    name=""
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label className="block">
                    <span className="text-gray-700 text-sm font-bold mb-2">Kolektor : </span>
                    <select onChange={ (e) => setkolektor(e.target.value) } value={kolektor} className="form-select mt-1 block w-full">
                      {Items.map( (element,index) => {
                        return (
                          <option key={index} value={element.user.id}>{element.user.role_id === 2 ? element.user.name : null }</option>
                        )
                      })}
                    </select>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={addAngsuran}
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