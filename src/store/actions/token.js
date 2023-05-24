import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    createToken,
    tokenRefresh
} from "../../api/services/token";

export const createTokenAction = createAsyncThunk('token/token', () => {
    return createToken();
})

export const tokenRefreshAction = createAsyncThunk('token/refresh', () => {
    return tokenRefresh();
})