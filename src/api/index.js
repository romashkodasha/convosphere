import axios from "axios";
// import io from 'socket.io-client';

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('tokenAccess')}`;
    return config;
});

export const getApiRequest = (link, body) =>
    api.get(link, body)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        })

export const postApiRequest = (link, body) =>
    api.post(link, body)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        })

export const deleteApiRequest = (link, body) =>
    api.delete(link, body)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        })

export const patchApiRequest = (link, body) =>
    api.patch(link, body)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        })


        export default api;



