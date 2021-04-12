import React from "react";

export default function Profil(){
    return (
        <>
            <div className="mt-12 align-left">
                <div className="px-8">
                    <h3 className="text-xl font-bold">Silahkan Ganti Profil Anda</h3>
                </div>
                <form className="mt-8 px-8">
                    <div>
                        <label className="text-gray-700 my-4 text-md font-bold">Nama Lengkap</label>
                        <input className="w-full px-4 py-3 text-md rounded-md" value="Edward Simpohang" type="disabled" />
                    </div>
                    <div>
                        <label className="text-gray-700 text-md font-bold">Posisi</label>
                        <input className="w-full px-4 py-3 text-md rounded-md" value="admin" type="disabled" />
                    </div>
                    <div>
                        <label className="text-gray-700 text-md font-bold">Nomor Telepon</label>
                        <input className="w-full px-4 py-3 text-md rounded-md" type="number" />
                    </div>
                    <div>
                        <label className="block mt-3 text-gray-700 text-md font-bold">Ganti Foto</label>
                        <div className="inline-block cursor-pointer my-4 p-2 rounded-lg bg-gray-200 transition-duration-500 ease-in-out hover:bg-gray-500">
                            <label className="cursor-pointer" for="files">Silahkan Upload</label>
                            <input className="hidden w-full py-3 text-md rounded-md" id="files" accept="image/*" type="file" />
                        </div>
                    </div>
                    <button className="p-2 hover:text-gray-200 border-2 bg-blue-500 rounded-lg" type="submit">Edit Profil</button>
                </form>
            </div>
        </>
    );
}