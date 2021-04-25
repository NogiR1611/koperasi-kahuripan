import React from 'react';

export default function ErrorMessage(props){
    return (
        <div class="bg-red-100 text-center border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold text-center">{props.text}</strong>
        </div>
    );
}