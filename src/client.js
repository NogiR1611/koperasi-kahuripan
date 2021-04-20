import axios from 'axios';

const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    header : {
        "Content-type" : "application/json",
    }
});

export default client; 