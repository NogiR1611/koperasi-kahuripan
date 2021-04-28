import axios from 'axios';

const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers : {
        "Content-type" : "application/json",
        "Authorization": `Bearer ${localStorage.getItem('TOKEN_KEY')}`
    }
});

export default client; 