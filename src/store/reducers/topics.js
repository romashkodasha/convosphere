import { createSlice } from "@reduxjs/toolkit";
import {
    getTopicsAction,
    postTopicsAction,
    getTopicByIdAction
} from "../actions/topics"

const initialState = {
    getTopicsStatus: 'initial',
    postTopicsStatus: 'initial',
    getTopicByIdStatus: 'initial',
    topics:[],
    error: null,
}

const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getTopicsAction.pending, (state) => {
            state.getTopicsStatus='fetching';
            state.error = null;
        })
        .addCase(getTopicsAction.fulfilled, (state, {payload}) => {
            state.getTopicsStatus='fetched';
            state.topics=payload;
            state.error=null;
        })
        .addCase(getTopicsAction.rejected, (state,{error}) => {
            state.getTopicsStatus='error';
            state.error=error;
        })
    }
})

export const resetTopicsState = topicsSlice.actions.reset;
export const topicsReducer = topicsSlice.reducer;