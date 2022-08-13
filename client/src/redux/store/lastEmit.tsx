import { Action, Emit } from "../../interface/redux";

const defaultState:Emit = {

    emit: null

}

const _setEmit = 'set_emit';
const _deleteEmit = "delete_emit";

export const EmitStore = (state = defaultState, action:Action<string, string[]>) => {

    switch (action.type){
        case _setEmit: 
            return {emit: action.payload}
        case _deleteEmit:
            return {emit: null}
        default:
            return state;
    }

}

export const setEmit = (payload: string[]) => ({ type: _setEmit, payload });
export const deleteEmit = () => ({ type: _deleteEmit });
