import { Action, Navigation,  } from "../../interface/redux";

const defaultState: Navigation = {

    open: false

}

const toggle = 'toggle_navigation';

export const navigationStore = (state = defaultState, action:Action<string, boolean>) => {

    switch (action.type){
        case toggle: 
            return { open: action.payload }
        default:
            return state;
    }

}

export const toggleNavigation = (payload: boolean) => ({ type: toggle, payload });
