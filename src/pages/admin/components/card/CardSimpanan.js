import React from 'react';
import AjaxTable from '../table/AjaxTable';
import 'react-responsive-modal/styles.css';
import { Modal } from "react-responsive-modal";
import currencyFormatter from "currency-formatter";
import NumberFormat from "react-number-format";
import client from '../../../../client.js';
import SuccessMessage from "./../../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../../components/Notification/ErrorMessage.js";
import YearDropdown from './../dropdown/YearDropdown.js';
import MonthDropdown from './../dropdown/MonthDropdown.js';


//components
// import TableDropdown from './dropdown/TableDropdown.js';

export default function CardTableSimpananManasuka({ color, simpananType, shouldUpdates }) {
    const [item, setItem] = React.useState(null);
    const table = React.createRef();
    const [year, setYear] = React.useState(new Date().getFullYear());
    const [month, setMonth] = React.useState(1);
    const [itemId, setItemId] = React.useState(null);
    const [userId, setUserId] = React.useState(null);
    const [amount, setAmount] = React.useState(0);
    const [date, setDate] = React.useState(null);
    const [Notification, setNotification] = React.useState('');
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const onCloseDelete = () => setOpenDelete(false);
    const onCloseEdit = () => setOpenEdit(false);

    const EditItem = (itemId) => {
        const data = {
            user_id: userId,
            amount: amount,
            type_id: 3,
            saved_at: date
        };

        client.put(`/api/simpanan/${itemId}`, data)
            .then(res => {
                setNotification("berhasil edit");
            })
            .catch(err => {
                setNotification("gagal edit");
            })
    }
    const DeleteItem = (itemId) => {
        client.delete(`/api/simpanan/${itemId}`)
            .then(res => setNotification("berhasil"))
            .catch(err => setNotification("gagal"));
    }
    const footer = ({ elements }) => {
        elements = elements.map(({ total_amount, total_amount_before }) => ({ total_amount: parseFloat(total_amount), total_amount_before: parseFloat(total_amount_before || 0) }));
        return (
            <>
                <tr>
                    <th colSpan="2" className={
                        "px-6 align-middle border border-solid font-bold py-3 text-xs text-center uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }>
                        Jumlah 
                    </th>
                    <th className={
                        "px-6 align-middle border border-solid font-bold py-3 text-xs text-center uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }>
                        {currencyFormatter.format(elements.map(({ total_amount_before }) => total_amount_before).reduce((a, b) => a + b), { code: 'IDR' })}
                    </th>
                    <th className={
                        "px-6 align-middle border border-solid font-bold py-3 text-xs text-center uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }>
                        {currencyFormatter.format(elements.map(({ total_amount }) => total_amount).reduce((a, b) => a + b), { code: 'IDR' })}
                    </th>
                    <th className={
                        "px-6 align-middle border border-solid font-bold py-3 text-xs text-center uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }>
                        {currencyFormatter.format(elements.map(({ total_amount_before, total_amount }) => total_amount_before + total_amount).reduce((a, b) => a + b), { code: 'IDR' })}
                    </th>
                </tr>
            </>
        )
    };

    React.useEffect(() => {
        setMonth(1)
    }, [simpananType])

    React.useEffect(() => {
        if (shouldUpdates[0]) {
            table.current.reload().then(() => shouldUpdates[1](false));
        }
    }, [shouldUpdates[0]])

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
                {Notification === "berhasil edit" ? <SuccessMessage text="Data berhasil di Simpan" /> : null}
                {Notification === "gagal edit" ? <ErrorMessage text="Maaf Data gagal di simpan" /> : null}
                <Modal open={openEdit} onClose={onCloseEdit}>
                    <form className="bg-white px-8 pt-6 pb-8 mb-4">
                        <h3 className="text-center font-bold text-lg mb-2">Edit Data {simpananType.display_name}</h3>
                        <div className="mb-4">
                            <span className="text-gray-700 text-sm font-bold mb-2">Nama Anggota : </span>
                            <select className="form-select mt-1 block w-full rounded-lg" value={userId} onChange={(e) => setUserId(e.target.value)} >
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
                                onValueChange={(values) => {
                                    const { value } = values;
                                    setAmount(value)
                                }
                                } />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Tanggal Bayar : </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
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
                        <div className="relative flex flex-nowrap gap-3 items-center w-1/2">
                            <h3
                                className={
                                    "font-semibold text-lg block whitespace-nowrap" +
                                    (color === "light" ? "text-blueGray-700" : "text-white")
                                }
                            >
                                Data {simpananType.display_name} Anggota Per Tahun
                            </h3>
                            <YearDropdown yearChange={({ target: { value } }) => setYear(value)} yearValue={year} />
                        </div>
                        <div className="relative items-center gap-3 flex flex-nowrap w-1/2 px-4">
                            <h3
                                className={
                                    "font-semibold text-lg block whitespace-nowrap" +
                                    (color === "light" ? "text-blueGray-700" : "text-white")
                                }
                            >
                                Data {simpananType.display_name} Per Bulan
                            </h3>
                            <MonthDropdown monthChange={(e) => {
                                setMonth(e.target.value);
                            }} monthValue={month} />
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto mt-6">
                    <AjaxTable
                        ref={component => table.current = component}
                        color="light"
                        url={`api/simpanan/?with=user&search=type_id=${simpananType.id} and MONTH(saved_at) = ${month} and YEAR(saved_at) = ${year}&select=CAST(sum(amount) as DECIMAL(9, 2)) as total_amount;\`simpanan\`.user_id;CAST(\`total_amount\`.\`total_amount\` as DECIMAL(9, 2)) as total_amount_before&groupBy=\`simpanan\`.\`user_id\`&leftJoin=(select sum(amount) as total_amount, user_id from simpanan where type_id = ${simpananType.id} and (MONTH(saved_at) < ${month} or YEAR(saved_at) < ${year}) group by user_id) total_amount.total_amount.user_id:=:simpanan.user_id`}
                        headers={
                            [
                                'No',
                                `Nama Anggota`,
                                'S/D Bulan Lalu',
                                'Bulan Ini',
                                'S/D Bulan Ini',
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
                                    render: ({ element: { total_amount_before } }) => currencyFormatter.format(total_amount_before, { code: 'IDR' }),
                                },
                                {
                                    render: ({ element: { total_amount } }) => currencyFormatter.format(total_amount, { code: 'IDR' }),
                                },
                                {
                                    render: ({ element: { total_amount_before, total_amount } }) => currencyFormatter.format(parseFloat(total_amount_before || 0) + parseFloat(total_amount), { code: 'IDR' })
                                }
                            ]
                        }
                        footer={footer}
                    />
                </div>
            </div>
        </>
    );
}