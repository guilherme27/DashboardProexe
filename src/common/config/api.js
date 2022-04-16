import * as axios from 'axios'

const BASE_URL = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';

const api = () => {
    const instance = axios.create({
        baseURL: BASE_URL
    });

    return instance;
};

export { api };