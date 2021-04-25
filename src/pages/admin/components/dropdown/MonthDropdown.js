import React from 'react';

export default function MonthDropdown(props){
    return (
        <>
            <label className="inline-block py-0">
                <select onChange={props.monthChange} value={props.monthValue} className="form-select text-gray-500 block w-full rounded-lg">
                    <option value="1">Januari</option>
                    <option value="2">Februari</option>
                    <option value="3">Maret</option>
                    <option value="4">April</option>
                    <option value="5">Mei</option>
                    <option value="6">Juni</option>
                    <option value="7">Juli</option>
                    <option value="8">Agustus</option>
                    <option value="9">September</option>
                    <option value="10">Oktober</option>
                    <option value="11">November</option>
                    <option value="12">Desember</option>
                </select>
            </label>
        </>
    );
} 