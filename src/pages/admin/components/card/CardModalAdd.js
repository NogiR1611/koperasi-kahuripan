import React from 'react';
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";

export default function ModalAdd(){
    const [open,setOpen] = React.useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    return (
        <>
            <Modal open={open} onClose={onCloseModal}>
                <h1>Modal</h1>
            </Modal>
            <button
            className="bg-white transition duration-500 ease-in-out shadow-md font-bold hover:bg-gray-700 hover:text-gray-200 py-2 px-4 rounded inline-flex items-center"
            onClick={onOpenModal}
            >
            <img 
                src={require("./../../../../assets/admin/icon/add.png").default}
                className="w-btn-add mr-1"
                alt=""
            />
            Tambah
            </button>
        </>    
    );
}
