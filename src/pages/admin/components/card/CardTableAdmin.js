import React from 'react';
import moment from 'moment';
import { DatetimePickerTrigger } from "rc-datetime-picker";
import client from '../../../../client.js';
import AjaxTable from './../table/AjaxTable.js';
import 'react-responsive-modal/styles.css';
import AnggotaPdf from "./../../GeneratorPDF/AnggotaPdf.js";
import {Modal} from "react-responsive-modal";
import {format} from "date-fns";
import SuccessMessage from "./../../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../../components/Notification/ErrorMessage.js";
import { setDate } from 'date-fns/fp';

//components
// import TableDropdown from './dropdown/TableDropdown.js';

export default function CardTableAdmin({ color,updateData }){
    const mmnt = moment();
    const table = React.createRef();
    const [token,setToken] = React.useState(null);
    const [Items,setItems] = React.useState([]);
    const [itemPdf,setItemPdf] = React.useState([]);
    const [error,setError] = React.useState(null);
    const [userId,setUserId] = React.useState(null);
    const [groupId, setGroupId] = React.useState(null);
    const [username,setUsername] = React.useState(null);
    const [date,setDate] = React.useState(null);
    const [adminName,setAdminName] = React.useState(null);
    const [password,setPassword] = React.useState(null);
    const [confirmPassword,setConfirmPassword] = React.useState(null);
    const [notification,setNotification] = React.useState(null);
    const [kolektor,setKolektor] = React.useState([]);
    const [openAddAnggota,setOpenAddAnggota] = React.useState(false);
    const [openEditAdmin,setOpenEditAdmin] = React.useState(false);
    const [openEditAnggota,setOpenEditAnggota] = React.useState(false);
    const [openData,setOpenData] = React.useState(false);
    const [openActive,setOpenActive] = React.useState(false);
    
    const onCloseAddAnggota = () => {
        setOpenAddAnggota(false)
    }

    const onCloseEditAnggota = () => {
        setOpenEditAnggota(false)
    }

    const onCloseData = () => {
        setOpenData(false)
        setNotification(null)
    }

    const onCloseEditAdmin = () => {
        setOpenEditAdmin(false)
        setNotification(null)
    }
    
    const onCloseActive = () => {
        setOpenActive(false)
    }

    const AddAnggota = () => {
        const data = {
            username : username,
            role_id : 3,
            group_id : groupId
        }

        client.post('/api/user',data)
        .then( res => {
            setNotification("berhasil tambah");
        })
        .catch( err => {
            setNotification("gagal tambah");
            setError(err.response.data.username.toString());
        })
    }

    const EditAnggota = (userId) => {
        const data = {
            username : username,
            created_at : date,
            role_id : 3
        }

        client.put(`/api/user/${userId}`,data)
        .then( res => {
            setNotification("berhasil edit anggota")
        })
        .catch( err => {
            setNotification("gagal edit anggota")
        })
    }

    const DeleteUser = userId => {
        client.delete(`/api/user/${userId}`)
        .then(res => {
            setNotification("berhasil hapus");
        })
        .catch( err => {
            setNotification("gagal hapus");
        })
    }

    const EditAdmin = (userId) => {
        if(password !== confirmPassword){
            alert("Harap Samakan Password Anda!");
        }
        else{
            const data = {
                id : userId,
                username : adminName,
                password : password,
                role_id : 1
            };

            client.put(`/api/user/${userId}`,data)
            .then( res => {
                setNotification("berhasil edit admin");
            })
            .catch( err => {
                setNotification("gagal edit admin");
            })
        }
    }

    React.useEffect(() => {
        client.get('/api/user')
        .then( res => {
            const {data} = res.data
            setItems(data);
        })
        .catch( err => console.log(err))
    },[]);

    React.useEffect(() => {
        let state = localStorage.getItem("TOKEN_KEY");
        setToken(state);
    },[]);

    React.useEffect(() => {
        if (updateData[0]) {
            table.current.reload().then(() => updateData[1](false));
        }
    }, [updateData[0]])

    React.useEffect(() => {
        client.get(`/api/user?token=${token}`)
        .then( res => {
            const {data} = res.data;
            console.log(data);
            setItemPdf(data);
        })
        .catch( err => console.log(err));
    },[]);

    React.useEffect(() => {
        client.get(`/api/groups?select=groups.*;(select count(*) from users where group_id = groups.id) as users_count&token=${token}`)
        .then( res => {
            const {data} = res.data;
            setKolektor(data);
        })
        .catch( err => console.log(err))
    },[]);

    const reportAnggota = itemPdf.filter( element => element.group_id === groupId );

    return (
        <>
            <div
                className={
                "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                }
            >
                <Modal open={openAddAnggota} onClose={onCloseAddAnggota}>
                    <div className="min-w-max" style={{minWidth : '380px' }}>
                        <h3 className="text-center font-bold text-lg">Tambah Anggota</h3>
                        <div className="block w-full overflow-x-auto mt-10">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nama : </label>
                                <input
                                    className="w-full"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block">
                                    <span className="text-gray-700 text-sm font-bold mb-2">Kolektor : </span>
                                    <select className="form-select mt-1 block w-full rounded-lg" value={groupId} onChange={ (e) => setGroupId(e.target.value) } >
                                    <option className="text-gray-500" selected>Pilih Nama Kolektor</option>
                                        {kolektor.map( (element,index ) => {
                                            return (
                                                <option key={index} value={element.id}>{element.display_name}</option>
                                            )
                                        })}
                                    </select>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => {
                                        AddAnggota()
                                        setOpenAddAnggota(false)
                                    }}
                                >
                                    Tambah
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal open={openEditAnggota} onClose={onCloseEditAnggota}>
                    <div className="min-w-max" style={{minWidth : '380px' }}>
                        <h3 className="text-center font-bold text-lg">Edit Anggota</h3>
                        <div className="block w-full overflow-x-auto mt-10">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nama : </label>
                                <input
                                    className="w-full"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Tanggal Daftar : </label>
                                <DatetimePickerTrigger
                                    moment={mmnt}
                                    onChange={moment => setDate(moment.format('DD-MM-YYYY HH:mm:ss'))}
                                >
                                    <input
                                        className="w-full"
                                        type="text"
                                        value={date}
                                        readOnly
                                    />
                                </DatetimePickerTrigger>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => {
                                        EditAnggota(userId)
                                        setOpenEditAnggota(false)
                                    }}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal open={openData} onClose={onCloseData}>   
                    {notification === "berhasil tambah" ? <SuccessMessage text="Data Berhasil Ditambah" /> : ''}
                    {notification === "gagal tambah" ? <ErrorMessage text={error} /> : ''}
                    {notification === "berhasil" ? <SuccessMessage text="Data Berhasil Dinonaktifkan" /> : null}
                    {notification === "gagal" ? <ErrorMessage text="Maaf Data Gagal Dinonaktifkan" /> : null}
                    {notification === "berhasil edit anggota" ? <SuccessMessage text="Data berhasil di Edit" /> : null }
                    {notification === "gagal edit anggota" ? <ErrorMessage text="Mohon Lengkapi Formulir Anda" /> : null }
                    <div className="max-w-screen-lg">
                        <h3 className="text-center font-bold text-lg mb-2">Data Anggota</h3>
                        <button
                            className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-gray-700 hover:text-gray-200 py-2 px-2 rounded inline-flex items-center"
                            onClick={() => setOpenAddAnggota(true)}
                        >
                            <img 
                                src={require("./../../../../assets/admin/icon/add.png").default}
                                className="w-btn-add mr-1"
                                alt=""
                            />
                            Tambah
                        </button>
                        <button
                            className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-blue-700 hover:text-gray-200 py-2 px-4 ml-4 rounded inline-flex items-center"
                            type="button"
                            onClick={() => AnggotaPdf(reportAnggota)}
                        >
                        <img 
                            src={require("./../../../../assets/admin/icon/pdf.png").default}
                            className="w-btn-add mr-1"
                            alt=""
                        />
                            Generate PDF
                        </button>
                        <div className="block w-full overflow-x-auto mt-5">
                            <AjaxTable                            
                                ref={el => table.current = el}
                                url={`/api/user?search=group_id = ${groupId}`}
                                headers={['No','Nama','Tanggal Daftar','Status','Aksi']}
                                color="light"
                                columns={[
                                    {
                                        render: ({ rowIndex }) => rowIndex + 1
                                    },
                                    {
                                        render: ({ element: { username } }) => username,
                                    },
                                    {
                                        render: ({ element: { created_at } }) => format(new Date(created_at),'dd-MM-yyyy'),
                                    },
                                    {
                                        render: ({ element: { status } }) => status
                                    },
                                    {
                                        render: ({ element: { id,username,created_at,status }}) => (
                                            <>
                                                <button
                                                    className="mx-3"
                                                    onClick={() => {
                                                        setUserId(id)
                                                        setUsername(username)
                                                        setDate(format(new Date(created_at),'dd-MM-yyyy hh:ii:ss'))
                                                        setOpenEditAnggota(true)
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="mx-3"
                                                >
                                                    { status === 'active' ? 'Nonaktifkan' : 'Aktifkan' }
                                                </button>
                                            </>
                                        )
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </Modal>
                <Modal center open={openActive} onClose={onCloseActive}>
                    <form className="bg-white px-8 pt-6 pb-8 mb-4">
                        <label className="block text-lg font-bold">Apa anda yakin ingin menghapus akun ini ?</label>
                        <div className="inline-block mx-auto mt-2">
                            <button
                                className="inline-block px-2 py-2 mx-14 rounded-lg bg-green-400 transition duration-500 ease-in-out shadow-md font-bold hover:bg-green-700"
                                type="button"
                                onClick={() => {    
                                    setOpenActive(false)
                                    DeleteUser(userId)
                                }}>
                                Iya
                            </button>
                            <button
                                className="inline-block px-2 py-2 mx-14 rounded-lg bg-red-400 transition duration-500 ease-in-out shadow-md font-bold hover:bg-red-700"
                                type="button" 
                                onClick={onCloseActive}
                            >
                                Tidak Jadi
                            </button>
                        </div>
                    </form>
                </Modal>
                <Modal open={openEditAdmin} onClose={onCloseEditAdmin}>
                    <div className="min-w-max" style={{minWidth : '380px' }}>
                        <h3 className="text-center font-bold text-lg">Edit Admin</h3>
                        <div className="block w-full overflow-x-auto mt-3">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nama : </label>
                                <input
                                    className="w-full"
                                    type="text"
                                    value={adminName}
                                    onChange={(e) => setAdminName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password : </label>
                                <input
                                    className="w-full"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Konfirmasi Password : </label>
                                <input
                                    className="w-full"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => {
                                        EditAdmin(userId)
                                        setOpenEditAdmin(false)
                                    }}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3
                            className={
                            "font-semibold text-lg " +
                            (color === "light" ? "text-blueGray-700" : "text-white")
                            }
                        >
                            Data Admin
                        </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {notification === "berhasil edit admin" ? <SuccessMessage text="Data berhasil di Edit" /> : '' }
                    {notification === "gagal edit admin" ? <ErrorMessage text="Mohon Lengkapi Formulir Anda" /> : '' }
                    {notification === "berhasil hapus" ? <SuccessMessage text="Data berhasil di Hapus" /> : '' }
                    {notification === "gagal hapus" ? <ErrorMessage text="Maaf Data Gagal Dihapus" /> : '' }
                    <AjaxTable 
                        ref={el => table.current = el}
                        url={`/api/groups?select=groups.*;(select count(*) from users where group_id = groups.id) as users_count&token=${token}`}
                        headers={['No.','Pengguna','Anggota','Tanggal Daftar','Aksi']}
                        color="light"
                        columns={[
                            {
                                render: ({ rowIndex }) => rowIndex + 1
                            },
                            {
                                render: ({ element : { display_name } }) => display_name,
                            },
                            {
                                render: ({ element : { id, users_count } }) => (
                                    <>
                                        <button
                                            className="border border-blueGray-500 rounded-lg p-2"
                                            onClick={() => {
                                                setOpenData(true)
                                                setGroupId(id)
                                            }}
                                        >
                                            {users_count}
                                        </button>
                                    </>
                                ),
                            },
                            {
                                render: ({ element : { created_at } }) => format(new Date(created_at),'dd-MM-yyyy'),
                            },
                            {
                                render: ({ element : { id,display_name } }) => (
                                    <>
                                        <button
                                            className="mx-3"
                                            onClick={() => {
                                                setGroupId(id)
                                                setOpenEditAdmin(true)
                                                setAdminName(display_name)
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="mx-3"
                                            onClick={() => {
                                                setGroupId(id)
                                                setAdminName(display_name)
                                                setOpenActive(true)
                                            }}
                                        >
                                            Hapus
                                        </button>
                                    </>
                                )
                            }
                        ]}
                    />
                </div>
            </div>
        </>
    );
}