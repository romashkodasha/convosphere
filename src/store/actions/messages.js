import { createAsyncThunk } from "@reduxjs/toolkit";

import { getMessages, postMessages } from "../../api/services/messages";

export const getMessagesAction = createAsyncThunk('messages/messages',() => {
    return getMessages();
})

export const postMessagesAction = createAsyncThunk('messages/post',(params) =>{
    return postMessages(params);
})