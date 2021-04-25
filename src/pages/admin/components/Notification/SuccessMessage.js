import React from 'react';

export default function SuccessMessage(props){
    return (
        <div class="bg-green-300 text-center border border-green-300 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold text-center">{props.text}</strong>
        </div>
    );
};