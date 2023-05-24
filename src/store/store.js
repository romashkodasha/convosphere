import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { topicsReducer } from "./reducers/topics";
import { usersReducer } from "./reducers/users";


const reducer = combineReducers ({
    topicsReducer,
    usersReducer,
})

export const store = configureStore({
    reducer,
})