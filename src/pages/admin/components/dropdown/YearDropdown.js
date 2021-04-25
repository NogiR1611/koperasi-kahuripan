import React from 'react';

export default function YearDropdown(props){
    const getYears = () => {
        const currentYear = new Date().getFullYear(),
            years = [];
        let year = currentYear;

        while (year > 1999) {
            years.push(year);
            --year;
        }

        return years.map((year) => (
            <option value={year} key={year}>{year}</option>
        ))
    }

    return (
        <>
            <label className="inline-block py-0">
                <select onChange={props.yearChange} value={props.yearValue} className="form-select text-gray-500 block w-full rounded-lg">
                    {getYears()}
                </select>
            </label>
        </>
    );
} 