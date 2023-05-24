import { postApiRequest } from "..";

export const createToken = async () =>{
    return await postApiRequest(`/token/`);
}

export const tokenRefresh = async () =>{
    return await postApiRequest(`/token/refresh/`);
}