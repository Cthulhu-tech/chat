import { applyMiddleware, combineReducers, createStore } from "redux";
import { AllRoom } from "./store/all_room";
import { JWT } from "./store/jwt";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    jwt: JWT,
    room: AllRoom
});

export type AppDispatch = typeof store.dispatch

export const store = createStore(rootReducer, applyMiddleware(thunk));
