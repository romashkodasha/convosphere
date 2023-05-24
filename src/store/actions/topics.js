import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getTopics,
    postTopics,
    getTopicById
} from "../../api/services/topics"

export const getTopicsAction = createAsyncThunk('topics/topics', ()=>{
    return getTopics(); 
})

export const postTopicsAction = createAsyncThunk('topics/posttopics', (params)=>{
    return postTopics(params);
})

export const getTopicByIdAction = createAsyncThunk('topics/topicId', (id) => {
    return getTopicById(id);
})