import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:7017/api/'
});

export default instance;