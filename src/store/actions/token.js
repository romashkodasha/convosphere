import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    createToken,
    tokenRefresh
} from "../../api/services/token";

export const createTokenAction = createAsyncThunk('token/token', async (params) => {
    const token = await createToken(params);
    await localStorage.setItem('tokenAccess', token.access); // Сохранение токена в localStorage
    await localStorage.setItem('tokenRefresh', token.refresh);
    return;
})

export const tokenRefreshAction = createAsyncThunk('token/refresh', (params) => {
    return tokenRefresh(params);
})