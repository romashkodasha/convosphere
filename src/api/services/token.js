import { postApiRequest } from "..";

export const createToken = async (params) =>{
    return await postApiRequest(`/token/`, params);
}

export const tokenRefresh = async (params) =>{
    return await postApiRequest(`/token/refresh/`, params);
}