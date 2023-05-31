import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { topicsReducer } from "./reducers/topics";
import { usersReducer } from "./reducers/users";
import { tokenReducer } from "./reducers/token";
import { messagesReducer } from "./reducers/messages";


const reducer = combineReducers ({
    topicsReducer,
    usersReducer,
    tokenReducer,
    messagesReducer,
})

export const store = configureStore({
    reducer,
})