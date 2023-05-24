import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { topicsReducer } from "./reducers/topics";
import { usersReducer } from "./reducers/users";
import { tokenReducer } from "./reducers/token";


const reducer = combineReducers ({
    topicsReducer,
    usersReducer,
    tokenReducer,
})

export const store = configureStore({
    reducer,
})