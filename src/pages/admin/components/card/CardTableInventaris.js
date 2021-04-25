import React from 'react';
import client from '../../../../client.js';
import {format} from 'date-fns';
//components
// import TableDropdown from './dropdown/TableDropdown.js';

export default function CardTableInventaris({ color }){
    const [Items,setItems] = React.useState([]);
    const [fromDate,setFromDate] = React.useState(null);
    const [toDate,setToDate] = React.useState(null);
    const EditItem = (id) => {
        client.put(`/api/inventaris/${id}`)
        .then( res => console.log(res))
        .catch( err => console.log(err));
    }
    const DeleteItem = (id) => {
        client.delete(`/api/inventaris/${id}`)
        .then( res => console.log(res))
        .catch( err => console.log(err));
    }

    React.useEffect(() => {
        client.get('/api/inventaris')
        .then( res => {
            const {data} = res.data;
            console.log(res);
            setItems(data);
        })
        .catch( err => console.log(err));
    },[]);
    
    return (
        <>
            <div
                className={
                "relative flex flex-col min-w-0 break-words w-full mt-3 mb-6 shadow-lg rounded " +
                (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                }
            >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3
                            className={
                            "font-semibold text-lg " +
                            (color === "light" ? "text-blueGray-700" : "text-white")
                            }
                        >
                            Laporan Daftar Inventaris Pada Periode 
                            <input className="rounded-lg" type="date" name="" id="" value={fromDate} onChange={ (e) => setFromDate(e.target.value) } />
                            Sampai 
                            <input className="rounded-lg" type="date" name="" id="" value={toDate} onChange={ (e) => setToDate(e.target.value) } />
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
                                No.
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                Nama Inventaris
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                Jumlah
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                Tanggal Pembelian
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                Kondisi
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }
                                >
                                Posisi
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-center text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
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
                            .sort((a,b) => new Date(a.tanggal_pembelian) - new Date(b.tanggal_pembelian))
                            .filter(
                                element => format(new Date(element.tanggal_pembelian),"dd-MM-yyyy") >= format(new Date(fromDate),"dd-MM-yyyy")
                                && format(new Date(element.tanggal_pembelian),"dd-MM-yyyy") <= format(new Date(toDate),"dd-MM-yyyy"))
                            .map( (element,index) => {
                                return (
                                    <tr>
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
                                            {element.nama_inventaris}
                                        </td>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            {element.jumlah}
                                        </td>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            {format(new Date(element.tanggal_pembelian),"dd-MM-yyyy")}
                                        </td>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            {element.kondisi}
                                        </td>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            {element.posisi}
                                        </td>
                                        <td
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs text-center uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            <button type="button" onClick={EditItem(element.id)} className="mx-3 font-xs">EDIT</button>
                                            <button type="button" onClick={DeleteItem(element.id)} className="mx-3 font-xs">DELETE</button>
                                        </td>        
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}