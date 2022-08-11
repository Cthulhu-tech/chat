import { Action, MsgUser } from "../../interface/redux";

const defaultState: MsgUser = {

    msg: ''

}

const userMsg = 'user_message';

export const userMessageStore = (state = defaultState, action:Action<string, string>) => {

    switch (action.type){
        case userMsg: 
            return { msg: action.payload }
        default:
            return state;
    }

}

export const userMessage = (payload: string) => ({ type: userMsg, payload });
