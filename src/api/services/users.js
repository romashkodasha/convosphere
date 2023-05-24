import {getApiRequest, postApiRequest} from '../index';


export const getUsers = async ()=>{
    return await getApiRequest(`/users/`);
}

export const createUser = async (params) =>{
    return await postApiRequest(`/users/`, params);
}

export const getUserById = async (id)=>{
    return await getApiRequest(`/users/${id}`);
}