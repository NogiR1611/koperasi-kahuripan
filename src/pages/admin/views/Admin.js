import React from "react";
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
import AdminPdf from "../GeneratorPDF/AdminPdf.js";
import CardTableAdmin from "../components/card/CardTableAdmin.js";
import SuccessMessage from "./../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../components/Notification/ErrorMessage.js";
import client from "../../../client";

export default function DataAdmin() {
    const [user,setUser] = React.useState([]);
    const [userId,setUserId] = React.useState(null);
    const [items,setItems] = React.useState([]);
    const [kolektorName,setKolektorName] = React.useState(null);
    const [token,setToken] = React.useState(null);
    const [error,setError] = React.useState(null);
    const [updateData,setUpdateData] = React.useState(false);
    const [Notification,setNotification] = React.useState('');
    const [idName,setIdName] = React.useState(0);
    const [image,setImage] = React.useState(null);
    const [openAdmin,setOpenAdmin] = React.useState(false);
    const [openKolektor,setOpenKolektor] = React.useState(false);
    const [username,setUsername] = React.useState('');
    const [password,setPassword] = React.useState(''); 
    const [confirmPassword,setConfirmPassword] = React.useState('');
    const onOpenAdmin = () => setOpenAdmin(true);
    const onOpenKolektor = () => setOpenKolektor(true);
    const onCloseAdmin = () => setOpenAdmin(false);
    const onCloseKolektor = () => setOpenKolektor(false);
    
    const addKolektor = () => {
        const data = {
            display_name : kolektorName,
            user_id : userId
        }
    
        client.post('/api/groups',data)
        .then( res => {
            setNotification("berhasil tambah kolektor")
        })
        .catch( err => {
            setNotification("gagal tambah kolektor");
        })
    }

    const register = () => {
        if(idName === "" || username === "" || password === ""){
            alert("harap lengkapi formulir pendaftaran")
        }

        if(password !== confirmPassword){
            alert("harap samakan password dengan konfirmasi password!")
        }

        else{
            const data = {
                username : username,
                password : password,
                role_id : 1
            };

            client.post('/api/user',data)
            .then( res => {
                setOpenAdmin(false)
                setNotification("berhasil tambah admin")
            })
            .catch( err => {
                setError(err.response.data.password.toString())
                setNotification("gagal tambah admin")
            })
      }
    }

    React.useEffect(() => {
        let state = localStorage.getItem("TOKEN_KEY");
        setToken(state);
    },[]);

    React.useEffect(() => {
        client.get('/api/user')
        .then( res => {
            const {data} = res.data;
            setItems(data);
        })
        .catch( err => {
            console.log(err)
        })
    },[]);
    
    return (
        <>
        <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 px-4">
                <Modal open={openAdmin} onClose={onCloseAdmin}>
                    <div className="w-full max-w-md">
                        <h3 className="text-center font-bold text-lg">Daftar Admin</h3>
                        {Notification === "gagal tambah admin" ? <ErrorMessage text={error} /> : ''}
                        <form className="bg-white px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label className="text-gray-700 text-sm font-bold mb-2">Username : </label>
                                <input type="text" className="form-select mt-1 block w-full rounded-lg" onChange={ (e) => setUsername(e.target.value)} value={username} />
                            </div>
                            <div className="mb-6">
                                <label className="text-gray-700 text-sm font-bold mb-2">Password : </label>
                                <input onChange={ (e) => setPassword(e.target.value) }
                                    className="w-full rounded-lg border-2"
                                    type="password"
                                    id="password"
                                    name="password" 
                                />
                            </div>
                            <div className="mb-6">
                                <label className="text-gray-700 text-sm font-bold mb-2">Konfirmasi Password : </label>
                                <input
                                    onChange={ (e) => setConfirmPassword(e.target.value) }
                                    className="w-full rounded-lg border-2"
                                    type="password"
                                    id="confirm_password"
                                    name="confirm_password"
                                />
                            </div>
                        <div className="flex items-center justify-between">
                        <button
                            onClick={register}
                            className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                        >
                            Tambah
                        </button>
                        </div>
                    </form>
                    </div>
                </Modal>
                <Modal open={openKolektor} onClose={onCloseKolektor}>
                <div className="min-w-max" style={{minWidth : '380px' }}>
                  <h3 className="text-center font-bold text-lg">Tambah Kolektor</h3>
                    <div className="block w-full overflow-x-auto mt-10">
                    <div className="mb-6">
                      <label className="block">
                        <span className="text-gray-700 text-sm font-bold mb-2">Nama Anggota : </span>
                        <select className="form-select mt-1 block w-full rounded-lg" value={userId} onChange={ (e) => setUserId(e.target.value) } >
                          <option className="text-gray-500" selected>Pilih Nama Anggota</option>
                            {items.filter( element => element.role_id === 1 ).map( (element,index ) => {
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
                    className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-gray-700 hover:text-gray-200 py-2 px-4 rounded inline-flex items-center mr-4"
                    onClick={onOpenAdmin}
                >
                    <img 
                        src={require("./../../../assets/admin/icon/add.png").default}
                        className="w-btn-add mr-1"
                        alt=""
                    />
                    Tambah Admin
                </button>
                <button
                    className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-gray-700 hover:text-gray-200 py-2 px-4 rounded inline-flex items-center"
                    onClick={onOpenKolektor}
                >
                    <img 
                        src={require("./../../../assets/admin/icon/add.png").default}
                        className="w-btn-add mr-1"
                        alt=""
                    />
                    Tambah Kolektor
                </button>
                <button
                    className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-blue-700 hover:text-gray-200 py-2 px-4 ml-4 mb-2 rounded inline-flex items-center"
                    type="button"
                    onClick={() => AdminPdf(items)}
                >
                    <img 
                        src={require("./../../../assets/admin/icon/pdf.png").default}
                        className="w-btn-add mr-1"
                        alt=""
                    />
                    Generate PDF
                </button>
                {Notification === "berhasil tambah kolektor" ? <SuccessMessage text="Kolektor Telah Ditambah" /> : ''}
                {Notification === "gagal tambah kolektor" ? <ErrorMessage text="Maaf Kolektor Gagal Ditambah" /> : ''}
                {Notification === "berhasil tambah admin" ? <SuccessMessage text="Admin Berhasil Ditambahkan" /> : ''}
                <CardTableAdmin color="light" updateData={[updateData,setUpdateData]} />
            </div>
        </div>
        </>
    );
}