import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getUsers,
    createUser,
    getUserById
} from "../../api/services/users"

export const getUsersAction = createAsyncThunk ('users/users', () =>{
    return getUsers();
}
)

export const createUserAction = createAsyncThunk ('users/create', (params)=>{
    return createUser(params);
})

export const getUserByIdAction = createAsyncThunk ('users/userId', (id) =>{
    return getUserById(id);
})
