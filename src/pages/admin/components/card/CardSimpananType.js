import React from 'react';
import AjaxTable from '../table/AjaxTable';
import 'react-responsive-modal/styles.css';
import { Modal } from "react-responsive-modal";
import currencyFormatter from "currency-formatter";
import NumberFormat from "react-number-format";
import client from '../../../../client.js';
import SuccessMessage from "./../../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../../components/Notification/ErrorMessage.js";
export default class CardSimpananType extends React.Component {
    table = React.createRef()

    state = {
        id: null,
        notification: '',
        modal_edit_open: false,
        modal_delete_open: false,
        form_display_name: null,
        form_amount: null,
        form_user_id: null
    }

    constructor(props) {
        super(props)

        this.deleteSimpananType = this.deleteSimpananType.bind(this);
        this.updateSimpananType = this.updateSimpananType.bind(this);

    }

    deleteSimpananType(id) {
        client.delete(`/api/simpanan_tipe/${id}`).then(() => {
            this.setState({
                notification: "berhasil",
                modal_delete_open: false,
            });
            this.table.current.reload();
        }).catch(err => console.log(err))
    }

    updateSimpananType(id) {
        client.put(`/api/simpanan_tipe/${id}`, {
            user_id: this.state.form_user_id,
            display_name: this.state.form_display_name,
            amount: this.state.form_amount
        }).then(() => {
            this.setState({
                notification: "berhasil edit",
                modal_edit_open: false
            });
            this.table.current.reload();
        }).catch(err => {
            this.setState({ notification: 'gagal edit' })
            console.log(err)
        })
    }

    render() {
        return (
            <>
                <div
                    className={
                        "relative flex flex-col min-w-0 break-words w-full mt-3 mb-6 shadow-lg rounded " +
                        (this.props.color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                    }
                >
                    {this.state.notification === "berhasil" ? <SuccessMessage text="Data Berhasil di Hapus" /> : null}
                    {this.state.notification === "gagal" ? <ErrorMessage text="Maaf Data Gagal Dihapus" /> : null}
                    <Modal open={this.state.modal_delete_open} onClose={() => this.setState({ modal_delete_open: false })}>
                        <form className="bg-white px-8 pt-6 pb-8 mb-4">
                            <label className="block text-lg font-bold">Apa anda yakin ingin menghapus data ini ?</label>
                            <div className="inline-block mx-auto mt-2">
                                <button
                                    className="inline-block px-2 py-2 mx-14 rounded-lg bg-green-400 transition duration-500 ease-in-out shadow-md font-bold hover:bg-green-700"
                                    type="button"
                                    onClick={() => this.deleteSimpananType(this.state.id)}>
                                    Iya
                            </button>
                                <button
                                    className="inline-block px-2 py-2 mx-14 rounded-lg bg-red-400 transition duration-500 ease-in-out shadow-md font-bold hover:bg-red-700"
                                    type="button"
                                    onClick={() => this.setState({ modal_delete_open: false })}
                                >
                                    Tidak Jadi
                            </button>
                            </div>
                        </form>
                    </Modal>
                    {this.state.notification === "berhasil edit" ? <SuccessMessage text="Data berhasil di Simpan" /> : null}
                    {this.state.notification === "gagal edit" ? <ErrorMessage text="Maaf Data gagal di Simpan" /> : null}
                    <Modal open={this.state.modal_edit_open} onClose={() => this.setState({ modal_edit_open: false })}>
                        <form className="bg-white px-8 pt-6 pb-8 mb-4">
                            <h3 className="text-center font-bold text-lg mb-2">Edit Data Simpanan Tipe</h3>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nama Simpanan : </label>
                                <input type="text" className="w-full" value={this.state.form_display_name} onChange={({ target: { value } }) => this.setState(({ form_display_name: value }))} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Minimal Simpanan : </label>
                                <NumberFormat
                                    thousandSeparator={true}
                                    prefix={'Rp.'}
                                    value={this.state.form_amount}
                                    onValueChange={({ value }) => this.setState({ form_amount: value })} />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => this.updateSimpananType(this.state.id)}
                                >
                                    Update
                        </button>
                            </div>
                        </form>
                    </Modal>
                    <div className="block w-full overflow-x-auto mt-6">
                        <AjaxTable
                            ref={this.table}
                            color="light"
                            url={`/api/simpanan_tipe`}
                            headers={
                                [
                                    'No',
                                    `Nama Simpanan`,
                                    'Minimal Simpanan',
                                    'Aksi',
                                ]
                            }
                            columns={
                                [
                                    {
                                        render: ({ rowIndex }) => rowIndex + 1
                                    },
                                    {
                                        render: ({ element: { display_name } }) => display_name
                                    },
                                    {
                                        render: ({ element: { amount } }) => currencyFormatter.format(amount, { code: 'IDR' }),
                                    },
                                    {
                                        render: ({ element: { id, display_name: form_display_name, amount: form_amount, user_id: form_user_id } }) => (
                                            <>
                                                <button type="button" onClick={() => this.setState({ id, form_display_name, form_amount: form_amount || 0, form_user_id, modal_edit_open: true })} className="mx-3 font-xs">EDIT</button>
                                                <button type="button" onClick={() => this.setState({ id, modal_delete_open: true })} className="mx-3 font-xs">DELETE</button>
                                            </>
                                        )
                                    },
                                ]
                            }
                        />
                    </div>
                </div>
            </>
        )
    }
};