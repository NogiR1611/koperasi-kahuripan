import React from 'react';
import moment from "moment";
import { DatetimePickerTrigger } from "rc-datetime-picker";
import client from '../../../../client';
import AjaxTable from './../table/AjaxTable.js';
import 'react-responsive-modal/styles.css';
import AnggotaPdf from "./../../GeneratorPDF/AnggotaPdf.js";
import {format} from "date-fns";
import {Modal} from "react-responsive-modal";
import SuccessMessage from "./../../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../../components/Notification/ErrorMessage.js";

//components
// import TableDropdown from './dropdown/TableDropdown.js';

export default function CardTableKolektor({ color,updateData }){
    const mmnt = moment();
    const table = React.createRef();
    const [user,setUser] = React.useState([]);
    const [inStatus,setInStatus] = React.useState(true);
    const [itemPdf,setItemPdf] = React.useState([]);
    const [groupId, setGroupId] = React.useState(null);
    const [userId,setUserId] = React.useState(null);
    const [kolektor,setKolektor] = React.useState([]);
    const [kolektorName,setKolektorName] = React.useState(null);
    const [name,setName] = React.useState(null);
    const [role,setRole] = React.useState(null);
    const [date,setDate] = React.useState(null);
    const [token,setToken] = React.useState(null);
    const [notification,setNotification] = React.useState('');
    const [error,setError] = React.useState();
    const [openData,setOpenData] = React.useState(false);
    const [openAddAnggota,setOpenAddAnggota] = React.useState(false);
    const [openEditKolektor,setOpenEditKolektor] = React.useState(false);
    const [openEditAnggota,setOpenEditAnggota] = React.useState(false);
    const [openActive,setOpenActive] = React.useState(false);
    const onCloseAddAnggota = () => setOpenAddAnggota(false);
    const onCloseData = () => {
        setOpenData(false)
        setNotification(null)
    };
    const onCloseEditAnggota = () =>setOpenEditAnggota(false);
    const onCloseEditKolektor = () => {
        setOpenEditKolektor(false)
        setNotification(null)
    }
    const onCloseActive = () => setOpenActive(false);

    const EditKolektor = (groupId) => {
        const data = {
            user_id : groupId,
            display_name : kolektorName
        };

        client.put(`/api/groups/${groupId}`,data)
        .then( res => {
            setNotification("berhasil edit kolektor");
        })
        .catch( err => {
            setNotification("gagal edit kolektor");
        })
    }

    const AddAnggota = () => {
        const data = {
            username : name,
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
            id : userId,
            username : name,
            created_at : date,
            role_id : 3
        }

        client.put(`/api/user/${userId}`,data)
        .then( res => {
            setNotification("berhasil edit anggota");
        })
        .catch( err => {
            setNotification("gagal edit anggota");
        })
    }

    const inactiveItem = (userId) => {
        const data = {
            username : name,
            role_id : role,
            status : 'inactive'
        }

        client.put(`/api/user/${userId}`,data)
        .then( res => {
            setNotification("berhasil")     
            setOpenActive(false)
        })
        .catch( err => setNotification("gagal"));
    }

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
        client.get(`/api/user?with=group&token=${token}`)
        .then( res => {
            const {data} = res.data;
            setUser(data);
        })
        .catch( err => console.log(err))
    },[]);

    React.useEffect(() => {
        client.get(`/api/user?token=${token}`)
        .then( res => {
            const {data} = res.data;
            console.log(data);
            setItemPdf(data);
        })
        .catch( err => console.log(err));
    },[]);

    const reportAnggota = itemPdf.filter( element => element.group_id === groupId );

    React.useEffect(() => {
        client.get(`/api/groups?select=groups.*;(select count(*) from users where group_id = groups.id) as users_count&token=${token}`)
        .then( res => {
            const {data} = res.data;
            setKolektor(data);
        })
        .catch( err => console.log(err))
    },[]);

    return (
        <>
            <div
                className={
                "relative flex flex-col min-w-0 break-words w-full mt-2 mb-6 shadow-lg rounded " +
                (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                }
            >
                {/*
                    urutan modal
                    -active or inactive anggota
                    -edit anggota
                    -edit kolektor
                    -add anggota
                    -display anggota
                */}
                <Modal center open={openActive} onClose={onCloseActive}>
                    <form className="bg-white px-8 pt-6 pb-8 mb-4">
                        <label className="block text-lg font-bold">Apa anda yakin ingin menonaktifkan data ini ?</label>
                        <div className="inline-block mx-auto mt-2">
                            <button
                                className="inline-block px-2 py-2 mx-14 rounded-lg bg-green-400 transition duration-500 ease-in-out shadow-md font-bold hover:bg-green-700"
                                type="button"
                                onClick={() => {    
                                    setInStatus('inactive')
                                    console.log(inStatus)
                                    inactiveItem(userId)
                                    setOpenActive(false)
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
                <Modal open={openEditAnggota} onClose={onCloseEditAnggota}>
                    <div className="min-w-max" style={{minWidth : '380px' }}>
                        <h3 className="text-center font-bold text-lg">Edit Anggota</h3>
                        <div className="block w-full overflow-x-auto mt-10">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nama : </label>
                                <input
                                    className="w-full"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                <Modal open={openEditKolektor} onClose={onCloseEditKolektor}>
                    <div className="min-w-max" style={{minWidth : '380px' }}>
                        {notification === "berhasil edit kolektor" ? <SuccessMessage text="Data berhasil di Edit" /> : null }
                        {notification === "gagal edit kolektor" ? <ErrorMessage text="Mohon Lengkapi Formulir Anda" /> : null }
                        <h3 className="text-center font-bold text-lg">Edit Kolektor</h3>
                        <div className="block w-full overflow-x-auto mt-3">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nama : </label>
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
                                        EditKolektor(groupId)
                                    }}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal open={openAddAnggota} onClose={onCloseAddAnggota}>
                    <div className="min-w-max" style={{minWidth : '380px' }}>
                        <h3 className="text-center font-bold text-lg">Tambah Anggota</h3>
                        <div className="block w-full overflow-x-auto mt-10">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nama : </label>
                                <input
                                    className="w-full"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                        render: ({ element: { id,username,role_id,status,created_at }}) => (
                                            <>
                                                <button
                                                    className="mx-3"
                                                    onClick={() => {
                                                        setOpenEditAnggota(true)
                                                        setUserId(id)
                                                        setName(username)
                                                        setRole(role_id)
                                                        setDate(format(new Date(created_at),'dd-MM-yyyy hh:ii:ss'))
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="mx-3"
                                                    onClick={() => {
                                                        setOpenActive(true)
                                                        setName(username)
                                                        setRole(role_id)
                                                        setUserId(id)
                                                        setInStatus(status);
                                                    }}
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
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                "font-semibold text-lg " +
                                (color === "light" ? "text-blueGray-700" : "text-white")
                                }
                            >
                                Laporan Data Kolektor
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                        <AjaxTable 
                            ref={el => table.current = el}
                            url={`/api/groups?select=groups.*;(select count(*) from users where group_id = groups.id) as users_count`}
                            headers={['No.','Kolektor','Anggota','Tanggal Daftar','Aksi']}
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
                                                    setOpenEditKolektor(true)
                                                    setKolektorName(display_name)
                                                }}
                                            >
                                                Edit
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