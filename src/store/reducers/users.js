import { createSlice } from "@reduxjs/toolkit";
import { getUsersAction, createUserAction, getUserByIdAction } from "../actions/users";

const initialState ={
    getUsersStatus: 'initial',
    createUserStatus: 'initial',
    getUserByIdStatus: 'initial',
    users: null,
    userById: null
}

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUsersAction.pending, (state) => {
            state.getUsersStatus='fetching';
            state.error = null;
        })
        .addCase(getUsersAction.fulfilled, (state, {payload}) => {
            state.getUsersStatus='fetched';
            state.users=payload;
            state.error=null;
        })
        .addCase(getUsersAction.rejected, (state,{error}) => {
            state.getUsersStatus='error';
            state.error=error;
        })
        builder
        .addCase(createUserAction.pending, (state) => {
            state.createUserStatus = 'fetching';
            state.error = null;
        })
        .addCase(createUserAction.fulfilled, (state) => {
            state.createUserStatus = 'fetched';
            state.error = null;
        })
        .addCase(createUserAction.rejected, (state, { error }) => {
            state.createUserStatus = 'error';
            state.error = error;
        });
    }
})

export const resetUsersState = usersSlice.actions.reset;
export const usersReducer = usersSlice.reducer;