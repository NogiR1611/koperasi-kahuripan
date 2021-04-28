import React from 'react';
import AjaxTable from './../table/AjaxTable.js';
import MonthDropdown from './../dropdown/MonthDropdown.js';
import YearDropdown from './../dropdown/YearDropdown.js';
import 'react-responsive-modal/styles.css';
import { Modal } from "react-responsive-modal";
import client from '../../../../client.js';
import { format } from "date-fns";
import currencyFormatter from "currency-formatter";
import NumberFormat from "react-number-format";
import SuccessMessage from "./../../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../../components/Notification/ErrorMessage.js";

//components
// import TableDropdown from './dropdown/TableDropdown.js';

export default function CardTablePinjamanAnggota({ color, updateData }) {
    const table = React.createRef();
    const [year, setYear] = React.useState(new Date().getFullYear());
    const [month, setMonth] = React.useState(1);
    const [item, setItem] = React.useState(null);
    const [userId, setUserId] = React.useState(null);
    const [amount, setAmount] = React.useState(0);
    const [date, setDate] = React.useState(null);
    const [Notification, setNotification] = React.useState(null);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const onCloseDelete = () => setOpenDelete(false);
    const onCloseEdit = () => setOpenEdit(false);
    const EditItem = (itemId) => {
        const data = {
            user_id: userId,
            amount: amount,
            borrowed_at: date
        };

        client.put(`/api/pinjaman/${itemId}`, data)
            .then(res => {
                setOpenEdit(false);
                setNotification("berhasil edit");
            })
            .catch(err => {
                setNotification("gagal edit");
            })
    }

    const DeleteItem = (itemId) => {
        client.delete(`/api/pinjaman/${itemId}`)
            .then(res => setNotification("berhasil"))
            .catch(err => setNotification("gagal"));
    }

    React.useEffect(() => {
        if (updateData) {
            table.current.reload();
        }
    }, [updateData])

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
                                    DeleteItem(item.id)
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
                {Notification === "berhasil edit" ? <SuccessMessage text="Data berhasil di Edit" /> : null}
                {Notification === "gagal edit" ? <ErrorMessage text="Mohon Lengkapi Formulir Anda" /> : null}
                {item ? (<Modal open={openEdit} onClose={onCloseEdit}>
                    <form className="bg-white px-8 pt-6 pb-8 mb-4">
                        <h3 className="text-center font-bold text-lg mb-2">Edit Data Pinjaman Anggota</h3>
                        <div className="mb-4">
                            <span className="text-gray-700 text-sm font-bold mb-2">Nama Anggota : </span>
                            <select className="form-select mt-1 block w-full rounded-lg" value={item.user.id} onChange={({ target: { value } }) => setUserId(value)} >
                                <option className="text-gray-500" selected>Pilih Nama Anggota</option>
                                {
                                    item ? (<option value={item.user.id}>{item.user.name}</option>) : ''

                                }
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Jumlah Pinjaman : </label>
                            <NumberFormat
                                className="w-full"
                                thousandSeparator={true}
                                prefix={'Rp.'}
                                value={amount}
                                onValueChange={(values) => {
                                    const { value } = values;
                                    setAmount(value)
                                }
                                } />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Tanggal Pinjam : </label>
                            <input
                                className="w-full"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => EditItem(item.id)}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </Modal>) : ''}
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
                <div className="block w-full overflow-x-auto mt-6">
                    {/* <table className="items-center w-full bg-transparent border-collapse">
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
                                Jumlah Pinjaman
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                Tanggal Pinjaman
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                Provisi
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
                            .map( (element,index) => {
                                return (
                                    <tr key={element.id}>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            {index + 1}
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
                                            {currencyFormatter.format(element.amount, { code : 'IDR' })}
                                        </td>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            {format(new Date(element.borrowed_at),'dd-MM-yyyy')}
                                        </td>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            {currencyFormatter.format(element.provision,{ code : 'IDR' })}
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
                                                "px-6 align-middle border border-solid py-3 text-sm text-center uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
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
                                                    setUserId(element.id)
                                                    setName(element.name)
                                                    setAmount(element.amount)
                                                    setProvision(element.provision)
                                                    setDate(element.borrowed_at)
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
                            })}
                        </tbody>
                    </table> */}
                    <AjaxTable
                        ref={el => table.current = el}
                        url={`/api/pinjaman?orderBy=\`id\` desc&with=user&search=YEAR (\`borrowed_at\`) = ${year};MONTH(\`borrowed_at\`) = ${month}`}
                        headers={['No', 'Nama Anggota', 'Jumlah Pinjaman', 'Tanggal Pinjaman', 'Provisi', 'Kolektor', 'Aksi']}
                        color="light"
                        columns={[
                            {
                                render: ({ rowIndex }) => rowIndex + 1
                            },

                            {
                                render: ({ element: { user: { name } } }) => name,
                            },

                            {
                                render: ({ element: { amount } }) => currencyFormatter.format(amount, { code: 'IDR' }),
                            },

                            {
                                render: ({ element: { borrowed_at } }) => format(new Date(borrowed_at), 'dd-MM-yyyy')
                            },

                            {
                                render: ({ element: { provision } }) => currencyFormatter.format(provision, { code: 'IDR' }),
                            },

                            {
                                render: () => ''
                            },

                            {
                                render: ({ element }) => (
                                    <>
                                        <button
                                            className="mx-3"
                                            onClick={() => {
                                                setOpenEdit(true)
                                                setItem(element)
                                                setAmount(element.amount)
                                                setDate(element.borrowed_at)
                                            }}
                                        >
                                            Edit
                                            </button>
                                        <button
                                            className="mx-3"
                                            onClick={() => {
                                                setOpenDelete(true)
                                                setItem(element)
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