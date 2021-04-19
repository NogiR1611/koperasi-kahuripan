import React from 'react';

export default function MonthDropdown(props){
    return (
        <>
            <label className="inline-block py-0">
                <select onChange={props.monthChange} value={props.monthValue} className="form-select text-gray-500 block w-full rounded-lg">
                    <option value="01">Januari</option>
                    <option value="02">Februari</option>
                    <option value="03">Maret</option>
                    <option value="04">April</option>
                    <option value="05">Mei</option>
                    <option value="06">Juni</option>
                    <option value="07">Juli</option>
                    <option value="08">Agustus</option>
                    <option value="09">September</option>
                    <option value="10">Oktober</option>
                    <option value="11">November</option>
                    <option value="12">Desember</option>
                </select>
            </label>
        </>
    );
} 