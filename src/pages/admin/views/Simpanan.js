import React from "react";
import 'rc-datetime-picker/dist/picker.min.css'
import 'react-responsive-modal/styles.css';
import { Modal } from "react-responsive-modal";
import moment from "moment";
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import NumberFormat from "react-number-format";
import SuccessMessage from "./../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../components/Notification/ErrorMessage.js";

// components

import CardSimpanan from "../components/card/CardSimpanan.js";
import client from "../../../client";

export default function Simpanan({ match: { params: { type: simpanan_type_name } } }) {
    const mmnt = moment();
    const now = mmnt.format('YYYY-MM-DD HH:mm:ss');
    
    const [simpananType, setSimpananType] = React.useState(null);
    const [hasFetchSimpananType, setHasFetchSimpananType] = React.useState(false);

    const [userId, setUserId] = React.useState(null);
    const [amount, setAmount] = React.useState(0);
    const [users, setUsers] = React.useState([]);
    const [shouldUpdate, setShouldUpdate] = React.useState(false);
    const [Notification, setNotification] = React.useState("");
    const [date, setDate] = React.useState(now);
    const [open, setOpen] = React.useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const addSimpanan = () => {
        const data = {
            user_id: userId,
            amount: amount,
            type_id: simpananType.id,
            saved_at: date
        }

        client.post('/api/simpanan', data)
            .then(() => {
                setNotification("berhasil");
                setOpen(false);
                setShouldUpdate(true);
            })
            .catch(err => {
                setNotification("gagal");
            });
    }

    React.useEffect(() => {
        if (!open) {
            setUserId(null);
            setAmount(0);
            setDate(now);
            setNotification("");
        }
    }, [open]);

    React.useEffect(() => {
        client.get(`/api/simpanan_tipe?search=name = '${simpanan_type_name}'&limit=1`).then(({ data: { data } }) => {
            if (data.length) {
                setSimpananType(data[0]);
            }
        }).catch(e => console.log(e)).finally(() => setHasFetchSimpananType(true))

    }, [simpanan_type_name]);

    React.useEffect(() => {
        client.get('/api/user')
            .then(res => {
                const { data } = res.data;
                setUsers(data);
            })
            .catch(err => console.log(err));
    }, [])

    return simpananType ? (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <Modal open={open} onClose={onCloseModal}>
                        <div className="w-full max-w-md">
                            {Notification === "berhasil" ? <SuccessMessage text="Data Berhasil Ditambahkan" /> : null}
                            {Notification === "gagal" ? <ErrorMessage text="Mohon Lengkapi Formulir Anda" /> : null}
                            <h3 className="text-center font-bold text-lg">{simpananType.display_name} Bulan ini</h3>
                            <form className="bg-white px-8 pt-6 pb-8 mb-4">
                                <div className="mb-4">
                                    <label className="block">
                                        <span className="text-gray-700 text-sm font-bold mb-2">Nama Anggota : </span>
                                        <select className="form-select mt-1 block w-full rounded-lg" onChange={(e) => setUserId(e.target.value)} >
                                            <option className="text-gray-500" selected>Pilih Nama Anggota</option>
                                            {users.map((element, index) => {
                                                return (
                                                    <option key={index} value={element.id}>{element.name}</option>
                                                )
                                            })}
                                        </select>
                                    </label>
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
                                    <DatetimePickerTrigger
                                        moment={mmnt}
                                        value={date}
                                        onChange={moment => setDate(moment.format('YYYY-MM-DD HH:mm:ss'))}
                                    >
                                        <input type="text" className="w-full" value={date} readOnly />
                                    </DatetimePickerTrigger>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={addSimpanan}
                                    >
                                        Simpan
                  </button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                    <button
                        className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-gray-700 hover:text-gray-200 py-2 px-4 rounded inline-flex items-center"
                        onClick={onOpenModal}
                    >
                        <img
                            src={require("./../../../assets/admin/icon/add.png").default}
                            className="w-btn-add mr-1"
                            alt=""
                        />
            Tambah
          </button>
                    <button
                        className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-blue-700 hover:text-gray-200 py-2 px-4 ml-4 mb-2 rounded inline-flex items-center"
                        type="button"
                    >
                        <img
                            src={require("./../../../assets/admin/icon/pdf.png").default}
                            className="w-btn-add mr-1"
                            alt=""
                        />
            Generate PDF
          </button>
                    <CardSimpanan shouldUpdates={[shouldUpdate, setShouldUpdate]} simpananType={simpananType} color="light" />
                </div>
            </div>
        </>
    ) : (hasFetchSimpananType ? ((
        <>
            <h3>Not Found</h3>
        </>
    )) : '');
}