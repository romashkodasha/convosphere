import { getApiRequest, postApiRequest, patchApiRequest, deleteApiRequest } from "..";

export const getTopics = async () => {
    return await getApiRequest(`/topics/`)
}

export const postTopics = async (params) => {
    return await postApiRequest(`/topics/`, params);
}

export const getTopicById = async (topic_id) => {
    return await getApiRequest(`/topics/${topic_id}`)
}


