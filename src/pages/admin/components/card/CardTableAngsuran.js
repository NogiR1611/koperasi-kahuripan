import React from 'react';
import MonthDropdown from './../dropdown/MonthDropdown.js';
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
import client from '../../../../client.js';
import {format} from "date-fns";
import timestamp from "time-stamp";
import currencyFormatter from "currency-formatter";
import NumberFormat from "react-number-format";
import SuccessMessage from "./../../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../../components/Notification/ErrorMessage.js";
//components
// import TableDropdown from './dropdown/TableDropdown.js';

export default function CardTableAngsuran({ color }){
    const [Items,setItems] = React.useState([]);
    const [month,setMonth] = React.useState(1);
    const [itemId,setItemId] = React.useState(null);
    const [userId,setUserId] = React.useState(null);
    const [name,setName] = React.useState(null);
    const [pinjamanId,setPinjamanId] = React.useState(0);
    const [angsuran,setAngsuran] = React.useState(0);
    const [date,setDate] = React.useState(timestamp("YYYY-MM-DD HH:mm:ss"));
    const [Notification,setNotification] = React.useState(null);
    const [openEdit,setOpenEdit] = React.useState(false);
    const [openDelete,setOpenDelete] = React.useState(false);
    const onCloseDelete = () => setOpenDelete(false);
    const onCloseEdit = () => setOpenEdit(false);
    const EditItem = (itemId) => {
        const data = {
            user_id : userId,
            pinjaman_id : pinjamanId,
            amount : angsuran,
            borrowed_at : date,
        };

        client.put(`/api/angsuran/${itemId}`,data)
        .then( res => {
            setNotification("berhasil edit");
        })
        .catch( err => {
            setNotification("gagal edit");
        })
    }

    const DeleteItem = (itemId) => {
        client.delete(`/api/angsuran/${itemId}`)
        .then( res => setNotification("berhasil"))
        .catch( err => setNotification("gagal"));
    }

    React.useEffect(() => {
        client.get('/api/angsuran?with=pinjaman;user')
        .then(res => {
            const {data} = res.data;
            setItems(data);
        })
        .catch(err => {
            console.log(err)
        })    
    },[]);

    return (
        <>
            <div
                className={
                "relative flex flex-col min-w-0 break-words w-full mt-3 mb-6 shadow-lg rounded " +
                (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                }
            >
                {Notification === "berhasil" ? <SuccessMessage text="Data Berhasil Dihapus" /> : null}
                {Notification === "gagal" ? <ErrorMessage text="Maaf Data Gagal Dihapus" /> : null}
                <Modal open={openDelete} onClose={onCloseDelete}>
                    <form className="bg-white px-8 pt-6 pb-8 mb-4">
                        <label className="block text-lg font-bold">Apa anda yakin ingin menghapus data ini ?</label>
                        <div className="inline-block mx-auto mt-2">
                            <button
                                className="inline-block px-2 py-2 mx-14 rounded-lg bg-green-400 transition duration-500 ease-in-out shadow-md font-bold hover:bg-green-700"
                                type="button"
                                onClick={() => {
                                    DeleteItem(itemId)
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
                {Notification === "berhasil edit" ? <SuccessMessage text="Data berhasil di Edit" /> : null }
                {Notification === "gagal edit" ? <ErrorMessage text="Mohon Lengkapi Formulir Anda" /> : null }
                <Modal open={openEdit} onClose={onCloseEdit}>
                    <form className="bg-white px-8 pt-6 pb-8 mb-4">
                        <h3 className="text-center font-bold text-lg mb-2">Edit Data Angsuran</h3>
                        <div className="mb-4">
                            <span className="text-gray-700 text-sm font-bold mb-2">Nama Peminjam : </span>
                            <select className="form-select mt-1 block w-full rounded-lg" value={userId} onChange={ (e) => setUserId(e.target.value) } >
                                <option className="text-gray-500" selected>Pilih Nama Anggota</option>
                                {Items.map( (element,index) => {
                                    return (
                                    <option key={index} value={element.user.id}>{element.user.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block">
                                <span className="text-gray-700 text-sm font-bold mb-2">Nominal awal pinjaman : </span>
                                <select className="form-select mt-1 block w-full" value={pinjamanId} onChange={ (e) => setPinjamanId(e.target.value) }>
                                    <option className="text-gray-500" selected>Pilih Nama dan Nominal</option>
                                    {Items.map( (element,index) => {
                                        return (
                                        <option key={index} value={element.pinjaman.id}>
                                            {element.user.name} - {currencyFormatter.format(element.pinjaman.amount,{ code : 'IDR' })}
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
                                value={angsuran}
                                onValueChange={ (values) => {
                                const {value} = values;
                                setAngsuran(value)} 
                            }/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Tanggal Pinjam : </label>
                            <input
                                className="w-full"
                                type="date"
                                value={date}
                                onChange={ (e) => setDate(e.target.value) }
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => EditItem(itemId)}
                            >
                                Update
                            </button>
                        </div>
                    </form>
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
                            Data Angsuran Anggota Per Bulan : <MonthDropdown monthChange={(e) => setMonth(e.target.value)} monthValue={month} />
                        </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                No
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                No.Anggota
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                Nama Anggota
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                Jumlah Pinjaman Bulan ini
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                Jumlah Angsuran
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 font-bold text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                Sisa Pinjaman Bulan ini
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                Tanggal Bayar
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light" 
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                Kolektor
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs text-center uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light" 
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Items
                            .sort((a,b) => new Date(a.paid_at) - new Date(b.paid_at) )
                            .filter( element => format(new Date(element.paid_at),'MM') === month )
                            .map( (element,index) => {
                                return (
                                    <tr key={index}>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light" 
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            { index +1 }
                                        </td>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light" 
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                        </td>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light" 
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            {element.user.name}
                                        </td>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light" 
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            {element.pinjaman.amount}
                                        </td>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light" 
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            {element.amount}
                                        </td>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light" 
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            {element.pinjaman.amount - element.amount}
                                        </td>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light" 
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            {format(new Date(element.paid_at),'dd-MM-yyyy')}
                                        </td>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light" 
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                        </td>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light" 
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            <button
                                                className="mx-3"
                                                onClick={() => {
                                                    setOpenEdit(true)
                                                    setItemId(element.id)
                                                    setUserId(element.user.id)
                                                    setPinjamanId(element.pinjaman.id)
                                                    setName(element.user.name)
                                                    setAngsuran(element.amount)
                                                    setDate(element.paid_at)
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="mx-3"
                                                onClick={() => {
                                                    setOpenDelete(true)
                                                    setItemId(element.id)
                                                }}
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}