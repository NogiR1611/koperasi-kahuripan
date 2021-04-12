import React from 'react';

export default function MonthDropdown(){
    return (
        <>
            <label className="inline-block py-0">
                <select className="form-select text-gray-500 block w-full rounded-lg">
                    <option>Januari</option>
                    <option>Februari</option>
                    <option>Maret</option>
                    <option>April</option>
                    <option>Mei</option>
                    <option>Juni</option>
                    <option>Juli</option>
                    <option>Agustus</option>
                    <option>September</option>
                    <option>Oktober</option>
                    <option>November</option>
                    <option>Desember</option>
                </select>
            </label>
        </>
    );
} 