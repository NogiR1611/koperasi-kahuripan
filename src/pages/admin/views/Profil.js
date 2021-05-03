import React from "react";
import SuccessMessage from "./../components/Notification/SuccessMessage.js";
import ErrorMessage from "./../components/Notification/ErrorMessage.js";
import client from "../../../client";

export default function Profil(){
    const [userId,setUserId] = React.useState(null);
    const [username,setUsername] = React.useState('');
    const [roleId,setRoleId] = React.useState(null);
    const [image,setImage] = React.useState(null);
    const [notification,setNotification] = React.useState(null);

    React.useEffect(() => {
        let state = localStorage["UserData"];
        let parseData = JSON.parse(state);
        
        setUserId(parseData.id);
        setUsername(parseData.username);
        setRoleId(parseData.role_id)
    },[]);

    const EditProfile = (userId) => {
        const data = {
            id : userId,
            username : username,
            role_id : roleId,
            image_profile : image
        }

        client.put(`/api/user/${userId}`,{
            headers : {
                "Content/type" : "multipart/form-data"
            },
            body : data
        })
        .then( res => {
            setNotification("berhasil ubah data");
        })
        .catch( err => {    
            setNotification("gagal ubah data");
        })
    }

    const onImageChange = (event) => {
        setImage(event.target.files[0]);
    }

    return (
        <>
            <div className="mt-12 align-left">
                <div className="px-8">
                    <h3 className="text-xl font-bold">Silahkan Ganti Profil Anda</h3>
                </div>
                {notification === "berhasil ubah data" ? <SuccessMessage text="Data Profil Anda sudah diubah" /> : ''}
                {notification === "gagal ubah data" ? <ErrorMessage text="Mohon Lengkapi Lagi Data Anda" /> : ''}
                <form>
                    <div>
                        <label className="text-gray-700 my-4 text-md font-bold">Nama Lengkap</label>
                        <input className="w-full px-4 py-3 text-md rounded-md" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mt-3 text-gray-700 text-md font-bold">Ganti Foto</label>
                        <label className="block mt-3 text-gray-700 text-md font-bold">{image ? image.name : ''}</label>
                        <div className="inline-block cursor-pointer my-4 p-2 rounded-lg bg-gray-200 transition-duration-500 ease-in-out hover:bg-gray-500">
                            <label className="cursor-pointer" for="files">Silahkan Upload</label>
                            <input className="hidden w-full py-3 text-md rounded-md" onChange={onImageChange} id="files" accept="image/*" type="file" />
                        </div>
                    </div>
                    <button onClick={() => EditProfile(userId)} className="p-2 hover:text-gray-200 border-2 bg-blue-500 rounded-lg" type="button">Edit Profil</button>
                </form>
            </div>
        </>
    );
}