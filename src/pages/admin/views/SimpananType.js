import React from "react";
import client from "../../../client";
import 'rc-datetime-picker/dist/picker.min.css'
import 'react-responsive-modal/styles.css';
import { Modal } from "react-responsive-modal";
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import NumberFormat from "react-number-format";
import SuccessMessage from "./../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../components/Notification/ErrorMessage.js";
import CardSimpananType from "../components/card/CardSimpananType.js";

export default class SimpananType extends React.Component {
    state = {
        modal_open: false,
        form_amount: 0,
        form_display_name: null,
    }

    cardRef = React.createRef()

    constructor(props) {
        super(props);

        this.addSimpananType = this.addSimpananType.bind(this);
    }

    addSimpananType() {
        client.post('/api/simpanan_tipe', {
            display_name: this.state.form_display_name,
            amount: this.state.form_amount
        }).then(() => {
            this.setState({
                modal_open: false,
                form_amount: 0,
                form_display_name: "",
            });
            this.cardRef.current.setState({
                notification: "berhasil edit"
            });
            this.cardRef.current.table.current.reload();

        });
    }

    render() {
        return (
            <>
                <div className="flex flex-wrap mt-4">
                    <div className="w-full mb-12 px-4">
                        <Modal open={this.state.modal_open} onClose={() => this.setState({ modal_open: false })}>
                            <div className="w-full max-w-md">
                                {Notification === "berhasil" ? <SuccessMessage text="Data Berhasil Ditambahkan" /> : null}
                                {Notification === "gagal" ? <ErrorMessage text="Mohon Lengkapi Formulir Anda" /> : null}
                                <h3 className="text-center font-bold text-lg">Tambah Simpanan Tipe</h3>
                                <form className="bg-white px-8 pt-6 pb-8 mb-4">
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
                                            onValueChange={({ value }) => this.setState({ form_amount: value }) } />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="w-full bg-blue-500 transition duration-450 ease-in-out hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={this.addSimpananType}
                                        >
                                            Simpan
                  </button>
                                    </div>
                                </form>
                            </div>
                        </Modal>
                        <button
                            className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-gray-700 hover:text-gray-200 py-2 px-4 rounded inline-flex items-center"
                            onClick={() => this.setState({ modal_open: true })}
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
                        <CardSimpananType ref={this.cardRef} color="light" />
                    </div>
                </div>
            </>
        )
    }
};