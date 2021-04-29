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

import './../../../../assets/style/style.css';
//components
// import TableDropdown from './dropdown/TableDropdown.js';

export default function CardTablePinjamanAnggota({ color, updateData }) {
    const table = React.createRef();
    const [year, setYear] = React.useState(new Date().getFullYear());
    const [angsuranYear,setAngsuranYear] = React.useState(new Date().getFullYear());
    const [month, setMonth] = React.useState(1);
    const [angsuranMonth,setAngsuranMonth] = React.useState(1);
    const [pinjamanId,setPinjamanId] = React.useState(0);
    const [amount, setAmount] = React.useState(0);
    const [volunteer,setVolunteer] = React.useState(0);
    const [payingAt, setPayingAt] = React.useState(null);
    const [openAngsuran,setOpenAngsuran] = React.useState(false);
    const onCloseAngsuran = () => setOpenAngsuran(false);
    
    /*
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
    */

    React.useEffect(() => {
        if (updateData[0]) {
            table.current.reload().then(() => updateData[1](false));
        }
    }, [updateData[0]])

    return (
        <>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full mt-3 mb-6 shadow-lg rounded " +
                    (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                }
            >
                <Modal classNames="Modal" open={openAngsuran} onClose={onCloseAngsuran}>
                    <div className="max-w-screen-lg">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3
                                        className={
                                        "font-semibold text-lg " +
                                        (color === "light" ? "text-blueGray-700" : "text-white")
                                        }
                                    >
                                        Data Angsuran Anggota Per Tahun : <br/> <YearDropdown yearChange={({ target: { value } }) => 
                                            setAngsuranYear(value)} 
                                            yearValue={angsuranYear} />
                                    </h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3
                                        className={
                                        "font-semibold text-lg " +
                                        (color === "light" ? "text-blueGray-700" : "text-white")
                                        }
                                    >
                                        Data Angsuran Anggota Per {pinjamanId} Bulan : <br/> <MonthDropdown monthChange={(e) => setAngsuranMonth(e.target.value)} monthValue={angsuranMonth} />
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <AjaxTable
                                ref={el => table.current = el}
                                url={`/api/pinjaman?orderBy=borrowed_at%20asc&with=user;angsuran&search=id=${pinjamanId}`}
                                headers={['No','Jumlah Angsuran','Sisa Pinjaman','Tanggal Jatuh Tempo']}
                                color="light"
                                columns={[
                                    {
                                        render: ({ rowIndex }) => rowIndex + 1
                                    },
                                    {
                                        render: ({ element: { angsuran: { amount } } }) => currencyFormatter.format(amount,{ code: 'IDR' }),
                                    },
                                    {
                                        render: () => '',
                                    },
                                    {
                                        render: ({ element: { angsuran: { paying_at } } }) => format(new Date(paying_at),'dd-MM-yyyy')
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </Modal>
                {/*Notification === "berhasil" ? <SuccessMessage text="Data Berhasil Dihapus" /> : null}
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
                {/*Notification === "berhasil edit" ? <SuccessMessage text="Data berhasil di Edit" /> : null}
                {/*Notification === "gagal edit" ? <ErrorMessage text="Mohon Lengkapi Formulir Anda" /> : null}
                {/*item ? (<Modal open={openEdit} onClose={onCloseEdit}>
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
                    </Modal>) : ''*/}
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    "font-semibold text-lg " +
                                    (color === "light" ? "text-blueGray-700" : "text-white")
                                }
                            >
                                Data Pinjaman Anggota Per Tahun : <YearDropdown yearChange={({ target: { value } }) => 
                                    setYear(value)} 
                                    yearValue={year} />
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
                    <AjaxTable
                        ref={el => table.current = el}
                        url={`/api/pinjaman?orderBy=\`borrowed_at\` asc&with=user;angsuran&search=YEAR (\`borrowed_at\`) = ${year};MONTH(\`borrowed_at\`) = ${month}`}
                        headers={['No', 'Nama Anggota', 'Jumlah Pinjaman', 'Tanggal Pinjaman', 'Provisi', 'Kolektor', 'Angsuran', 'Keterangan']}
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
                                render: ({ element : { angsuran } }) => (
                                    <button
                                        onClick={() => {
                                            setOpenAngsuran(true)
                                            setPinjamanId(angsuran.pinjaman_id)
                                        }}
                                    >
                                        {angsuran.length}
                                    </button>
                                )
                            },

                            {
                                render: ({ element: { angsuran } }) => {
                                    return angsuran.filter(({ paying_at }) => paying_at != null).length
                                }
                            }
                        ]}
                    />
                </div>
            </div>
        </>
    );
}