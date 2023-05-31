import { createSlice } from "@reduxjs/toolkit";
import { getMessagesAction, postMessagesAction } from "../actions/messages";

const initialState = {
    getMessagesStatus: 'initial',
    postMessagesStatus: 'initial',
    messages: null,
    error:null,
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getMessagesAction.pending, (state) => {
            state.getMessagesStatus='fetching';
            state.error = null;
        })
        .addCase(getMessagesAction.fulfilled, (state, {payload}) => {
            state.getMessagesStatus='fetched';
            state.messages=payload;
            state.error=null;
        })
        .addCase(getMessagesAction.rejected, (state,{error}) => {
            state.getMessagesStatus='error';
            state.error=error;
        })
        builder
        .addCase(postMessagesAction.pending, (state) => {
            state.postMessagesStatus='fetching';
            state.error = null;
        })
        .addCase(postMessagesAction.fulfilled, (state) => {
            state.postMessagesStatus='fetched';
            state.error=null;
        })
        .addCase(postMessagesAction.rejected, (state,{error}) => {
            state.postMessagesStatus='error';
            state.error=error;
        })

    }
})

export const resetMessagesState = messagesSlice.actions.reset;
export const messagesReducer = messagesSlice.reducer;