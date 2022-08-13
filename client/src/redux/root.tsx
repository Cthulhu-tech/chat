import { applyMiddleware, combineReducers, createStore } from "redux";
import { userMessageStore } from "./store/message";
import { AllMsgStore } from "./store/allMessage";
import { EmitStore } from "./store/lastEmit";
import { AllRoom } from "./store/allRoom";
import { JWT } from "./store/jwt";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    jwt: JWT,
    room: AllRoom,
    userMsg: userMessageStore,
    allMsg: AllMsgStore,
    emit: EmitStore
});

export type AppDispatch = typeof store.dispatch

export const store = createStore(rootReducer, applyMiddleware(thunk));
