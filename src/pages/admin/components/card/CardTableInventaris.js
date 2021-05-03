import React from 'react';
import moment from 'moment';
import { DatetimePickerTrigger } from "rc-datetime-picker";
import client from '../../../../client.js';
import {format} from 'date-fns';
import AjaxTable from './../table/AjaxTable.js';
import {Modal} from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
//components
// import TableDropdown from './dropdown/TableDropdown.js';

export default function CardTableInventaris({ color,updateData }){
    const mmnt = moment();
    const table = React.createRef();
    const [token,setToken] = React.useState(null);
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

    React.useEffect(() => {
        let state = localStorage.getItem("TOKEN_KEY");
        setToken(state);
    },[]);
     
    React.useEffect(() => {
        if(updateData[0]){
            table.current.reload().then(() => updateData[1](false));
        }
    },[updateData[0]]);
    
    return (
        <>
            <Modal open={openEditInventaris} onClose={onCloseEditInventaris}>
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
                            <button                                    className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
                    <AjaxTable 
                        ref={el => table.current = el}
                        url={'/api/inventaris'}
                        headers={['No','Nama Inventaris','Jumlah','Tanggal Pembelian','Kondisi','Posisi','Aksi']}
                        color="light"
                        columns={[
                            {
                                render: ({ rowIndex }) => rowIndex + 1
                            },
                            {
                                render: ({ element : { display_name } }) => display_name,
                            },
                            
                        ]}
                    />
                </div>
            </div>
        </>
    );
}