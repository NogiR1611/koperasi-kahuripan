import React from 'react';
import moment from "moment";
import { DatetimePickerTrigger } from "rc-datetime-picker";
import client from '../../../../client';
import AjaxTable from './../table/AjaxTable.js';
import 'react-responsive-modal/styles.css';
import { format } from "date-fns";
import {Modal} from "react-responsive-modal";
import SuccessMessage from "./../../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../../components/Notification/ErrorMessage.js";

//components
// import TableDropdown from './dropdown/TableDropdown.js';

export default function CardTableKolektor({ color,updateData }){
    const mmnt = moment();
    const table = React.createRef();
    const [groupId, setGroupId] = React.useState(null);
    const [userId,setUserId] = React.useState(null);
    const [name,setName] = React.useState(null);
    const [password,setPassword] = React.useState("");
    const [confirmPassword,setConfirmPassword] = React.useState("");
    const [kolektor,setKolektor] = React.useState([]);
    const [date,setDate] = React.useState(null);
    const [token,setToken] = React.useState(null);
    const [notification,setNotification] = React.useState('');
    const [openData,setOpenData] = React.useState(false);
    const [openDelete,setOpenDelete] = React.useState(false);
    const onCloseData = () => setOpenData(false);
    const onCloseDelete = () => setOpenDelete(false);
    
    const EditItem = (userId) => {
        if( password !== confirmPassword ){
            alert("Harap Samakan Password dengan Konfirmasi Password!")
        }
        else{
            const data = {
                id : userId,
                name : name,
                password : password,
                created_at : date,
                role_id : 2
            };

            client.put(`/api/user/${userId}`,data)
            .then( res => {
                setNotification("berhasil edit");
            })
            .catch( err => {
                setNotification("gagal edit");
            })
        }
    }

    const DeleteItem = (userId) => {
        client.delete(`/api/angsuran/${userId}`)
        .then( res => setNotification("berhasil"))
        .catch( err => setNotification("gagal"));
    }

    React.useEffect(() => {
        let state = localStorage.getItem("TOKEN_KEY");
        setToken(state);

        client.get("/api/user")
        .then( res => {
            const {data} = res.data;
            setKolektor(data);
        })
        .catch( err => console.log(err))
    },[]);

    React.useEffect(() => {
        if (updateData[0]) {
            table.current.reload().then(() => updateData[1](false));
        }
    }, [updateData[0]])

    return (
        <>
            <div
                className={
                "relative flex flex-col min-w-0 break-words w-full mt-2 mb-6 shadow-lg rounded " +
                (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                }
            >
                {notification === "berhasil" ? <SuccessMessage text="Data Berhasil Dihapus" /> : null}
                {notification === "gagal" ? <ErrorMessage text="Maaf Data Gagal Dihapus" /> : null}
                <Modal center open={openDelete} onClose={onCloseDelete}>
                    <form className="bg-white px-8 pt-6 pb-8 mb-4">
                        <label className="block text-lg font-bold">Apa anda yakin ingin menghapus data ini ?</label>
                        <div className="inline-block mx-auto mt-2">
                            <button
                                className="inline-block px-2 py-2 mx-14 rounded-lg bg-green-400 transition duration-500 ease-in-out shadow-md font-bold hover:bg-green-700"
                                type="button"
                                onClick={() => {
                                    DeleteItem(userId)
                                    setOpenDelete(false)
                                }
                            }>
                                Iya
                            </button>
                            <button
                                className="inline-block px-2 py-2 mx-14 rounded-lg bg-red-400 transition duration-500 ease-in-out shadow-md font-bold hover:bg-red-700"
                                type="button" 
                                onClick={onCloseDelete}
                            >
                                Tidak Jadi
                            </button>
                        </div>
                    </form>
                </Modal>
                {notification === "berhasil edit" ? <SuccessMessage text="Data berhasil di Edit" /> : null }
                {notification === "gagal edit" ? <ErrorMessage text="Mohon Lengkapi Formulir Anda" /> : null }
                <Modal open={openData} onClose={onCloseData}>
                    <div className="block w-full overflow-x-auto">
                        <AjaxTable                            
                            ref={el => table.current = el}
                            url={`/api/user?search=group_id = ${groupId}`}
                            headers={['No','Nama','Tanggal Daftar']}
                            color="light"
                            columns={[
                                {
                                    render: ({ rowIndex }) => rowIndex + 1
                                },
                                {
                                    render: ({ element: { name } }) => name,
                                },
                                {
                                    render: ({ element: { created_at } }) => created_at,
                                },
                            ]}
                        />
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
                            headers={['No.','Kolektor','Anggota','Jumlah Diterima','Aksi']}
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
                                    render: () => '',
                                },
                                {
                                    render: ({ element : { id,display_name,created_at } }) => (
                                        <>
                                            <button
                                                className="mx-3"
                                                onClick={() => {
                                                    setOpenData(true)
                                                    setName(display_name)
                                                    setDate(created_at)
                                                    setUserId(id)
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="mx-3"
                                                onClick={() => {
                                                    setOpenDelete(true)
                                                    setUserId(id)
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