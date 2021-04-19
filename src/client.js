import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8000/',
    header : {
        "Content-type" : "application/json",
    }
});

export default client; 