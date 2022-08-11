import { Action, AllMessage, Msg } from "../../interface/redux";

const defaultState:AllMessage = {

    msg: [{
        id: 0,
        msg: '',
        user: ''
    }]

}

const _joinMsg = 'all_msg';
const _updateMsg = 'update_msg';


export const AllMsgStore = (state = defaultState, action:Action<string, Msg[]>) => {

    switch (action.type){
        case _joinMsg: 
            return {msg: action.payload};
        case _updateMsg:
            return {msg: [...state.msg, ...action.payload as Msg[]]}
        default:
            return state;
    }

}

export const joinMsg = (payload: Msg[]) => ({ type: _joinMsg, payload });
export const updateMsg = (payload: Msg[]) => ({ type: _updateMsg, payload });
