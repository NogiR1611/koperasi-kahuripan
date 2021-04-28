import React from 'react';
import AjaxTable from '../table/AjaxTable';
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
import currencyFormatter from "currency-formatter";
import NumberFormat from "react-number-format";
import client from '../../../../client.js';
import SuccessMessage from "./../../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../../components/Notification/ErrorMessage.js";
import YearDropdown from './../dropdown/YearDropdown.js';
import MonthDropdown from './../dropdown/MonthDropdown.js';


//components
// import TableDropdown from './dropdown/TableDropdown.js';

export default function CardTableSimpananManasuka({ color, simpananType }){
    const [item, setItem] = React.useState(null);
    const [year, setYear] = React.useState(new Date().getFullYear());
    const [month,setMonth] = React.useState(1);
    const [itemId,setItemId] = React.useState(null);
    const [userId,setUserId] = React.useState(null);
    const [amount,setAmount] = React.useState(0);
    const [date,setDate] = React.useState(null);
    const [Notification,setNotification] = React.useState('');
    const [openEdit,setOpenEdit] = React.useState(false);
    const [openDelete,setOpenDelete] = React.useState(false);
    const onCloseDelete = () => setOpenDelete(false);
    const onCloseEdit = () => setOpenEdit(false);

    const EditItem = (itemId) => {
        const data = {
            user_id : userId,
            amount : amount,
            type_id : 3,
            saved_at : date
        };

        client.put(`/api/simpanan/${itemId}`,data)
        .then( res => {
            setNotification("berhasil edit");
        })
        .catch( err => {
            setNotification("gagal edit");
        })
    }
    const DeleteItem = (itemId) => {
        client.delete(`/api/simpanan/${itemId}`)
        .then( res => setNotification("berhasil"))
        .catch( err => setNotification("gagal"));
    }

    React.useEffect(() => {
        setMonth(1)
    }, [simpananType])

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
                {Notification === "gagal edit" ? <ErrorMessage text="Maaf Data gagal di edit" /> : null }
                <Modal open={openEdit} onClose={onCloseEdit}>
                    <form className="bg-white px-8 pt-6 pb-8 mb-4">
                        <h3 className="text-center font-bold text-lg mb-2">Edit Data {simpananType.display_name}</h3>
                        <div className="mb-4">
                            <span className="text-gray-700 text-sm font-bold mb-2">Nama Anggota : </span>
                            <select className="form-select mt-1 block w-full rounded-lg" value={userId} onChange={ (e) => setUserId(e.target.value) } >
                                <option className="text-gray-500" selected>Pilih Nama Anggota</option>
                                {
                                    item ? (<option value={item.user.id}>{item.user.name}</option>) : ''
                                }
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Jumlah Simpanan : </label>
                            <NumberFormat
                            thousandSeparator={true}
                            prefix={'Rp.'}
                            value={amount}
                            onValueChange={ (values) => {
                                const {value} = values;
                                setAmount(value)} 
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
                                Data Pinjaman Anggota Per Tahun : <YearDropdown yearChange={({ target: { value } }) => setYear(value)} yearValue={year} />
                            </h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    "font-semibold text-lg " +
                                    (color === "light" ? "text-blueGray-700" : "text-white")
                                }
                            >
                                Data Pinjaman Anggota Per Bulan : <MonthDropdown monthChange={(e) => {
                                    setMonth(e.target.value);
                                }} monthValue={month} />
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <AjaxTable 
                        color="light"
                        url={`api/simpanan/?with=user&search=type_id=${simpananType.id} and MONTH(saved_at) = ${month} and YEAR(saved_at) = ${year}&select=sum(amount) as total_amount;\`simpanan\`.user_id;\`simpanan_last_month\`.\`total_amount\` as total_amount_last_month&groupBy=\`simpanan\`.\`user_id\`&leftJoin=(select sum(amount) as total_amount, user_id from simpanan where type_id = ${simpananType.id} and MONTH(saved_at) = ${((month == 1) ? 12 : (month - 1))} and YEAR(saved_at) = ${((month == 1) ? (year - 1) : year)} group by user_id) simpanan_last_month.simpanan_last_month.user_id:=:simpanan.user_id`}
                        headers={
                            [
                                'No',
                                `Nama Anggota ${simpananType.name}`,
                                'Bulan Ini',
                                'S/D Bulan Lalu',
                                'Aksi'
                            ]
                        }
                        columns={
                            [
                                {
                                    render: ({ rowIndex }) => rowIndex + 1
                                },
                                {
                                    render: ({ element }) => element.user.name
                                },
                                {
                                    render: ({ element: { total_amount } }) => currencyFormatter.format(total_amount, { code: 'IDR' }),
                                },
                                {
                                    render: ({ element: { total_amount_last_month } }) => currencyFormatter.format(total_amount_last_month, { code: 'IDR' }),
                                },
                                {
                                    render: ({ element }) => (
                                        <>
                                            <button
                                                className="mx-3 font-sm"
                                                onClick={() => {
                                                    setOpenEdit(true)
                                                    setItem(element)
                                                    setUserId(element.user.id)
                                                    setAmount(element.amount)
                                                    setDate(element.saved_at)
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="mx-3 font-sm"
                                                onClick={() => {
                                                    setOpenDelete(true)
                                                    setItemId(element.id)
                                                }}
                                            >
                                                Hapus
                                            </button> 
                                        </>
                                    )
                                }
                            ]
                        }
                    />
                </div>
            </div>
        </>
    );
}