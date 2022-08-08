import { Action, JwtType } from "../../interface/redux";

const defaultState = {

    user: {

        login: null,
        jwt: null,

    }

}

export const JWT = (state = defaultState, action:Action<string, JwtType>) => {
    switch (action.type){
        case "update_jwt": 
            return {...state, ...action.payload}
        case "delete_jwt":
            return {...state, user: null}
        default:
            return state;
    }
}

export const updateToken = (payload: JwtType) => ({ type: "update_jwt", payload });
