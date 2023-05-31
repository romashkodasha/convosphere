import {getApiRequest, postApiRequest} from '../index';


export const getMessages = async ()=>{
    return await getApiRequest(`/messages/`);
}

export const postMessages = async (params) =>{
    return await postApiRequest(`/messages/`,params)
}
