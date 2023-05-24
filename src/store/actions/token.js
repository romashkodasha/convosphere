import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    createToken,
    tokenRefresh
} from "../../api/services/token";

export const createTokenAction = createAsyncThunk('token/token', (params) => {
    return createToken(params);
})

export const tokenRefreshAction = createAsyncThunk('token/refresh', (params) => {
    return tokenRefresh(params);
})