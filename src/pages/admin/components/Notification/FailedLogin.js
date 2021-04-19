import React from 'react';

export default function FailedLogin(){
    return (
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Maaf Username atau Password Anda salah</strong>
        </div>
    );
}