import React from "react";
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
import KolektorPDF from "./../GeneratorPDF/KolektorPDF.js";
import SuccessMessage from "./../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../components/Notification/ErrorMessage.js";
 
// components

import CardTableKolektor from "../components/card/CardTableKolektor.js";
import client from "../../../client";
 
export default function Kolektor() {
  const [item,setItem] = React.useState([]);
  const [user,setUser] = React.useState([]);
  const [displayName,setDisplayName] = React.useState(0);
  const [kolektorName,setKolektorName] = React.useState(null);
  const [openKolektor,setOpenKolektor] = React.useState(false);
  const [token,setToken] = React.useState(null);
  const [updateData,setUpdateData] = React.useState(false);
  const [Notification,setNotification] = React.useState('');
  const onCloseKolektor = () => setOpenKolektor(false);
 
  const addKolektor = () => {
    const data = {
        display_name : kolektorName,
        user_id : displayName
    }

    client.post('/api/groups',data)
    .then( res => {
        setNotification("berhasil tambah")
    })
    .catch( err => {
        setNotification("gagal tambah");
    })
  }

  React.useEffect(() => {
    let state = localStorage.getItem("TOKEN_KEY");
    setToken(state);
  },[]);

  React.useEffect(() => {
    client.get(`/api/user?with=group&token=${token}`)
    .then( res => {
        const {data} = res.data;
        setUser(data);
    })
    .catch( err => console.log(err))
  },[]);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
            <Modal open={openKolektor} onClose={onCloseKolektor}>
                <div className="min-w-max" style={{minWidth : '380px' }}>
                  <h3 className="text-center font-bold text-lg">Tambah Kolektor</h3>
                    <div className="block w-full overflow-x-auto mt-10">
                    <div className="mb-6">
                      <label className="block">
                        <span className="text-gray-700 text-sm font-bold mb-2">Nama Anggota : </span>
                        <select className="form-select mt-1 block w-full rounded-lg" value={displayName} onChange={ (e) => setDisplayName(e.target.value) } >
                          <option className="text-gray-500" selected>Pilih Nama Anggota</option>
                            {user.map( (element,index ) => {
                              return (
                                <option key={index} value={element.id}>{element.username}</option>
                              )
                            })}
                          </select>
                        </label>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nama Calon Kolektor : </label>
                          <input
                            className="w-full"
                            type="text"
                            value={kolektorName}
                            onChange={(e) => setKolektorName(e.target.value)}
                          />
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={() => {
                            addKolektor()
                            setOpenKolektor(false)
                          }}
                        >
                          Tambah
                        </button>
                      </div>
                    </div>
                  </div>
                </Modal>
          <button
            className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-gray-700 hover:text-gray-200 py-2 px-4 rounded inline-flex items-center"
            onClick={() => setOpenKolektor(true)}
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
            onClick={() => KolektorPDF(item)}
          >
          <img 
            src={require("./../../../assets/admin/icon/pdf.png").default}
            className="w-btn-add mr-1"
            alt=""
          />
            Generate PDF
          </button>
          {Notification === "berhasil tambah" ? <SuccessMessage text="Data Berhasil Ditambahkan" /> : ''}
          {Notification === "gagal tambah" ? <ErrorMessage text="Data Gagal Ditambahkan" /> : ''}
          <CardTableKolektor color="light" updateData={[updateData,setUpdateData]} />
        </div>
      </div>
    </>
  );
}