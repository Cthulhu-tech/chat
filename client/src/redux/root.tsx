import { applyMiddleware, combineReducers, createStore } from "redux";
import { JWT } from "./store/jwt";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    jwt: JWT,
});

export type AppDispatch = typeof store.dispatch

export const store = createStore(rootReducer, applyMiddleware(thunk));