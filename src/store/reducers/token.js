import { createSlice } from "@reduxjs/toolkit";
import { createTokenAction, tokenRefreshAction } from "../actions/token";

const initialState = {
    createTokenStatus: 'initial',
    tokenRefreshStatus: 'initial',
    token: null
}

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTokenAction.pending, (state) => {
            state.createTokenStatus='fetching';
            state.error = null;
        })
        .addCase(createTokenAction.fulfilled, (state, {payload}) => {
            state.createTokenStatus='fetched';
            state.token=payload;
            state.error=null;
        })
        .addCase(createTokenAction.rejected, (state,{error}) => {
            state.createTokenStatus='error';
            state.error=error;
        })
        builder
        .addCase(tokenRefreshAction.pending, (state) => {
            state.tokenRefreshStatus='fetching';
            state.error = null;
        })
        .addCase(tokenRefreshAction.fulfilled, (state, {payload}) => {
            state.tokenRefreshStatus='fetched';
            state.token=payload;
            state.error=null;
        })
        .addCase(tokenRefreshAction.rejected, (state,{error}) => {
            state.tokenRefreshStatus='error';
            state.error=error;
        })
    }
})

export const resetTokenState = tokenSlice.actions.reset;
export const tokenReducer = tokenSlice.reducer;